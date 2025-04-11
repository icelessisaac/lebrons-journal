"use client";
import { ConnectButton, useActiveAccount } from "thirdweb/react";

import { client } from "@/server";
import { CONTRACT, myChain } from "@/server/contracts/message";

import { SendMessage } from "@/components/message/sendMessage";
import { ReceiveMessage } from "@/components/message/receiveMessage";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useReadContract } from "thirdweb/react";

export default function Message() {
  //const activeAccount = useActiveAccount();
  const activeAccount = true;

  const walletAddress = activeAccount?.address;
  const {
    data: messages,
    isLoading: loadingMessages,
    refetch,
    isFetching,
  } = useReadContract({
    contract: CONTRACT,
    method: "receiveMessagesContentWithSender",
    params: [walletAddress as string], // 确保参数为 string[]
  });

  return (
    <main className=" min-h-full max-h-full flex flex-col justify-start container max-w-screen-xl mx-auto">
      <div className="mb-6">
        <ConnectButton
          client={client}
          chain={myChain}
          appMetadata={{
            name: "Example App",
            url: "localhost:3000",
          }}
        />
      </div>

      {activeAccount && (
        <div className="grid grid-cols-2">
          <div className="flex-1 border rounded border-gray-70 max-h-svh bg-red-700">
            <h1 className="text-4xl font-bold mb-4">Entries</h1>
            <Button
              onClick={() => refetch()}
              className="mb-4"
              disabled={isFetching}
              variant="default"
            >
              {isFetching ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" />
                  Refreshing...
                </div>
              ) : (
                "Refresh Messages"
              )}
            </Button>
            <ReceiveMessage
              loadingMessages={loadingMessages}
              isFetching={isFetching}
              messages={messages}
            />
          </div>
          <div className="">
            <SendMessage />
          </div>
        </div>
      )}
    </main>
  );
}
