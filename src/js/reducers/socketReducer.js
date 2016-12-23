export default function reducer(state = {
    assets: {
        "Portfolio": {
            "assets": {
                "Default": "",
            },
            "transactions": []
        }
    },
    fetchedAssets: false,
    currency: null,
    fetchedCurrency: false,
}, action) {
    switch (action.type) {
        case "FETCH_CURRENCY_FULFILLED":
            {
                return {
                    ...state,
                    fetchedCurrency: true,
                    currency: action.payload,
                }
            }
        case "FETCH_ASSETS_FULFILLED":
            {
                return {
                    ...state,
                    fetchedAssets: true,
                    // assets: action.payload,
                    assets: action.payload,
                }
            }
    }

    return state;
}
