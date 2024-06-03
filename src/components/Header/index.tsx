"use client";
import { useAuth } from "@/app/context/authContext";
import { User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    const isAuthenticated = await login(username, password);
    if (isAuthenticated) {
      router.push("/all-occurrences");
    }
  };

  return (
    <header className="bg-green-700 w-full h-1 flex justify-center">
      <div className="flex items-center justify-between max-w-screen-lg mx-auto p-6 w-full">
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Logo Disque Verde"
            className="dark:invert hover:cursor-pointer pt-2"
            width={50}
            height={50}
            priority
            onClick={() => router.push("/")}
          />
        </div>
        <h1 className="text-sm font-sans text-white font-medium ml-12">
          Disque Verde
        </h1>
        <div className="flex items-center gap-8">
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
                  <Button
                    className="mt-2 px-3 py-1 bg-green-700 text-white rounded"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button variant="outline" className="w-16 text-white bg-transparent rounded-lg" onClick={() => router.push("/about")}>
            Sobre
          </Button>
        </div>
      </div>
    </header>
  );
}
