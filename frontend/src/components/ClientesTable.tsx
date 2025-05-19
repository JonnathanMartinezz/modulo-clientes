import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { getClientes, Cliente } from "../services/clientesService";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, CircularProgress
} from "@mui/material";

const POLLING_INTERVAL = 30000; // 30 segundos

// Agregamos los props para recibir los valores de filtro.
interface ClientesTableProps {
  filtroNombre: string;
  filtroDocumento: string;
}

// Definimos la interfaz para el ref expuesto (fetchData), que otros componentes pueden usar para refrescar los datos manualmente.
export interface ClientesTableRef {
  fetchData: () => void;
}

// Esto nos permite que, por ejemplo, el formulario de creación pueda forzar un refresco inmediato de la tabla.
export const ClientesTable = forwardRef<ClientesTableRef, ClientesTableProps>(
  ({ filtroNombre, filtroDocumento }, ref) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  // Un estado para mostrar el spinner de carga.
  const [loading, setLoading] = useState(true);

  // Función encargada de consultar los datos al backend.
  const fetchData = async () => {
    setLoading(true); // Activamos el estado de carga.
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Desactivamos el estado de carga.
    }
  };

  // Permitiendo que componentes externos puedan refrescar la tabla manualmente.
  useImperativeHandle(ref, () => ({
    fetchData
  }));

  // useEffect para consultar los clientes al montar el componente y para configurar el polling.
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, []);

    // Filtrar clientes activos por nombre y documento
    // Aplicamos los filtros recibidos desde App.tsx.
    // 1. Filtramos solo los clientes activos (estado === true).
    // 2. Si hay texto en filtroNombre, buscamos coincidencia en nombre y apellido (ignorando mayúsculas/minúsculas).
    // 3. Si hay texto en filtroDocumento, buscamos coincidencia en número de identificación.
    const clientesFiltrados = clientes
      .filter(c => c.estado)
      .filter(c =>
        // Filtro por nombre (busca en nombre y apellido)
        (filtroNombre === "" ||
          `${c.nombre} ${c.apellido}`.toLowerCase().includes(filtroNombre.toLowerCase()))
        // Filtro por número de documento
        && (filtroDocumento === "" ||
          c.numero_identificacion.toLowerCase().includes(filtroDocumento.toLowerCase()))
      );

  // Estructura de la tabla con Material UI.
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>Tipo ID</TableCell>
            <TableCell># Identificación</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell>Edad</TableCell>
            <TableCell>Teléfono</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} align="center">
                <CircularProgress size={24} />
                <span style={{ marginLeft: 12, fontSize: 16, color: "#888" }}>
                  Cargando clientes...
                </span>
              </TableCell>
            </TableRow>
          ) : (
            clientesFiltrados.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No hay clientes activos o que coincidan con los filtros.
                </TableCell>
              </TableRow>
            ) : (
              clientesFiltrados.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.nombre}</TableCell>
                  <TableCell>{c.apellido}</TableCell>
                  <TableCell>{c.tipo_identificacion}</TableCell>
                  <TableCell>{c.numero_identificacion}</TableCell>
                  <TableCell>{c.correo || "-"}</TableCell>
                  <TableCell>{c.edad ?? "-"}</TableCell>
                  <TableCell>{c.telefono}</TableCell>
                </TableRow>
              ))
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
});