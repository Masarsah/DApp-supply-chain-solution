const path = require("path");

const HDWallet = require('truffle-hdwallet-provider');
const infuraKey = "b4aec756b14349c181f23c72ce3355ea";


// ganache-cli -m "clog group betray roof surge kitten anchor useful face language dismiss art"
const fs = require('fs');
const mnemonic = 'clog group betray roof surge kitten anchor useful face language dismiss art';
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      // host: 'localhost',
      // port: 8545,
      // gas: 6721975 // The global gas value will be used by default, limit: 4728379
    },  ganache: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*', // Match any network id
  },
    rinkeby: {
      // provider: () => new HDWallet(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
      // network_id: 4,       // rinkeby's id
      // gas: 4500000,        // rinkeby has a lower block limit than mainnet
      // gasPrice: 10000000000
    },
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
