import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

import Layout from "./pages/Layout";
import SignIn from "./pages/SignIn";
// import Portfolio from "./pages/Portfolio";
// import ItemTransactions from "./pages/ItemTransactions";
// import ItemOverview from "./pages/ItemOverview";

import store from "./store";

const history = syncHistoryWithStore(browserHistory, store);
const app = document.getElementById("app");

ReactDOM.render(
    <Provider store={store}>
	    <Router history={history}>
			<Route path="/" component={Layout}>
				<IndexRoute component={SignIn}></IndexRoute>
			</Route>
		</Router>
	</Provider>, app);


				// <Route path="portfoView/:id" component={Portfolio}></Route>
				// <Route path="item-transactions/:id" component={ItemTransactions}></Route>
				// <Route path="item-overview/:id" component={ItemOverview}></Route>