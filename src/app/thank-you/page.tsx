import { Header } from "@/components/Header";

export default function ThankYou() {
  return (
    <>
      <Header />
      <div className="flex min-h-screen justify-center flex-col bg-green-700">
        <div className="w-10/12 lg:w-2/4 p-4 rounded-lg  bg-slate-100 m-auto">
          <h1 className="text-2xl mb-4">Obrigado!</h1>
          <p className="mb-4">Seu cadastro foi realizado com sucesso!</p>
        </div>
      </div>
    </>
  );
}
