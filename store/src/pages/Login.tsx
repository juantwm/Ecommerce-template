import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <Card className="w-[350px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Admin Panel
          </CardTitle>
          <CardDescription className="text-center">
            Ingresa tus credenciales
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="admin@tienda.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Ingresar</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
