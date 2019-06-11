"use strict";

// e.g. for https://orgname.asperafiles.com
var SUBDOMAIN = "orgname";

// replace with your client id
var CLIENT_ID = "abc123";

// replace with your client secret
var CLIENT_SECRET = "secret";

// replace with the url you use to access index.html
var REDIRECT_URI = "https://asperafiles-dev.com";

// Holds a reference to an instance of AW4.Connect
var connect;

// Object that contains information needed to perform transfers:
// accessKey, host, fileId, userId, userName, workspaceId
var transferParams = {};

// Returns a promise.
// Enables transfer-related UI when ready.
// Resolved when Connect is initialized and transfers are authorized.
function initialize() {
  return Promise.all([
    initializeConnect(),
    initializeTransfers()
  ]).then(function() {
    enableTransferUI();
  });
}

// Returns a promise.
// Resolved when Connect is initialized.
function initializeConnect() {
  connect = new AW4.Connect({minVersion: "3.6.0"});
  return new Promise(function(resolve, reject) {
    connect.addEventListener(AW4.Connect.EVENT.STATUS, function() {
      var status = connect.getStatus();
      if (status == AW4.Connect.STATUS.RUNNING) {
        resolve();
      } else if (status == AW4.Connect.STATUS.FAILED) {
        reject(new Error("Aspera Connect initialization failed"));
      }
    });
    connect.initSession();
  });
}

// Returns a promise.
// Resolved when transfer parameters are available and transfer authorization
// has been obtained.
function initializeTransfers() {
  return authorizeTransfers().catch(function(error) {
    if (error.status == 401) {
      // tokens are bad (likely expired), obtain new ones and try again
      localStorage.clear();
      return authorizeTransfers();
    } else {
      // some other error that is unrecoverable, re-throw it
      throw error;
    }
  });
}

// Returns a promise
// Gets information about the user's home folder and obtains authorization for
// transfers to it. Login involving several redirects may be required.
function authorizeTransfers() {
  // get a Files API token, then use it to get transfer parameters
  return getToken("user:all").then(getTransferParams).then(function() {
    // get a token for accessing the node
    var scope = "node." + transferParams.accessKey + ":user:all";
    getToken(scope);
  });
}

// Returns a promise
// Loads an existing token with the given scope from local storage, if
// available. Otherwise, obtains a new token from the server.
function getToken(scope) {
  var token = loadToken(scope);
  if (token) {
    return Promise.resolve(token);
  } else {
    return getTokenFromServer(scope);
  }
}

// Returns a promise
function getTokenFromServer(scope) {
  var code = getAuthCodeFromUrl();
  if (code) {
    return Promise.resolve($.ajax({
      method: "POST",
      url: oauthUrl("token"),
      data: {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URI,
        scope: scope
      },
      beforeSend: function(request) {
        request.setRequestHeader(
          "Authorization",
          "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET)
        );
      }
    })).then(function(response) {
      var token = response.access_token;
      // save the token so we have it later, even if we redirect
      saveToken(scope, token);
      return token;
    });
  } else {
    // redirects to authorize endpoint on server
    getAuthCodeFromServer();
    // do not continue as we've redirected
    return Promise.reject({redirected: true});
  }
}

// Synchronous
function getAuthCodeFromUrl() {
  var code = null;
  var matches = /code=([^&]*)/i.exec(location.search);
  if (matches) {
    code = decodeURIComponent(matches[1]);
    // clear the code parameter from the url to prevent problems on reload
    history.replaceState(history.state, "", "/");
  }
  return code;
}

// Synchronous, redirects to OAuth 2.0 authorize endpoint
function getAuthCodeFromServer() {
  var url = oauthUrl("authorize") +
      "?response_type=code" +
      "&client_id=" + encodeURIComponent(CLIENT_ID) +
      "&redirect_uri=" + encodeURIComponent(REDIRECT_URI) +
      "&scope=" + encodeURIComponent("user:all");
  location.replace(url);
}

