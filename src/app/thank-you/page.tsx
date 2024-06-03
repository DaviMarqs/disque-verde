import { Header } from "@/components/Header";
import Image from "next/image";

export default function ThankYou() {
  return (
    <>
      <Header />
      <div className="flex min-h-screen justify-center flex-col bg-green-700">
        <div className="flex rounded-lg m-auto">
          <Image 
            src="/thank-you.png"
            alt="Obrigado"
            className="dark:invert"
            width={500}
            height={24}
            priority
          />
        </div>
      </div>
    </>
  );
}
