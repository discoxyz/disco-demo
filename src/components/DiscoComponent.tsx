import React, { useState } from 'react';
import { useEthers } from "@usedapp/core";
import { Input, Button, Link } from '@chakra-ui/react'
import { profile } from 'console';

type Props = {
  isOpen: any;
};

export default function DiscoComponent({isOpen}: Props) {
  // const [pageState, setPageState] = useState('');
  const [profileFound, setProfileFound] = useState('fetching');
  const { account } = useEthers();
  // console.log("loaded dot env:" + process.env.REACT_APP_BEARER_TOKEN);
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
        // setPageState('fetched');
        setProfileFound('found!');
      } else { 
        console.log("Profile not found!")
        setProfileFound('not found');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const renderFetching = () => {
    return (
      <div onLoad= {() => getDiscoProfile()} className='container'>
        <h3> <b> My Profile Details: </b> </h3>
        <div>
            <label>Connected Wallet: </label>
              {account}
        </div>
        <h3>Searching for Disco User Profile...</h3>
        {/* <div> {getDiscoProfile()} </div>  */}
        <Button
          variant='outline-secondary'
          onClick={() => getDiscoProfile()}
        >
          Refresh
        </Button>
      </div>
    );
  }

  const renderNotFound = () => {
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
          <div>
            Sorry, no valid Disco Profile found for your ETH address. Please sign up 
            <Link href="http://app.disco.xyz" target="_blank"> here.</Link>
          </div>
        </div>
         <Button
          variant='outline'
          onClick={() => getDiscoProfile()}
        >
          Refresh
        </Button>
      </div>
    );
  }

  const renderProfileFound = () => {
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
          onClick={() => getDiscoProfile()}
        >
          Refresh
        </Button>
      </div>
    );
  }

  const masterRender = (profileFound: string) => {
    if(profileFound === 'fetching') {
      return renderFetching();
    } else if (profileFound === 'not found') {
      return renderNotFound();
    } else {
      return renderProfileFound();
    }
  }

  console.log("profileFound" + profileFound);
  return masterRender(profileFound);
}
