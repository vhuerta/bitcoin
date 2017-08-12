import React, { Component } from 'react';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            crypto: '',
            moneda: '',
            value: 'dollar',
            toChange: 'bitcoin',
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
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
        this.handleConvertion = this.handleConvertion.bind(this);
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

    handleInputChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value
        this.setState({
            [name]: value
        });
    }
    handleChange(e) {
        this.setState({ value: e.target.value })
    }
    handleChangeCurrency(e){
        this.setState({toChange: e.target.value});
    }

    handleConvertion(e){
        const moneyName = e.target.name
        const money = e.target.value
        let currencyChange


        if (moneyName === 'moneda' && this.state.value === 'dollar' && this.state.toChange === 'bitcoin') {
            currencyChange = money / this.state.btc.usd
        this.setState({
            crypto: currencyChange
        })
        }
        else if (moneyName === 'moneda' && this.state.value === 'euro' && this.state.toChange === 'bitcoin') {
            currencyChange = money / this.state.btc.eur
            this.setState({
                crypto: currencyChange
            })
        }
        else if (moneyName === 'crypto' && this.state.value === 'dollar' && this.state.toChange === 'bitcoin') {
            currencyChange = money * this.state.btc.usd
        this.setState({
            moneda: currencyChange
        })
        }
        else if (moneyName === 'crypto' && this.state.value === 'euro' && this.state.toChange === 'bitcoin') {
            currencyChange = money * this.state.btc.eur
            this.setState({
                moneda: currencyChange
            })
        }
        if (moneyName === 'moneda' && this.state.value === 'dollar' && this.state.toChange === 'ethereum') {
            currencyChange = money / this.state.eth.usd
        this.setState({
            crypto: currencyChange
        })
        }
        else if (moneyName === 'moneda' && this.state.value === 'euro' && this.state.toChange === 'ethereum') {
            currencyChange = money / this.state.eth.eur
            this.setState({
                crypto: currencyChange
            })
        }
        else if (moneyName === 'crypto' && this.state.value === 'dollar' && this.state.toChange === 'ethereum') {
            currencyChange = money * this.state.eth.usd
        this.setState({
            moneda: currencyChange
        })
        }
        else if (moneyName === 'crypto' && this.state.value === 'euro' && this.state.toChange === 'ethereum') {
            currencyChange = money * this.state.eth.eur
            this.setState({
                moneda: currencyChange
            })
        }
        console.log("conversion",currencyChange)
    }
    


    render() {
        return (
            <div>
                <h1 className="text-center">Calculator</h1>
                <form>
                    <div className="form-group" style={{ 'paddingTop': '50px' }}>
                        <div className="col-md-6">
                            <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Currency" 
                            name="moneda"
                            value={this.state.moneda}
                            onChange={this.handleInputChange}
                            onBlur={this.handleConvertion}/>
                        </div>
                        <div className="col-md-6">
                            <select value={this.state.value} onChange={this.handleChange}>
                                <option value="dollar">USD</option>
                                <option value="euro" >EUR</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group" style={{ 'paddingTop': '50px' }}>
                        <div className="col-md-6">
                            <input 
                            type="email" 
                            className="form-control" 
                            placeholder="CryptoCurrency" 
                            name="crypto"
                            value={this.state.crypto}
                            onChange={this.handleInputChange}
                            onBlur={this.handleConvertion}/>
                        </div>
                        <div className="col-md-6">
                            <select value={this.state.toChange} onChange={this.handleChangeCurrency}>
                                <option value="bitcoin" >BTC</option>
                                <option value="ethereum">ETH</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Calculator;