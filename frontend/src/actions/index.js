import $ from 'jquery';

export const updateStocks = (stocks) => ({
    type: 'UPDATE',
    stocks: stocks
})

export const setError = (message) => ({
    type: 'ERROR',
    message: message
})