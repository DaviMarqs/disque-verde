"use client";
import { User } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export function Header() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <header className="bg-green-700 w-full h-1 flex justify-center">
      <div className="flex items-center mt-6 md:space-x-80">
        {/* <img src="/disque_verde_logo.svg" alt="Logo Disque Verde" className="dark:invert" /> */}
        <div>logo</div>
        <h1 className="text-sm font-bold text-white font-medium">
          Disque Verde
        </h1>

        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <User className="h-6 w-6 cursor-pointer" color="white" />
              </TooltipTrigger>
              <TooltipContent className="bg-white p-4 rounded-lg shadow-lg">
                <div className="flex flex-col items-start">
                  <Label className="mb-1 text-sm">
                    Nome:
                    <Input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="border p-1 rounded w-full mt-1"
                    />
                  </Label>
                  <Label className="mt-2 mb-1 text-sm">
                    Senha:
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border p-1 rounded w-full mt-1"
                    />
                  </Label>
                  <Button className="mt-2 px-3 py-1 bg-green-700 text-white rounded">
                    Login
                  </Button>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
}
