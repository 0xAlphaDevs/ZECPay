"use client";

import { Wallet } from "@/services/near-wallet";
import { useEffect, useState } from "react";
import { NearContext } from "./context";

// NEAR WALLET
const wallet = new Wallet({
  networkId: "testnet",
  createAccessKeyFor: "v1.signer-prod.testnet",
});


export function NearProvider({ children }: { children: React.ReactNode }) {
  const [signedAccountId, setSignedAccountId] = useState("");


  useEffect(() => {
    wallet.startUp(setSignedAccountId).then(() => {
      // getEthAddress();
      // getBtcAddress();
    });

    // set eth address
    // async function getEthAddress() {
    //   const { address } = await Eth.deriveAddress(
    //     signedAccountId,
    //     "ethereum-1"
    //   );
    //   console.log("eth address", address);

    //   setEthAddress(address);
    // }

    // set btc address
    // async function getBtcAddress() {
    //   const { address } = await BTC.deriveAddress(signedAccountId, "bitcoin-1");
    //   console.log("btc address", address);

    //   setBtcAddress(address);
    // }
  }, [signedAccountId]);

  return (
    <NearContext.Provider
      value={{ wallet, signedAccountId }}
    >
      {children}
    </NearContext.Provider>
  );
}