// Returns a promise
function getTransferParams(token) {
  // call GET /self
  return Promise.resolve($.ajax({
    url: apiUrl("self"),
    beforeSend: function(request) {
      request.setRequestHeader(
        "Authorization",
        "Bearer " + token
      );
    }
  })).then(function(response) {
    // call GET /nodes/{home_node_id}
    transferParams.fileId = response.home_file_id;
    transferParams.userId = response.id;
    transferParams.userName = response.name;
    transferParams.workspaceId = response.default_workspace_id;
    return Promise.resolve($.ajax({
      url: apiUrl("nodes/" + response.home_node_id),
      beforeSend: function(request) {
        request.setRequestHeader(
          "Authorization",
          "Bearer " + token
        );
      }
    })).then(function(response) {
      transferParams.accessKey = response.access_key;
      transferParams.host = response.host;
      return transferParams;
    });
  });
}

function apiUrl(path) {
  return "https://api.asperafiles.com/api/v1/" + path;
}

function oauthUrl(path) {
  return apiUrl("oauth2/" + SUBDOMAIN + "/" + path);
}

// Save the token with the specified scope to local storage
function saveToken(scope, token) {
  var name = "token:" + scope;
  localStorage.setItem(name, token);
}

// Load the token with the speciied scope from local storage
function loadToken(scope) {
  var name = "token:" + scope;
  return localStorage.getItem(name);
}

function enableTransferUI() {
  $('#uploadPath').prop("disabled", false);
  $('#browseButton').prop("disabled", false);
  $('#uploadButton').prop("disabled", false);
  $('#downloadFilename').prop("disabled", false);
  $('#downloadButton').prop("disabled", false);
}

function selectFile() {
  connect.showSelectFileDialog(
    {
      success: function(result) {
        var file = result.dataTransfer.files[0];
        if (file) {
          var path = file.name;
        }
        $('#uploadPath').val(path);
      }
    },
    {allowMultipleSelection: false}
  );
}

function uploadFile() {
  var path = $.trim($('#uploadPath').val());
  if (!path) {
    return;
  }
  var token = loadToken("node." + transferParams.accessKey + ":user:all");

  var transferSpec = {
    authentication: "token",
    direction: "send",
    paths: [
      {
        source: path
      }
    ],
    remote_user: "xfer",
    remote_host: transferParams.host,
    resume: "sparse_checksum",
    ssh_port: 33001,
    tags: {
      aspera: {
        node: {
          file_id: transferParams.fileId,
          access_key: transferParams.accessKey
        },
        files: {
          created_at: new Date().getTime(),
          access_id: transferParams.userId.toString(),
          user_name: transferParams.userName,
          workspace_id: transferParams.workspaceId,
          files_transfer_action: "upload_file"
        },
        usage_id: "aspera.files.workspace." + transferParams.workspaceId
      }
    },
    token: "Bearer " + token
  };

  var connectSettings = {
    allow_dialogs: false,
    app_id: "aspera_" + transferParams.userId,
  };

  connect.startTransfer(transferSpec, connectSettings);
}

function downloadFile() {
  var filename = $.trim($('#downloadFilename').val());
  if (!filename) {
    return;
  }
  var token = loadToken("node." + transferParams.accessKey + ":user:all");

  var transferSpec = {
    authentication: "token",
    direction: "receive",
    paths: [
      {
        source: filename
      }
    ],
    remote_user: "xfer",
    remote_host: transferParams.host,
    resume: "sparse_checksum",
    ssh_port: 33001,
    tags: {
      aspera: {
        node: {
          file_id: transferParams.fileId,
          access_key: transferParams.accessKey
        },
        files: {
          file_name: filename,
          file_type: "file",
          created_at: new Date().getTime(),
          access_id: transferParams.userId.toString(),
          user_name: transferParams.userName,
          node_id: transferParams.nodeId,
          workspace_id: transferParams.workspaceId,
          files_transfer_action: "download_file"
        },
        usage_id: "aspera.files.workspace." + transferParams.workspaceId
      }
    },
    token: "Bearer " + token
  };

  var connectSettings = {
    allow_dialogs: false,
    app_id: "aspera_" + transferParams.userId,
  };

  connect.startTransfer(transferSpec, connectSettings);
}

// DOM ready
$(function() {
  $('#browseButton').click(selectFile);
  $('#uploadButton').click(uploadFile);
  $('#downloadButton').click(downloadFile);
  initialize().catch(function(error) {
    if (error.redirected) {
      console.log("Redirecting to " + window.location.href);
    } else if (error.status) {
      alert("HTTP Error " + error.status);
      console.error(error);
    } else {
      alert(error.toString());
      console.error(error);
    }
  });
});
