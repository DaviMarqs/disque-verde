"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-24 mx-auto bg-green-700 justify-center relative">
      <div className="flex flex-1 flex-col items-center gap-4 mt-4">
        <Image
          src="/disque_verde_splash.svg"
          alt="Logo Disque Verde"
          className="dark:invert"
          width={380}
          height={24}
          priority
        />
        <p className="flex w-full justify-center text-white text-3xl font-thin">
          <span className="font-bold italic mr-2">DISQUE</span> VERDE
        </p>

        <Link href="/occurrence">
          <Button className="w-full font-medium bg-slate-100 text-slate-900 hover:bg-green-800 hover:text-slate-100 hover:shadow hover:animate-pulse">
            Faça sua denúncia aqui!
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center p-4 bg-green-700 gap-4 mb-4">
        <Image
          src="/secretaria_meio_amb_logo.png"
          alt="Logo Prefeitura"
          className="dark:invert"
          width={140}
          height={24}
        />
        <Image
          src="/prefeitura_logo.png"
          alt="Logo Prefeitura"
          className="dark:invert"
          width={160}
          height={24}
        />
      </div>
    </main>
  );
}
