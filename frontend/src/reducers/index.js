import dateToStr from '../containers/modules/dateToStr'
let today = dateToStr(new Date())

export default (state = {
    stocks: {}, error: '', date_msg: '', start_date: '2017-01-01', end_date: today, searching: false
}, action) => {
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
        case 'DATE_MSG':
            return {
                ...state,
                date_msg: action.message
            }
        case 'UPDATE_DATE':
            return {
                ...state,
                start_date: action.start_date,
                end_date: action.end_date
            }
        case 'SEARCHING':
            return {
                ...state,
                searching: action.searching
            }
        default:
            return state
    }
}

