import React, { Component } from 'react';
import moment from 'moment';
import './App.css';
import LineChart from './LineChart';
import ToolTip from './ToolTip';
import Calculator from './Calculator';
import Prices from './Prices'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchingData: true,
      data: null,
      hoverLoc: null,
      activePoint: null,
      coin: 'bpi',
      btc: {},
      eth: {}
    }
    this.passCurrency = this.passCurrency.bind(this);
  }


  handleChartHover(hoverLoc, activePoint){
    this.setState({
      hoverLoc: hoverLoc,
      activePoint: activePoint
    })
  }
  componentDidMount(){
    const {coin} = this.state
    const getData = () => {
      const url = `https://api.coindesk.com/v1/${coin}/historical/close.json`;

      fetch(url).then( r => r.json())
        .then((bitcoinData) => {
          const sortedData = [];
          let count = 0;
          for (let date in bitcoinData.bpi){
            sortedData.push({
              d: moment(date).format('MMM DD'),
              p: bitcoinData.bpi[date].toLocaleString('us-EN',{ style: 'currency', currency: 'USD' }),
              x: count, //previous days
              y: bitcoinData.bpi[date] // numerical price
            });
            count++;
          }
          this.setState({
            data: sortedData,
            fetchingData: false
          })
        })
        .catch((e) => {
          console.log(e);
        });
    }
    getData();
  }

  handleCoin(e){
    console.log(e.target.value)
  }
  passCurrency(btc, eth) {
    this.setState({
      btc,
      eth
    });
  }
  render() {
    return (

      <div className='container'>
        <div className='row'>
            <h1 className="jumbotron text-center">Crypto Currency Dashboard</h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Select your currency: 
          <select value={this.state.value} onChange={this.handleCoin}>
              <option value="bpi">Bitcoin</option>
              <option value="eth">Ethereum</option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div className='row'>
          <div className='popup'>
            {this.state.hoverLoc ? <ToolTip hoverLoc={this.state.hoverLoc} activePoint={this.state.activePoint}/> : null}
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8'>
            { !this.state.fetchingData ?
              <LineChart data={this.state.data} onChartHover={ (a,b) => this.handleChartHover(a,b) }/>
              : null }
          </div>
          <div className="row">
          <div className="col-md-4 float-right">
            <div className="pull-right calculator" >
                <Calculator passCurrency={this.passCurrency}/>
            </div>
          </div>

          </div>
        </div>
        <Prices btc={this.state.btc} eth={this.state.eth}/>
      </div>

    );
  }
}

export default App;
