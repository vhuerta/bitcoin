import React from 'react';

const Prices = ({btc,eth}) => {
    return (
        <div>
            <div>
                <h1 className="inline-title">btc $ {btc.usd} Dollars</h1>
                <h1 className="inline-title">ethereum $ {eth.usd} Dollars</h1>
            </div>
        </div>
    );
};

export default Prices;