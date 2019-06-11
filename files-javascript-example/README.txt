INTRODUCTION
This is an example web application that authenticates the user against Aspera
Files, uses the Aspera Files API to get information about the user's home
folder, and uses the Aspera Connect API to upload into and download from that
folder.

PREREQUISITES
* A web server running over https
* OAuth client with client id and secret (created in the Files admin interface)

INSTRUCTIONS
1. Modify the parameters at the top of the example.js file to match your
   organization and API client credentials. REDIRECT_URI should be the location
   of where your index.html file will be served.
2. Serve the files directly from any web server.
