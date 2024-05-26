"use client";

import { DatePicker } from "@/components/Datepicker";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
    { value: "OTHER", label: "Outros" },
  ];

  const [imageSelected, setImageSelected] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { toast } = useToast();

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
      <Card className="w-5/6">
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
                    placeholder="Para nos ajudar a entender melhor a situação, por favor, forneça uma descrição detalhada do ocorrido. Inclua o máximo de informações possível."
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

                <div className="flex flex-col space-y-2.5 md:flex-row md:items-center justify-between">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="occurrence_date">Data da ocorrência</Label>
                    <DatePicker />
                  </div>

                  <div className="flex flex-col space-y-1.5 w-[280px]">
                    <Label htmlFor="occurrence_time">
                      Horário da ocorrência
                    </Label>
                    <Input
                      id="occurrence_time"
                      placeholder="Digite o horário da ocorrência"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5 w-[280px]">
                    <Label htmlFor="occurrence_location">
                      Local da ocorrência
                    </Label>
                    <Input
                      id="occurrence_location"
                      placeholder="Informe o local da ocorrência"
                    />
                  </div>
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

                <div className="flex flex-col space-x-2 gap-2">
                  <Label htmlFor="anonymous">
                    Você deseja se identificar ao realizar esta denúncia?
                  </Label>

                  <RadioGroup
                    id="anonymous"
                    defaultValue="option-one"
                    className="flex"
                    onValueChange={(value) => setIsAnonymous(value === "option-two")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">Não</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 2 && !isAnonymous && (
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="full_name">Nome completo</Label>
                  <Input
                    id="full_name"
                    placeholder="Digite seu nome completo"
                  />
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
              <div className="flex justify-center items-center mb-4">
                <p className="text-center">
                  Sua denúncia será enviada anonimamente.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="declared"
                  />
                  <Label htmlFor="declared">
                    Declaro que todas as informações fornecidas neste formulário
                    são verdadeiras e precisas ao meu conhecimento
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="understand"
                  />
                  <Label htmlFor="understand">
                    Compreendo que as autoridades competentes podem entrar em
                    contato comigo para obter mais detalhes sobre a denúncia, se
                    necessário.
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreed"
                  />
                  <Label htmlFor="agreed">
                    Concordo que as evidências fornecidas podem ser utilizadas
                    pelas autoridades para investigação e possíveis ações
                    legais.
                  </Label>
                </div>
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
          {step === 1 && <Button onClick={handleNextStep}>Próximo</Button>}
          {step === 2 && (
            <Button
              disabled={isImageLoading}
              onClick={() =>
                toast({
                  title: "Enviado!",
                  description: "Sua denúncia foi enviada com sucesso!",
                })
              }
            >
              Enviar
            </Button>
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
