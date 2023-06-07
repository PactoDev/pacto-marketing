// import { connect } from 'react-redux';
import Web3 from 'web3';
import _ from 'lodash';
import api from './api';

const nftGenerateAddress = '0x732f3E6530a830bD242Ea3Af02CC8CF51df63D57';
const nftBalanceAddress = '0x429ff4500A29015Cc1753c68D025b0F067568642';
const etherscanKey = 'PXMIVJM3KMU4DI13PSWHSJ8E2UEFN39M7J';
const etherscanUrl = 'https://api.etherscan.io/api';

const minABI = [
  // balanceOf
  {
    constant: true,
    inputs: [{
      name: '_owner',
      type: 'address',
    }],
    name: 'balanceOf',
    outputs: [{
      name: 'balance',
      type: 'uint256',
    }],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: '_to',
        type: 'address',
      },
      {
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'transfer',
    outputs: [{
      name: '',
      type: 'bool',
    }],
    type: 'function',
  },

  //   function generatePERC721(address recipient, uint256 nftId, string memory tokenURI) public {
  //     pnft.mint(recipient, nftId, tokenURI);
  // }

  {
    constant: false,
    inputs: [
      {
        name: 'recipient',
        type: 'address',
      },
      {
        type: 'uint256',
        name: 'nftId',
      },

      {
        type: 'string',
        name: 'tokenURI',
      },
    ],
    name: 'generatePERC721',
    outputs: [{
      name: '',
      type: 'bool',
    }],
    type: 'function',
  },

];

const metaMask = (() => {
  if (!window?.ethereum?.isMetaMask) {
    // cannnot find metamask and need to install
  }
  const pactoTokenAddress = '0x429ff4500A29015Cc1753c68D025b0F067568642'; // pacto contract address
  // const pactoTokenAddress = nftGenerateAddress; // pacto contract address

  let initialized = false;
  let web3;
  let accounts;
  let gasprice;
  let address;
  let balance;
  let contract;
  let tokenBalance;
  // 4 - encode param
  // 5 - json stringify
  return {
    init: async () => {
      if (initialized) return;
      await metaMask.connect();
      initialized = true;
    },
    connect: async () => {
      if (!web3) {
        web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/dbc8c683ebf54b82b211d5344ecfd1c8'));
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        gasprice = await web3.eth.getGasPrice();
        address = Web3.utils.toChecksumAddress(accounts[0]);
        balance = await web3.eth.getBalance(address);
        contract = new web3.eth.Contract(minABI, pactoTokenAddress, { from: address });
      }
      console.log(accounts);
      console.log('contract: ', contract);
      return {
        // web3,
        accounts,
        gasprice,
        address,
        balance,
        // contract,
      };
    },
    address,
    transfer: async (toAddress, val) => {
      await metaMask.connect();
      // tokenBalance = await contract.methods.balanceOf(address).call();
      // console.log('tokenBalance: ', tokenBalance);

      const mutiplier = 1000 * 1000 * 1000 * 1000 * 1000 * 1000; // 18 0's
      const value = web3.utils.numberToHex(val * mutiplier);
      console.log(val);
      const result = await contract.methods.transfer(
        toAddress,
        value,
      ).encodeABI();

      const txObject = {
        from: address,
        to: pactoTokenAddress,
        gas: web3.utils.numberToHex(250000),
        value: '0x0',
        data: result,
        gasPrice: gasprice,
      };

      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [txObject],
      });
      console.log(result);
      console.log(txHash);
    },
    populateBlock: async (block) => {
      await metaMask.connect();
    },
    getBlock: async (index = 0, withTransaction = true) => {
      await metaMask.connect();

      const block = await web3.eth.getBlock(index, withTransaction);
      return block;
    },
    generateNFT: async (projectInfo) => {
      await metaMask.connect();

      const result = await contract.methods.generatePERC721(
        '0x402F36deFea46FF57C8a9C6e6A0A80c82b23cF68',
        projectInfo.id || 6, // TODO: read latest tx and + 1,
        JSON.stringify(
          {
            ...projectInfo,
            captain: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
            created: 1661851561,
            updated: 1661851561,
            description: 'test project!!!',
            quantity: 100,
            monthlyReward: 1,
          },
        ),
      ).encodeABI();

      const txObject = {
        from: address,
        to: nftGenerateAddress,
        gas: web3.utils.numberToHex(250000),
        value: '0x0',
        data: result,
        gasPrice: gasprice,
      };

      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [txObject],
      });

      console.log(result);
      console.log(txHash);
    },
    getBlocks: async (count = 1, skip = 0, withTransaction = true) => {
      await metaMask.connect();

      const result = await api.get(
        etherscanUrl,
        {
          params: {
            module: 'account',
            action: 'addresstokennftbalance',
            address: nftBalanceAddress,
            page: 1,
            offset: 0,
            apiKey: etherscanKey,
          },
        },
      );

      console.log(web3);
      console.log(web3.eth);
      console.log(web3.ethereum);
      console.log(result);
      const currentBlock = await web3.eth.getBlockNumber();
      console.log('currentBlock: ', currentBlock);
      console.log('currentBlock: ', this);
      const targetList = _.times(count).map((i) => {
        console.log('currentBlock: ', this);
        return metaMask.getBlock(currentBlock - i);
      });
      const results = await Promise.all(targetList);
      console.log(results);
    },
  };
})();

export default metaMask;
