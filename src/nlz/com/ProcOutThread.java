package nlz.com;


import java.io.*;

public class ProcOutThread extends Thread {
	InputStream is;

	public ProcOutThread(InputStream is) {
		this.is = is;
	}

	public void run() {
		try {
			InputStreamReader isr = new InputStreamReader(is);
			BufferedReader br = new BufferedReader(isr);
			String line;
			while ( (line = br.readLine()) != null)
				System.out.println(line);
		} catch (IOException ioe) {
			System.out.println(ioe);
		}
	}

}
