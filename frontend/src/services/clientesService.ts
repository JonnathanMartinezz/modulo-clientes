import axios from "axios";

const API_URL = "http://localhost:8000";

// Definimos la interfaz Cliente para reconocer los tipos de los datos y facilitar los autocompletados
export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  tipo_identificacion: string;
  numero_identificacion: string;
  correo?: string;
  edad?: number;
  telefono: string;
  estado: boolean;
}

// GET: todos los clientes
export async function getClientes(): Promise<Cliente[]> {
  const res = await axios.get<Cliente[]>(`${API_URL}/clientes`);
  return res.data;
}

// POST: crear cliente
export async function createCliente(cliente: Omit<Cliente, "id" | "estado">): Promise<Cliente> {
  const res = await axios.post<Cliente>(`${API_URL}/clientes`, cliente);
  return res.data;
}

// PUT: actualizar cliente
export async function updateCliente(id: number, cliente: Omit<Cliente, "id" | "estado">): Promise<Cliente> {
  const res = await axios.put<Cliente>(`${API_URL}/clientes/${id}`, cliente);
  return res.data;
}

// DELETE: inactivar cliente
export async function inactivateCliente(id: number): Promise<Cliente> {
  const res = await axios.delete<Cliente>(`${API_URL}/clientes/${id}`);
  return res.data;
}