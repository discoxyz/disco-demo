import React, { useState, useEffect } from "react";
import { useEthers } from "@usedapp/core";
import { Button, Container, Link, Text } from "@chakra-ui/react";
import { Confetti } from "./Confetti";

export const DiscoComponent: React.FunctionComponent = () => {
  const DISCONAUT_CREDENTIAL = "OfficialDisconautCredential";
  const [profileFound, setProfileFound] = useState("test");
  const { account } = useEthers();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [domain, setDomain] = useState("");
  const [numCreds, setNumCreds] = useState(-1);
  const [disconautCred, setDisconautCred] = useState(false);

  useEffect(() => {
    console.log("account state changed to", account);
    if (account != undefined) {
      getDiscoProfile();
    }
    if (account == undefined) {
      setProfileFound("not found");
    }
  }, [account]);

  const getDiscoProfile = async () => {
    console.log("eth address found: " + account);
    const walletAddr = { account };
    const disco_profile_by_address =
      process.env.REACT_APP_DISCO_API_URL + `/address/${walletAddr.account}`;
    const token = process.env.REACT_APP_BEARER_TOKEN;
    const headers = new Headers();
    headers.set("Authorization", "Bearer " + token);
    headers.set("Accept", "application/json");
    headers.set("Content", "application/json");
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    console.log(headers);

    try {
      console.log("querying disco api...");
      const response = await fetch(disco_profile_by_address, {
        method: "GET",
        headers: headers,
      });

      if (response.ok) {
        const user_info = await response.json();
        console.log("USER INFO:");
        console.log(user_info);
        if (user_info["profile"]) {
          setName(user_info["profile"].name);
          setBio(user_info["profile"].bio);
        }
        user_info["linkages"]["twitter"]
          ? setTwitter(user_info["linkages"]["twitter"].id)
          : setTwitter("");
        user_info["linkages"]["discord"]
          ? setDiscord(user_info["linkages"]["discord"].id)
          : setDiscord("");
        user_info["linkages"]["dns"]
          ? setDomain(user_info["linkages"]["dns"].id)
          : setDomain("");

        setProfileFound("found!");

        //check for credentials.
        setDisconautCred(false);
        if (user_info["creds"].length > 0) {
          setNumCreds(user_info["creds"].length);
          console.log(user_info["creds"]);
          //iterate thru array if credential is detected, set disconaut cred to true

          user_info["creds"].forEach(
            (cred: { [x: string]: string | string[] }) => {
              console.log(cred["type"]);
              if (cred["type"].includes(DISCONAUT_CREDENTIAL)) {
                console.log("credential found");
                setDisconautCred(true);
              }
            }
          );
        }
      } else {
        setProfileFound("not found");
      }
    } catch (e) {
      console.log("CATCH");
      console.log(e);
    }
  };

  const renderFetching = () => {
    return (
      <Container variant="container">
        <Container variant="content">
          <Text variant="heading">Disco Profile Details</Text>

          <Text variant="details">
            <label>Connected Wallet: </label>
            {account}
          </Text>
          <Button
            variant="connectWallet"
            mx="auto"
            mt={4}
            zIndex={1}
            onClick={() => getDiscoProfile()}
          >
            Refresh
          </Button>
        </Container>
      </Container>
    );
  };

  const renderNotFound = () => {
    return (
      <Container variant="container">
        <Container variant="content">
          <Text variant="details" my={4}>
            Sorry, no ETH address with a valid Disco Profile detected.
            <br />
            Please connect wallet or create a Disco Profile&nbsp;
            <Link
              variant="link"
              href="https://app.disco.xyz/onboarding"
              target="_blank"
            >
              here
            </Link>
            .
          </Text>

          <Button
            variant="connectWallet"
            mx="auto"
            mt={4}
            zIndex={1}
            onClick={() => getDiscoProfile()}
          >
            Refresh
          </Button>
        </Container>
      </Container>
    );
  };

  const renderProfileFound = () => {
    return (
      <Container variant="container">
        <Container variant="content">
          <Text variant="heading">Disco Profile Details</Text>
          {account && (
            <Text variant="details">
              <label>Connected Wallet: </label>
              {account}
            </Text>
          )}

          {name && (
            <Text variant="details">
              <label>Name: </label>
              {name}
            </Text>
          )}
          {bio && (
            <Text variant="details">
              <label>Bio: </label>
              {bio}
            </Text>
          )}
          {(name || bio) && <br />}

          {twitter && !discord && !domain && (
            <Text variant="details">
              No Connected Accounts (should never see this)
            </Text>
          )}
          {(twitter || discord || domain) && (
            <Text variant="details" textDecoration="underline">
              Connected Accounts
            </Text>
          )}
          {twitter && (
            <Text variant="details">
              <label> Twitter: </label>
              {twitter}
            </Text>
          )}
          {discord && (
            <Text variant="details">
              <label> Discord: </label>
              {discord}
            </Text>
          )}
          {domain && (
            <Text variant="details">
              <label> Domain: </label>
              {domain}
            </Text>
          )}
          <br />
          {numCreds >= 0 && (
            <Text variant="details">
              {numCreds} Credential{numCreds === 1 ? "" : "s"} Found!
            </Text>
          )}
          {disconautCred && (
            <Text variant="details" fontWeight={700}>
              &#x1F38A; Your official Disconaut credential is detected!
              &#x1F38A;
            </Text>
          )}
          {disconautCred && <Confetti />}
          <Button
            variant="connectWallet"
            mx="auto"
            mt={4}
            zIndex={1}
            onClick={() => getDiscoProfile()}
          >
            Refresh
          </Button>
        </Container>
      </Container>
    );
  };

  const masterRender = (profileFound: string) => {
    if (profileFound === "fetching") {
      return renderFetching();
    } else if (profileFound === "not found") {
      return renderNotFound();
    } else {
      return renderProfileFound();
    }
  };

  console.log("profileFound " + profileFound);

  return masterRender(profileFound);
};
