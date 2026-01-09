import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Ventas Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$ 0.00</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Productos Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold"> Cargando...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}