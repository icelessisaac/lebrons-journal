"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  entries: {
    index: number;
    message: string;
  }[];
};

export default function AccordionEntry({ entries }: Props) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {entries.map((entry) => (
        <AccordionItem key={entry.index} value={`item-${entry.index}`}>
          <AccordionTrigger>Entry #{entry.index}</AccordionTrigger>
          <AccordionContent>{entry.message}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}