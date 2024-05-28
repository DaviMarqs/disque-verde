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
import { useEffect, useState } from "react";

export default function Occurrence() {
  const options = [
    { value: "BURNED", label: "Queimada" },
    { value: "TRASH", label: "Lixo em lugar inapropriado" },
    { value: "VANDALISM", label: "Vandalismo Ambiental" },
    { value: "INVASION", label: "Invasão" },
    { value: "OTHER", label: "Outros" },
  ];

  const [formData, setFormData] = useState({
    description: "",
    occurrence_type: "",
    occurrence_date: "",
    occurrence_time: "",
    occurrence_location: "",
    informer_name: "",
    informer_address: "",
    informer_phone: "",
    informer_email: "",
    informer_anonymous: false,
    image: "",
    status: "PENDING",
  });

  const [imageSelected, setImageSelected] = useState("");
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>();
  const [agreedChecked, setAgreedChecked] = useState(false);
  const [declaredChecked, setDeclaredChecked] = useState(false);
  const [understandChecked, setUnderstandChecked] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      occurrence_date: date,
    }));
  }, [date]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsFormLoading(true);
    e.preventDefault();
    if (
      formData.informer_email &&
      !formData.informer_anonymous &&
      !/\S+@\S+\.\S+/.test(formData.informer_email)
    ) {
      toast({
        title: "Erro!",
        description: "Por favor, insira um e-mail válido.",
      });
      return;
    }

    formData.image = imageSelected;

    const response = await fetch("http://localhost:3000/api/occurrences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setIsFormLoading(false);
    if (response.ok) {
      toast({
        title: "Enviado!",
        description: "Sua denúncia foi enviada com sucesso!",
      });
    } else {
      setIsFormLoading(false);
      toast({
        title: "Erro!",
        description: "Ocorreu um erro ao enviar sua denúncia.",
      });
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-green-700">
      <Card className="w-5/6">
        <CardHeader>
          <CardTitle>Criar Denúncia</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    placeholder="Para nos ajudar a entender melhor a situação, por favor, forneça uma descrição detalhada do ocorrido. Inclua o máximo de informações possível."
                    value={formData.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleChange(e)
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="occurrence_type">Tipo de Denúncia</Label>
                  <Select
                    value={formData.occurrence_type}
                    onValueChange={(value) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        occurrence_type: value,
                      }))
                    }
                  >
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

                <div className="flex flex-col space-y-2.5 md:flex-row md:justify-between">
                  <div className="flex flex-col space-y-1.5 w-[280px]">
                    <Label htmlFor="occurrence_date" className="mt-[10px]">
                      Data da ocorrência
                    </Label>
                    <DatePicker date={date} setDate={setDate} />
                  </div>

                  <div className="flex flex-col space-y-1.5 w-[280px]">
                    <Label htmlFor="occurrence_time">
                      Horário da ocorrência
                    </Label>
                    <Input
                      id="occurrence_time"
                      name="occurrence_time"
                      placeholder="Digite o horário da ocorrência"
                      value={formData.occurrence_time}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5 w-[280px]">
                    <Label htmlFor="occurrence_location">
                      Local da ocorrência
                    </Label>
                    <Input
                      id="occurrence_location"
                      name="occurrence_location"
                      placeholder="Informe o local da ocorrência"
                      value={formData.occurrence_location}
                      onChange={handleChange}
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
                    value={
                      formData.informer_anonymous ? "option-two" : "option-one"
                    }
                    className="flex"
                    onValueChange={(value) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        informer_anonymous: value === "option-two",
                      }))
                    }
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

            {step === 2 && !formData.informer_anonymous && (
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="informer_name">Nome completo</Label>
                  <Input
                    id="informer_name"
                    name="informer_name"
                    placeholder="Digite seu nome completo"
                    value={formData.informer_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="informer_address">Endereço</Label>
                  <Input
                    id="informer_address"
                    name="informer_address"
                    placeholder="Digite seu endereço"
                    value={formData.informer_address}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="informer_phone">Telefone</Label>
                  <Input
                    id="informer_phone"
                    name="informer_phone"
                    placeholder="Digite seu telefone"
                    value={formData.informer_phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="informer_email">E-mail</Label>
                  <Input
                    id="informer_email"
                    name="informer_email"
                    placeholder="Digite seu e-mail"
                    value={formData.informer_email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {step === 2 && formData.informer_anonymous && (
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
                    name="declared"
                    onChange={() => setDeclaredChecked(!declaredChecked)}
                  />
                  <Label htmlFor="declared">
                    Declaro que todas as informações fornecidas neste formulário
                    são verdadeiras e precisas ao meu conhecimento
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="understand"
                    name="understand"
                    onChange={() => setUnderstandChecked(!understandChecked)}
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
                    name="agreed"
                    onChange={() => setAgreedChecked(!agreedChecked)}
                  />
                  <Label htmlFor="agreed">
                    Concordo que as evidências fornecidas podem ser utilizadas
                    pelas autoridades para investigação e possíveis ações
                    legais.
                  </Label>
                </div>
              </div>
            )}
            <CardFooter className="flex justify-between mt-4">
              {step === 2 && (
                <Button variant="outline" onClick={handlePrevStep}>
                  Voltar
                </Button>
              )}
              {step === 1 && <Button onClick={handleNextStep}>Próximo</Button>}
              {step === 2 && (
                <Button type="submit" disabled={isImageLoading || isFormLoading}>
                  Enviar
                </Button>
              )}
            </CardFooter>
          </form>
        </CardContent>
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
