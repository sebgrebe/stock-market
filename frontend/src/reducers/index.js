export default (state = {stocks: {}, error: ''}, action) => {
    switch (action.type) {
        case 'UPDATE':
            return {
                ...state,
                stocks: action.stocks
            }
        case 'ERROR':
            return {
                ...state,
                error: action.message
            }
        default:
            return state
    }
}

