# chat-web-app
Chat application using WebSocket, ServiceWorker, React + Redux

### INSTRUCTIONS

1. npm install
2. Open terminal, go to file directory
3. Terminal run: gulp public
	* Runs app (google chrome will initialize) 
4. For developer mode instead, terminal run: gulp 
	* Runs app (google chrome will initialize) 
	* Should start the server for live editing
	* Edit in src files only
	* To minify bundle.js for production, go to webpack.js in root file and set DEBUG === production & vice versa for development mode.
	* Run "Webpack" in terminal to go into production mode
5. Turn to "http://localhost:3000/" in your browser (Terminal and browser on same device)
6. Turn to a different browser or Tab and run "http://localhost:3000/" to test the communication.
	
	- Different developers test the app, the server IP address is different when running on terminal. The socket currenly connects to localhost:3000, thus the app can only be ran through the device you ran your terminal. If you want to change the Socket connection, to your local IP address. Then copy your 'URL + :3000' and head over to 'src/js/actions/userActions'. Replace "http://127.0.0.1:8080" with your 'local host IP address + port number 3000' or a 'domain URL' that you ran the server from. Then you will be able to run remotely. 
	- You will need exit server. ^c. Then run webpack again for production. Then 'gulp' or 'gulp public' to rerun the app.