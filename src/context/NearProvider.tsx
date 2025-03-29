"use client";

import { Wallet } from "@/services/near-wallet";
import { useEffect, useState } from "react";
import { NearContext } from "./context";

// NEAR WALLET
const wallet = new Wallet({
  networkId: "mainnet",
  createAccessKeyFor: "intents.near",
});

export function NearProvider({ children }: { children: React.ReactNode }) {
  const [signedAccountId, setSignedAccountId] = useState("");

  useEffect(() => {
    wallet.startUp(setSignedAccountId).then(() => {});
  }, [signedAccountId]);

  return (
    <NearContext.Provider value={{ wallet, signedAccountId }}>
      {children}
    </NearContext.Provider>
  );
}
