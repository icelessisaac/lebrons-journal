下面给出一个示例方案，将原先页面中内嵌的获取消息与发送消息部分拆分成两个独立的组件（ReceiveMessage 和 SendMessage），然后在最终的 Message 页面中直接引入并使用这两个组件。

------

### 1. ReceiveMessage.tsx

这个组件负责调用合约方法获取接收到的消息，并以表格形式展示，同时支持刷新数据。可以将下面代码保存为 `ReceiveMessage.tsx`：

```tsx
"use client";
import { CONTRACT } from "@/server/contracts/message";
import { useReadContract, useActiveAccount } from "thirdweb/react";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ReceiveMessage() {
  const activeAccount = useActiveAccount();
  const walletAddress = activeAccount?.address;
  console.log("walletAddress: ", walletAddress);

  const {
    data: messages,
    isLoading: loadingMessages,
    refetch,
    isFetching,
  } = useReadContract({
    contract: CONTRACT,
    method: "receiveMessagesContentWithSender",
    params: [walletAddress as string],
  });

  console.log("message:", messages);

  return (
    <div className="flex flex-col items-center mt-8 w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">Received Messages</h1>
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

      {loadingMessages || isFetching ? (
        <Alert className="mt-4" variant="default">
          <Loader2 className="animate-spin mr-2" />
          <AlertDescription>Loading messages...</AlertDescription>
        </Alert>
      ) : messages && messages[0].length > 0 ? (
        <Table className="w-full mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Index</TableHead>
              <TableHead>From</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages[0].map((content: string, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{messages[1][index]}</TableCell>
                <TableCell>{content}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Alert className="mt-4">
          <AlertTitle>No messages received</AlertTitle>
          <AlertDescription>
            You have not received any messages yet. Please check back later.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
```

------

### 2. SendMessage.tsx

这个组件用于输入接收者地址和消息内容，并利用 TransactionButton 调用合约方法发送消息。请将下面代码保存为 `SendMessage.tsx`：

```tsx
"use client";
import { CONTRACT } from "@/server/contracts/message";
import { prepareContractCall } from "thirdweb";
import { TransactionButton } from "thirdweb/react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function SendMessage() {
  const [recipient, setRecipient] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="flex flex-col items-center mt-8 w-full">
      <h1 className="text-4xl font-bold mb-6">Send Message</h1>
      <div className="flex flex-col gap-6 w-full max-w-lg">
        <Input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <Textarea
          placeholder="Message Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <TransactionButton
          transaction={() =>
            prepareContractCall({
              contract: CONTRACT,
              method: "sendMessage",
              params: [recipient, content],
            })
          }
          onTransactionConfirmed={() => {
            setRecipient("");
            setContent("");
            console.log("Message sent successfully");
          }}
          onTransactionSent={() => console.log("Sending message...")}
          className="px-4 py-2 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-300 transition-all duration-300"
        >
          Send Message
        </TransactionButton>
      </div>
    </div>
  );
}
```

------

### 3. Message.tsx（最终页面）

在最终页面中，只需引入并使用上面两个组件即可。这里我们依然保留原有的连接判断（useActiveAccount）和整体页面布局（使用 grid 双栏布局）。请将下列代码保存为 `Message.tsx`：

```tsx
"use client";
import { useActiveAccount } from "thirdweb/react";
import { ConnectButton } from "thirdweb/react";
import { client } from "@/server";
import { myChain } from "@/server/contracts/message";

// 引入拆分后的两个组件
import { ReceiveMessage } from "@/components/message/ReceiveMessage";
import { SendMessage } from "@/components/message/SendMessage";

export default function Message() {
  const activeAccount = useActiveAccount();

  return (
    <main className="min-h-full max-h-full flex flex-col justify-start container max-w-screen-lg mx-auto">
      {activeAccount ? (
        <div className="grid grid-cols-2 gap-8 mt-6">
          {/* Left Column: Received Messages */}
          <div className="h-[92vh] border rounded border-gray-700 bg-black p-6 overflow-y-auto">
            {/* Header Row 可以在此处放置 ConnectButton */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-4xl font-bold">Messages</h1>
              <ConnectButton
                client={client}
                chain={myChain}
                appMetadata={{
                  name: "Example App",
                  url: "localhost:3000",
                }}
              />
            </div>
            <ReceiveMessage />
          </div>

          {/* Right Column: Send Message */}
          <div className="h-[92vh] border rounded border-gray-700 bg-black p-4 overflow-y-auto">
            <SendMessage />
          </div>
        </div>
      ) : (
        // 如果钱包未连接，则只显示连接按钮
        <div className="flex items-center justify-center min-h-screen">
          <ConnectButton
            client={client}
            chain={myChain}
            appMetadata={{
              name: "Example App",
              url: "localhost:3000",
            }}
          />
        </div>
      )}
    </main>
  );
}
```

------

### 说明

- **拆分组件**
   我们将接收消息部分和发送消息部分拆分为两个独立组件（分别放在 `ReceiveMessage.tsx` 和 `SendMessage.tsx`），这样可以使各自的业务逻辑更加清晰和独立。
- **最终页面 Message.tsx**
   在最终页面中，根据用户是否连接钱包判断显示内容；连接后使用 grid 布局分左右两栏，其中左侧为接收消息（包含一个顶部的 ConnectButton 和标题）而右侧为发送消息。未连接时则展示仅有的 ConnectButton。

通过这样的拆分和整合，你可以更容易维护和扩展各自模块，同时在页面中直观地使用这两个独立组件。