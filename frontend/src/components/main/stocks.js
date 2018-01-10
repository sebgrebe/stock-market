import React from 'react'
import Delete from '../../containers/main/delete'

const Stocks = ({stocks}) => {
    const colors = ['#e6194b','#3cb44b','#ffe119','#0082c8','#f58231','#911eb4','#46f0f0','#f032e6','#d2f53c','#fabebe','#008080','#e6beff','#aa6e28','#fffac8']
    if (stocks.length > 0) {
        return (
            <div className="stocks">
            {stocks.map((stock) =>
                <div className="col-sm-3" style={{backgroundColor: colors[stocks.indexOf(stock)]}}>
                    <div>
                        <div className="stock_ticker" >{stock.ticker}</div>
                        <Delete ticker={stock.ticker} />
                    </div>
                    <div className="stock_name">{stock.name}</div>
                </div>
            )}
            </div>
        )
    }
    return null
}

export default Stocks