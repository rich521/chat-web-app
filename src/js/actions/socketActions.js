import axios from "axios";
import io from "socket.io-client";

const socket = io.connect('http://localhost:3000/');

// Fetch the currency data
export function fetchCurrency() {
    socket.emit('fetch_currency');
    return (dispatch) => {
        socket.on('emit_currency', (res) => {
            dispatch({ type: "FETCH_CURRENCY_FULFILLED", payload: res });
        });
    }
}

export function fetchAssets() {
    socket.emit('fetch_assets');
    // socket.emit('fetch_marketPrice');
    return (dispatch) => {
        socket.on('emit_assets', (res) => {
            // processAssets(res);
            console.log(res[0]);
            // let portfo = res[0].portfolios;
            // for (let key in portfo) {

            // }
            // res[0].portfolios.portfolioA.assets = Object.values(res[0].portfolios.portfolioA.assets);
            // console.log(res[0].portfolios.portfolioA.assets);
            dispatch({ type: "FETCH_ASSETS_FULFILLED", payload: res[0].portfolios });
        });
    }
}

function processAssets(arg) {
    console.log(arg);

    // Reusable variables
    const portFo = arg[0].portfolios,
        keyPort = Object.keys(portFo);

     

    const allPortfolios = {};

    for (let i = 0; i < keyPort.length; i++) {
        allPortfolios[keyPort[i]] = {
        	"netAssets": 0,
        	"expenditure": 0,
        	"assets": {}
        };
    }

    console.log(allPortfolios);
}
