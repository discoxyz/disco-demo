import React, { useState, useEffect } from 'react';
import { useEthers } from "@usedapp/core";
import { Input, Button, ButtonGroup } from '@chakra-ui/react'

type Props = {
  isOpen: any;
};

export default function DiscoComponent({isOpen}: Props) {
  const [pageState, setPageState] = useState('edit');

  const { activateBrowserWallet, account } = useEthers();
  // console.log("loaded dot env:" + process.env.REACT_APP_BEARER_TOKEN);
  const [wallet, setWallet] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  const getDiscoProfile = async () => {
    // const base64 = require('base-64');

    console.log("eth address found: " + account);
    const walletAddr = {account};
    const disco_profile_by_address = process.env.REACT_APP_DISCO_API_URL + `/address/${walletAddr.account}`;
    // console.log(disco_profile_by_address);
    const token = process.env.REACT_APP_BEARER_TOKEN;

    const headers = new Headers();

    headers.set(
      'Authorization',
      'Bearer ' + token,
    );
    headers.set('Accept', 'application/json');
    headers.set('Content', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );

    console.log(headers);

    try {
      console.log("querying disco api...");
      const response = await fetch(disco_profile_by_address, {
        method: 'GET',
        headers: headers,
      });
      
      if (response.ok) {
        const user_info = await response.json();
        console.log(user_info);
        setName(user_info["profile"].name);
        setBio(user_info["profile"].bio);
        setPageState('value');
      }
    } catch (e) {
      console.log(e);
    }
  };

//   useEffect(async () => {
//     const _currentAccount = await checkIfWalletIsConnected();
//     setWallet(_currentAccount);
//     const _requiredDeposit = await getRequiredDeposit();
//     setRequiredDeposit(_requiredDeposit);
//     await getUserEmail();
//   }, []);

  const renderEdit = () => {
    return (
      <div className='container'>
        <h3>Disco User Profile</h3>
        <div className='disco-form'>
          <div className='form-row'>
            <Input
              placeholder='discord username'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Input>
            <Input
              placeholder='This is an example bio'
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></Input>
          </div>
        </div>
        <Button
          onClick={getDiscoProfile}
        >
          Click here to fetch Disco Profile!
        </Button>
      </div>
    );
  }

  const renderValue = () => {
    return (
      <div className='container'>
        <h3> <b> My Profile Details: </b> </h3>
        <div className='profile-form'>
          <div className='form-row'>
            <div>
            <label>Connected Wallet: </label>
              {account}
            </div>
          </div>
          <div className='form-row'>
            <div>
            <label>Name: </label>
              {name}
            </div>
            <div>
            <label>Bio: </label>
              {bio}
            </div>
          </div>
        </div>
         <Button
          variant='outline-secondary'
          onClick={() => setPageState('edit')}
        >
          Go Back
        </Button>
      </div>
    );
  }

  const masterRender = (pageState: string) => {
    if(pageState == 'edit') {
      return renderEdit();
    } else {
      return renderValue();
    }
  }

  return masterRender(pageState);
}
