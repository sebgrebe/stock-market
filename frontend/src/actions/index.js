export const updateStocks = (stocks) => ({
    type: 'UPDATE',
    stocks: stocks
})

export const setError = (message) => ({
    type: 'ERROR',
    message: message
})

export const setDateMsg = (message) => ({
    type: 'DATE_MSG',
    message: message
})

export const updateDate = (start_date,end_date) => ({
    type: 'UPDATE_DATE',
    start_date: start_date,
    end_date: end_date
})

export const updateSearching = (bool) => ({
    type: 'SEARCHING',
    searching: bool
})