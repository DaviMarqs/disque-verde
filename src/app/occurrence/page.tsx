"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { CameraIcon } from "lucide-react";
import { useState } from "react";

export default function Occurrence() {
  const options = [
    { value: "BURNED", label: "Queimada" },
    { value: "TRASH", label: "Lixo em lugar inapropriado" },
    { value: "VANDALISM", label: "Vandalismo Ambiental" },
    { value: "INVASION", label: "Invasão" },
  ];

  const [imageSelected, setImageSelected] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const { toast } = useToast()

  function convertToBase64(file: Blob): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsImageLoading(true);
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await convertToBase64(file);
      setImageSelected(base64 as string);
      console.log(base64);
    } catch (error) {
      console.error(error);
    }
    setIsImageLoading(false);
  };

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-green-700">
      <Card className="w-3/4">
        <CardHeader>
          <CardTitle>Criar Denúncia</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            {step === 1 && (
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    placeholder="Descreva a sua denúncia aqui. Pode colocar horário, localização, e muito mais. Caso seja necessário, envie uma foto logo abaixo!"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="occurrence_type">Tipo de Denúncia</Label>
                  <Select>
                    <SelectTrigger id="occurrence_type">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <Label
                      htmlFor="image"
                      className="cursor-pointer flex items-center space-x-2"
                    >
                      <span>Clique para adicionar uma imagem</span>
                      <CameraIcon size={20} className=" text-green-500" />
                    </Label>
                    <input
                      type="file"
                      id="image"
                      accept="image/png, image/jpeg"
                      className="hidden"
                      onChange={onFileChange}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anonymous"
                    checked={isAnonymous}
                    onCheckedChange={() => setIsAnonymous(!isAnonymous)}
                  />
                  <Label htmlFor="anonymous">Denúncia anônima</Label>
                </div>
              </div>
            )}

            {step === 2 && !isAnonymous && (
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="full_name">Nome completo</Label>
                  <Input id="full_name" placeholder="Digite seu nome completo" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="address">Endereço</Label>
                  <Input id="address" placeholder="Digite seu endereço" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="Digite seu telefone" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" placeholder="Digite seu e-mail" />
                </div>
              </div>
            )}

            {step === 2 && isAnonymous && (
              <div className="flex justify-center items-center">
                <p className="text-center">Sua denúncia será enviada anonimamente.</p>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step === 2 && (
            <Button variant="outline" onClick={handlePrevStep}>
              Voltar
            </Button>
          )}
          {step === 1 && (
            <Button onClick={handleNextStep}>Próximo</Button>
          )}
          {step === 2 && (
            <Button disabled={isImageLoading} onClick={() => toast({
              title: "Enviado!",
              description: "Sua denúncia foi enviada com sucesso!",
            })}>Enviar</Button>
          )}
        </CardFooter>
        {imageSelected && (
          <div className="mt-4 p-2 border border-gray-200 rounded flex justify-center items-center">
            <img
              src={imageSelected}
              alt="Selected"
              className="max-w-full max-h-64 object-contain"
            />
          </div>
        )}
      </Card>
    </div>
  );
}
