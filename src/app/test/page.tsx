"use client";
import Image from "next/image";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";

import { client } from "@/server";
import { myChain } from "@/server/contracts/counter";

import { GetAddress } from "@/components/getAddressButton";
import { Counter } from "@/components/counter";

export default function Home() {
  const activeAccount = useActiveAccount();

  return (
    <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
      <div className="py-20">
        <Header />

        <div className="flex flex-col items-center mb-20">
          <ConnectButton
            client={client}
            chain={myChain}
            appMetadata={{
              name: "Example App",
              url: "localhost:3000",
            }}
          />
          {activeAccount && (
            <>
              <Counter />
              <GetAddress />
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-col items-center mb-20 md:mb-20">
      <Image
        src={thirdwebIcon}
        alt=""
        className="size-[150px] md:size-[150px]"
        style={{
          filter: "drop-shadow(0px 0px 24px #a726a9a8)",
        }}
      />

      <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100">
        <span className="text-white">THE</span>
        <span className="text-zinc-300 inline-block mx-1"> + </span>
        <span className="inline-block -skew-x-6 text-blue-500">JOURNAL</span>
      </h1>

      <p className="text-zinc-300 text-base">
        Take a Break From All the Noise
      </p>
    </header>
  );
}

