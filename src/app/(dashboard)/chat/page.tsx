"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Loader2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllModels, DEFAULT_MODEL, type ModelId } from "@/lib/ai/models";

export default function ChatPage() {
  const [selectedModel, setSelectedModel] = useState<ModelId>(DEFAULT_MODEL);
  const [inputValue, setInputValue] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: {
        modelId: selectedModel,
      },
    }),
  });

  const models = getAllModels();
  const isLoading = status === "streaming" || status === "submitted";

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle form submission
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    sendMessage({ text: inputValue });
    setInputValue("");
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setInputValue("");
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Chat</h1>
          <Select
            value={selectedModel}
            onValueChange={(value) => setSelectedModel(value as ModelId)}
          >
            <SelectTrigger className="w-50">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" onClick={handleNewChat}>
          <Plus className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 py-4" ref={scrollAreaRef}>
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <Bot className="text-muted-foreground mx-auto h-12 w-12" />
              <h2 className="mt-4 text-lg font-semibold">
                Start a conversation
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                Send a message to begin chatting with the AI assistant.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 px-1">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <Card
                  className={cn(
                    "max-w-[80%] p-4",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {message.parts.map((part, index) => {
                      if (part.type === "text") {
                        return <span key={index}>{part.text}</span>;
                      }
                      return null;
                    })}
                  </div>
                </Card>
                {message.role === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <Card className="bg-muted p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </Card>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <div className="border-t pt-4">
        <form onSubmit={onSubmit} className="flex gap-2">
          <Textarea
            ref={textareaRef}
            name="prompt"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="min-h-15 flex-1 resize-none"
            rows={1}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !inputValue.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
        <p className="text-muted-foreground mt-2 text-center text-xs">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
