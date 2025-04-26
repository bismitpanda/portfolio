import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";

interface CodeSnippet {
  title: string;
  description: string;
  language: string;
  code: string;
}

interface CodeSnippetDialogProps {
  snippet: CodeSnippet;
  children: React.ReactNode;
}

export function CodeSnippetDialog({
  snippet,
  children,
}: CodeSnippetDialogProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    void navigator.clipboard.writeText(snippet.code).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <>
      <div
        onClick={() => {
          setOpen(true);
        }}
      >
        {children}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl">{snippet.title}</DialogTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-muted/50">
                  {snippet.language}
                </Badge>
              </div>
            </div>
            <p className="text-muted-foreground mt-2">{snippet.description}</p>
          </DialogHeader>
          <div className="relative mt-4">
            <div className="bg-muted/50 p-4 rounded-lg overflow-x-auto font-mono text-sm whitespace-pre">
              {snippet.code}
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2 h-8 w-8 p-0"
              onClick={copyToClipboard}
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy code</span>
            </Button>
            {copied && (
              <div className="absolute top-2 right-12 bg-primary text-primary-foreground text-xs py-1 px-2 rounded">
                Copied!
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
