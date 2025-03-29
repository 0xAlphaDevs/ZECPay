"use client";

import { useContext, useEffect } from "react";
import { NearContext } from "@/context/context";
import { Button } from "../ui/button";
// import Image from "next/image";
import { useRouter } from "next/navigation";

const ConnectButton = () => {
  const { wallet, signedAccountId } = useContext(NearContext);
  const router = useRouter();

  const signIn = () => {
    wallet.signIn();
  };

  const signOut = () => {
    wallet.signOut();
    router.push("/");
  };

  useEffect(() => {
    if (signedAccountId) {
      router.push("/");
    }
  }, [signedAccountId]);

  return (
    <nav className="px-8 py-4">
      <div className="">
        {/* <a href="/" className=" flex place-items-baseline ">
          <Image
            src="/logo.png"
            alt="Near"
            height={30}
            width={30}
            className=""
          />
          <p className="text-3xl font-bold italic">Pay</p>
        </a> */}
        <div className="flex items-center gap-4">
          {signedAccountId ? (
            <p className="flex justify-centerw-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-1 rounded-full font-semibold text-sm shadow-md border border-blue-700 items-center gap-2">
              Account : {signedAccountId}
            </p>
          ) : (
            ""
          )}

          <div className="">
            {signedAccountId ? (
              <Button
                className="bg-red-600 hover:bg-red-500 text-white text-lg px-8 py-6 rounded-full"
                onClick={signOut}
              >
                Disconnect
              </Button>
            ) : (
              <Button
                className="bg-green-400 text-black hover:bg-green-500 text-lg px-8 py-6 rounded-full"
                onClick={signIn}
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ConnectButton;
