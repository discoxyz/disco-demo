import React, { useState } from 'react';
import { useEthers } from "@usedapp/core";
import { Input, Button, Link } from '@chakra-ui/react'
import { profile } from 'console';

type Props = {
  isOpen: any;
};

export default function DiscoComponent({isOpen}: Props) {
  // const [pageState, setPageState] = useState('');
  const DISCONAUT_CREDENTIAL = "OfficialDisconautCredential";
  const [profileFound, setProfileFound] = useState('fetching');
  const { account } = useEthers();
  // console.log("loaded dot env:" + process.env.REACT_APP_BEARER_TOKEN);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [twitter, setTwitter] = useState('');
  const [discord, setDiscord] = useState('');
  const [domain, setDomain] = useState('');
  const [numCreds, setNumCreds] = useState(0);
  const [disconautCred, setDisconautCred] = useState(false);

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
        setTwitter(user_info["linkages"]["twitter"].id);
        setDiscord(user_info["linkages"]["discord"].id);
        setDomain(user_info["linkages"]["dns"].id);
        // setPageState('fetched');
        setProfileFound('found!');

        //check for credentials.
        if (user_info["creds"].length > 0) {
          setNumCreds(user_info["creds"].length);
          //iterate thru array if credential is detected, set disconaut cred to true
        
          user_info["creds"].forEach((cred: { [x: string]: string | string[]; }) => {
            console.log(cred['type']);
            if (cred['type'].includes(DISCONAUT_CREDENTIAL)) {
              console.log("credential found");
              setDisconautCred(true);
            }
          });
        }
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
        <h4> Checking for credentials...</h4>
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
            Sorry, no valid Disco Profile found for your ETH address. Please create one
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
          <br/>
          <h2> <b> Your connected accounts: </b></h2>
          <div>
            <div>
              <label> Twitter: </label>
                {twitter}
            </div>
            <div>
              <label> Discord: </label>
                {discord}
            </div>
            <div>
              <label> Domain: </label>
                {domain}
            </div>
          </div>
          <br/>
          <h2> <b> {numCreds} Credentials Found! </b></h2>
          <div>
            <div>
              <label> Disco Credential: </label>
                {disconautCred}
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
