"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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

  return (
    <div className="flex min-h-screen justify-center items-center bg-green-700">
      <Card className="w-3/4">
        <CardHeader>
          <CardTitle>Criar Denúncia</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
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
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancelar</Button>
          <Button disabled={isImageLoading}>Enviar</Button>
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
