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
6. Turn to 'External: http://192...' for extenal devices. This URL will be shown when you run 'gulp public' or 'gulp' in the terminal. Should be under 'Access URLs:'