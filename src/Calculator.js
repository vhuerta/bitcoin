import React, { Component } from 'react';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            crypto: '',
            coin: '',
            from: 'usd',
            to: 'btc',
            isfetching: false,
            btc: {
                usd:null,
                eur:null
            },
            eth: {
                usd:null,
                eur:null
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.setCoinPrice = this.setCoinPrice.bind(this);
        this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
        this.doConvertion = this.doConvertion.bind(this);
    }


componentDidMount() {
    fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD,EUR')
        .then(res => res.json())
        .then(data => this.setCoinPrice(data))
        .catch(err => console.log(err))
}

setCoinPrice(data) {
    this.setState({
        btc: {
            usd: data.BTC.USD,
            eur: data.BTC.EUR,
        },
        eth: {
            usd: data.ETH.USD,
            eur: data.ETH.EUR,
        },
        isfetching: true
    });

    this.props.passCurrency(this.state.btc, this.state.eth)
}

    handleInputChange(e, type) {
        this.setState({[type]: e.target.value}, this.doConvertion.bind(this, type));
    }
    
    handleCurrencyChange(e, type){
        this.setState({[type === 'coin'? 'from' : 'to']: e.target.value}, this.doConvertion.bind(this, type));
    }

    doConvertion(type){
        if(type === 'coin') {
            this.setState({crypto: this.state.coin / this.state[this.state.to][this.state.from]});
        } else {
            this.setState({coin: this.state.crypto * this.state[this.state.to][this.state.from]});
        }
    }
    
    render() {
        return (
            <div>
                <h1 className="text-center">Calculator</h1>
                <form>
                    <div className="form-group" style={{ 'paddingTop': '50px' }}>
                        <div className="col-md-6">
                            <input 
                            type="number" 
                            className="form-control" 
                            placeholder="Currency" 
                            name="coin"
                            value={this.state.coin}
                            onChange={e => this.handleInputChange(e, 'coin')}
                            />
                        </div>
                        <div className="col-md-6">
                            <select value={this.state.value} onChange={e => this.handleCurrencyChange(e, 'coin')}>
                                <option value="usd">USD</option>
                                <option value="eur" >EUR</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group" style={{ 'paddingTop': '50px' }}>
                        <div className="col-md-6">
                            <input 
                            type="number" 
                            className="form-control" 
                            placeholder="CryptoCurrency" 
                            name="crypto"
                            value={this.state.crypto}
                            onChange={e => this.handleInputChange(e, 'crypto')}
                            />
                        </div>
                        <div className="col-md-6">
                            <select value={this.state.toChange} onChange={e => this.handleCurrencyChange(e, 'crypto')}>
                                <option value="btc" >BTC</option>
                                <option value="eth">ETH</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Calculator;