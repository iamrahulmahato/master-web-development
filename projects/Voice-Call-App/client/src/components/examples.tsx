"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useChatStore, { Example } from "@/hooks/useChatStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Examples() {
  const examples = useChatStore((state: any) => state.examples);
  const setSelectedExample = useChatStore((state: any) => state.setSelectedExample);
  const selectedExample = useChatStore((state: any) => state.selectedExample);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (examples.length > 0) {
      setSelectedExample(
        examples.find((example: any) => example.url === pathname) as Example,
      );
    }
  }, [pathname, examples]);

  const handleChange = (value: string) => {
    setSelectedExample(
      examples.find((example: any) => example.url === value) as Example,
    );
    router.push(value);
  };

  return (
    <div>
      <Select onValueChange={handleChange} defaultValue={pathname}>
        <SelectTrigger>
          <SelectValue>{selectedExample ? selectedExample.name : "Select an example"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {examples.map((example: any) => (
            <SelectItem key={example.url} value={example.url}>
              {example.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
