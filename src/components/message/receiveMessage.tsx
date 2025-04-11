"use client";
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

export interface ReceiveMessageProps {
  loadingMessages: boolean
  isFetching: boolean
  messages: [readonly string[], readonly string[]] | undefined
}

export function ReceiveMessage({loadingMessages, isFetching, messages}: ReceiveMessageProps ) {
  const testMessages = [
  {
    content: 'aklsdkasdklj'
  },
  {
    content: 'aklsdkasdklj'
  },
  {
    content: 'aklsdkasdklj'
  },
  {
    content: 'aklsdkasdklj'
  },
  {
    content: 'aklsdkasdklj'
  },
  {
    content: 'aklsdkasdklj'
  },
  {
    content: 'aklsdkasdklj'
  },
  {
    content: 'aklsdkasdklj'
  },
  {
    content: 'aklsdkasdklj'
  },
  {
    content: 'aklsdkasdklj'
  },
  {
    content: 'aklsdkasdklj'
  },
  {
    content: 'aklsdkasdklj'
  },
  {
    content: 'aklsdkasdklj'
  },
  {
    content: 'aklsdkasdklj'
  },
]
  return (
    <div className="max-h-32">
      {loadingMessages || isFetching ? (
        <Alert className="mt-4" variant="default">
          <Loader2 className="animate-spin mr-2" />
          <AlertDescription>Loading messages...</AlertDescription>
        </Alert>
      ) : messages && messages[0].length > 0 ? (
        <Table className="max-h-48">
          <TableHeader>
            <TableRow>
              <TableHead>Index</TableHead>
              {/* <TableHead>From</TableHead> */}
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages[0].map((content: string, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                {/* <TableCell>{messages[1][index]}</TableCell> */}
                <TableCell>{content}</TableCell>
              </TableRow>
            )).reverse()}
             {testMessages.map((el, i) => (
              <TableRow key={i}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{el.content}</TableCell>
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
