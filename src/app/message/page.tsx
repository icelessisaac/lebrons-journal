"use client";
import { ConnectButton, useActiveAccount } from "thirdweb/react";

import { client } from "@/server";
import { myChain } from "@/server/contracts/message";

// 导入 SendMessage 和 ReceiveMessage 组件
import { SendMessage } from "@/components/message/sendMessage";
import { ReceiveMessage } from "@/components/message/receiveMessage";
import { Header } from "@/components/header";

export default function Message() {
  // 使用 useActiveAccount 钩子来检查用户是否已连接钱包
  const activeAccount = useActiveAccount();

  return (
    <main className="p-4 min-h-screen flex flex-col items-center justify-start container max-w-screen-xl mx-auto">
      {/* Wallet connect */}
      <div className="mb-4">
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
        <div className="flex flex-row w-full gap-6">
          {/* LEFT: Journal + Chat */}
          <div className="flex flex-col w-2/3 space-y-4">
            {/* Journal Input */}
            <div>
              <label className="text-xl font-semibold mb-1 block">Journal</label>
              <input
                type="text"
                placeholder="Title or Note"
                className="w-full border rounded px-4 py-2 bg-black text-white border-gray-700"
              />
            </div>
  
            {/* Received Messages */}
            <div className="flex-1 border rounded p-4 border-gray-700 overflow-y-auto min-h-[300px] max-h-[500px]">
              <ReceiveMessage />
            </div>
  
            {/* Send Message */}
            <div className="mt-auto">
              <SendMessage />
            </div>
          </div>
  
          {/* RIGHT: Entries */}
          <div className="w-1/3 space-y-4">
            <div className="text-xl font-semibold">Entries</div>
  
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-gray-700 text-white rounded">Refresh</button>
              <button className="px-3 py-1 bg-gray-700 text-white rounded">Manage</button>
              <button className="px-3 py-1 bg-gray-700 text-white rounded">Entries</button>
            </div>
  
            {/* Example Table */}
            <table className="w-full text-left border-collapse mt-2">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="px-2 py-1">Index</th>
                  <th className="px-2 py-1">Date</th>
                  <th className="px-2 py-1">Entry</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="px-2 py-1">1</td>
                  <td className="px-2 py-1">04/08</td>
                  <td className="px-2 py-1">First entry</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="px-2 py-1">2</td>
                  <td className="px-2 py-1">04/07</td>
                  <td className="px-2 py-1">Second entry</td>
                </tr>
                {/* You can dynamically load real entries here later */}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );  
}
