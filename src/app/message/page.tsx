"use client";
import { ConnectButton, useActiveAccount } from "thirdweb/react";


import { client } from "@/server";
import { CONTRACT, myChain } from "@/server/contracts/message";


import { SendMessage } from "@/components/message/sendMessage";
import { ReceiveMessage } from "@/components/message/receiveMessage";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useReadContract } from "thirdweb/react";
import AccordionEntry from "@/components/message/AccordionEntry";


export default function Message() {
 const activeAccount = useActiveAccount();
 const walletAddress = activeAccount?.address;


 const {
   data: messages,
   isLoading: loadingMessages,
   refetch,
   isFetching,
 } = useReadContract({
   contract: CONTRACT,
   method: "receiveMessagesContentWithSender",
   params: [walletAddress as `0x${string}`],
 });


 return (
   <main className="min-h-full max-h-full flex flex-col justify-start container max-w-screen-lg mx-auto">
     {activeAccount && (
       <div className="grid grid-cols-2 gap-8 mt-6">
         {/* Entries Box */}
         <div className="h-[92vh] border rounded border-gray-700 bg-black p-6 overflow-y-auto">
           {/* Header Row */}
           <div className="flex justify-between items-center mb-6">
             <h1 className="text-4xl font-bold">Entries</h1>
             <ConnectButton
               client={client}
               chain={myChain}
               appMetadata={{
                 name: "Example App",
                 url: "localhost:3000",
               }}
             />
           </div>


           {/* Refresh Button */}
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
               "Refresh"
             )}
           </Button>


           {/* Accordion Entries */}
           <AccordionEntry
             entries={
               Array.isArray(messages)
                 ? messages.map((m, i) => ({
                     index: i + 1,
                     message: m[0],
                   }))
                 : []
             }
           />
         </div>


         {/* Journal Box */}
         <div className="h-[92vh] border rounded border-gray-700 bg-black p-4 overflow-y-auto">
           <SendMessage />
         </div>
       </div>
     )}
   </main>
 );
}
