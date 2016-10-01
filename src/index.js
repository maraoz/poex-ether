import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Web3 from 'web3'

var accounts;
var account;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshBalance() {
  var meta = MetaCoin.deployed();

  console.log(meta)

  meta.getBalance.call(account, {from: account}).then(function(value) {
    var balance_element = document.getElementById("balance");
    balance_element.innerHTML = value.valueOf();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
};

function sendCoin() {
  var meta = MetaCoin.deployed();

  var amount = parseInt(document.getElementById("amount").value);
  var receiver = document.getElementById("receiver").value;

  setStatus("Initiating transaction... (please wait)");

  meta.sendCoin(receiver, amount, {from: account}).then(function() {
    setStatus("Transaction complete!");
    refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });
};


function setup(){
  return new Promise(function(resolve,reject){
    let provider;
    let read_only = false;
    let url = "http://localhost:8545";
    // mist loading proposal https://gist.github.com/frozeman/fbc7465d0b0e6c1c4c23
    if(typeof web3 !== 'undefined'){   // eg: If accessed via mist
      provider = web3.currentProvider; // Keep provider info given from mist `web3` object
      web3 = new Web3();                 // Re-instantiate `web3` using `Web3` from Dapp
      resolve({web3, provider, read_only})
    }else{
      provider = new Web3.providers.HttpProvider(url);
      let web3 = new Web3();             // Define and instantiate `web3` if accessed from web browser
      web3.setProvider(provider);
      console.log('url', url)
          // Define and instantiate `web3` if accessed from web browser
      console.log('Web3 is set', web3, provider)
      resolve({web3, provider, read_only})
    }
  });
}

window.onload = function() {
  setup().then(({ web3, provider, read_only})=>{
    ProofOfExistence.setProvider(provider);
    MetaCoin.setProvider(provider);
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        console.log(err)
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        console.log(accs)
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }

      accounts = accs;
      account = accounts[0];

      refreshBalance();
    });
  })
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
