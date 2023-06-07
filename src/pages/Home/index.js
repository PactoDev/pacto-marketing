// import { connect } from 'react-redux';
import {
  useState,
  useEffect,
} from 'react';
import {
  Navigate,
  useLocation,
} from 'react-router-dom';
import styled from 'styled-components';
import {
  size, palette,
} from 'styled-theme';
import _ from 'lodash';
import Web3 from 'web3';

// import Card from '../../components/atoms/Card';
import { send } from 'process';

import ProjectForm from '../../components/organisms/ProjectForm';
import P from '../../components/atoms/P';
import Flex from '../../components/atoms/Flex';
import Button from '../../components/atoms/Button';
import propTypes from '../../propTypes';

import AntDTable from '../../components/organisms/AntDTable';
import Divider from '../../components/atoms/Divider';
import DataView from '../../components/molecules/DataView';

import metaMask from '../../services/metaMask';

// "coverImage":"QmXKXPeuhrmBodWKBdWDbFhTaofVZfveSgcL6bJwvh8EJS",
// "description": "QmTdyj5uB3zy43yjHrQ6ALJBhuE2MeRTbsydg9nJxxRDrt",

const Wrapper = styled(Flex)`
  flex: 1;
  flex-direction: column;
  background-color: ${palette('grayscale', 2)}
`;

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${size('padding.large')};
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 6px;

  p {
    color: red;
    font-size: 11px;
    margin: 0;
  }
`;

const LoginText = styled(P)`
  color: ${palette('primary', 0)};
  font-size: 24px;
  font-weight: bold;
  padding: 36px 0px;
  text-align: center;

  @media (max-width: 768px){
    padding: 24px 0px;
  }
`;

const StyledFlex = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #D7D7D7;
  margin-bottom: 20px;
`;

const TableContainer = styled(Flex)`
`;

const StyledButton = styled(Button)`
  min-width: 180px;
  width: 100%;
  margin: 20px 0px 20px;
  border-radius: 0px;
`;

const Home = ({
  authenticated,
  // user,
  // role,
  // visited,
  signInError,
}) => {
  const location = useLocation();
  const [
    loading,
    setLoading,
  ] = useState(false);
  const [
    address,
    setAddress,
  ] = useState('');
  const [
    connectedData,
    setConnectedData,
  ] = useState(null);

  const [
    isConnected,
    setIsConnected,
  ] = useState(false);
  const [
    userInfo,
    setUserInfo,
  ] = useState({});

  useEffect(() => {
    function checkConnectedWallet() {
      const userData = JSON.parse(localStorage.getItem('userAccount'));
      if (userData != null) {
        setUserInfo(userData);
        setIsConnected(true);
      }
    }
    checkConnectedWallet();
  }, []);

  const getDefaultPathName = () => {
    // return different route to authenticated user
    return '/';
  };

  const { from } = location.state || { from: { pathname: getDefaultPathName() } };

  if (authenticated) return <Navigate to={from} />; // todo

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      // eslint-disable-next-line
      provider = window.web3.currentProvider;
    } else {
      console.log(
        'Non-Ethereum browser detected. You should consider trying MetaMask!',
      );
    }
    return provider;
  };

  const saveUserInfo = (ethBalance, account, chainId) => {
    const userAccount = {
      account,
      balance: ethBalance,
      connectionid: chainId,
    };
    window.localStorage.setItem('userAccount', JSON.stringify(userAccount)); // user persisted data
    const userData = JSON.parse(localStorage.getItem('userAccount'));
    setUserInfo(userData);
    setIsConnected(true);
  };

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        if (currentProvider !== window.ethereum) {
          console.log(
            'Non-Ethereum browser detected. You should consider trying MetaMask!',
          );
        }
        await currentProvider.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const chainId = await web3.eth.getChainId();
        const account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account); // Get wallet balance
        ethBalance = web3.utils.fromWei(ethBalance, 'ether'); // Convert balance to wei
        saveUserInfo(ethBalance, account, chainId);
        if (userAccount.length === 0) {
          console.log('Please connect to meta mask');
        }
      }
    } catch (err) {
      console.log(
        'There was an error fetching your accounts. Make sure your Ethereum client is configured correctly.',
      );
    }
  };

  const onDisconnect = () => {
    window.localStorage.removeItem('userAccount');
    setUserInfo({});
    setIsConnected(false);
  };

  const toAddress = '0x402F36deFea46FF57C8a9C6e6A0A80c82b23cF68';

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
    }];

  const onPressConnect = async () => {
    setLoading(true);
    const yourWebUrl = 'mysite.com'; // Replace with your website domain
    const deepLink = `https://metamask.app.link/dapp/${yourWebUrl}`;
    const downloadMetamaskUrl = 'https://metamask.io/download.html';
    console.log('onpress: ', metaMask);
    await metaMask.init();
    const result = await metaMask.connect();
    console.log(address);
    setConnectedData(result);
    setLoading(false);
  };

  const onPressSend = async () => {
    const result = await metaMask.transfer(toAddress, 1);
  };

  const onPressNFTToken = async () => {
    const result = await metaMask.generateNFT(toAddress);
  };

  const onPressFetch = async () => {
    const blocks = await metaMask.getBlocks();
    console.log(blocks);
  };

  const entries = _.map(connectedData, (val, key) => ({
    label: key,
    value: val,
  }));
  console.log(entries);
  return (
    <Wrapper>
      <FormContainer>
        <StyledButton
          type="submit"
          transparent
          disabled={false}
          onClick={onPressConnect}
        >
          <LoginText>
            Connect a wallet
          </LoginText>
        </StyledButton>

        <DataView entries={entries} />
        <Divider
          verticalMargin={24}
        />
        <StyledButton
          type="submit"
          transparent
          disabled={false}
          onClick={onPressSend}
        >
          <LoginText>
            Send Pacto
          </LoginText>
        </StyledButton>
        <Divider
          verticalMargin={24}
        />
        <ProjectForm />
        <Divider
          verticalMargin={24}
        />

        <StyledButton
          type="submit"
          transparent
          disabled={false}
          onClick={onPressNFTToken}
        >
          <LoginText>
            Generate NFT Token
          </LoginText>
        </StyledButton>
        <StyledButton
          type="submit"
          transparent
          disabled={false}
          onClick={onPressFetch}
        >
          <LoginText>
            Fetch Block
          </LoginText>
        </StyledButton>
        <TableContainer>
          <AntDTable
            data={[
              {
                a: 'b',
                c: 'd',
                e: 'f',
              },
              {
                a: 'b',
                c: 'd',
                e: 'f',
              },
              {
                a: 'b',
                c: 'd',
                e: 'f',
              },
            ]}
            cellRenderers={[
              {
              // key: 'a',
                title: 'first-c',
                dataIndex: 'a',
                render: (a) => <div>{a}</div>,
              },
              {
                // key: 'a',
                title: 'first-c',
                dataIndex: 'a',
                render: (a) => console.log(a),
              },
            ]}
          />
        </TableContainer>
        <ErrorWrapper>
          {signInError && <P palette="error">{signInError.message}</P>}
        </ErrorWrapper>
      </FormContainer>
    </Wrapper>
  );
};

Home.propTypes = { ...propTypes.reactRouter };

export default Home;
