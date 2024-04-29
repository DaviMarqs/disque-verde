import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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

export default function Occurrence() {
  const options = [
    { value: "BURNED", label: "Queimada" },
    { value: "TRASH", label: "Lixo em lugar inapropriado" },
    { value: "VANDALISM", label: "Vandalismo Ambiental" },
    { value: "INVASION", label: "Invasão" },
  ];

  return (
    <div className="flex min-h-screen justify-center  items-center  bg-green-700">
      <Card className="w-3/4">
        <CardHeader>
          <CardTitle>Criar Denúncia</CardTitle>
          <CardDescription>Crie aqui a sua denúncia</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  rows={4}
                  placeholder="Drescreva a sua denúncia aqui. Pode colocar horário, localização, e muito mais. Caso seja necessário, envie uma foto logo abaixo!"
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

              <div className="flex space-y-1.5 items-center">
                <Label htmlFor="image" className="lg:mt-1">Clique para adicionar uma imagem</Label>
                <Button
                  type="button"
                  variant="outline"
                  className="bg-transparent border-none text-green-500 hover:bg-transparent"
                >
                  <CameraIcon size={24} />
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancelar</Button>
          <Button>Enviar</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
