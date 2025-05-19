import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

// Definimos la interfaz de props para el componente de filtros.
// Recibe el valor actual y el setter para los filtros de nombre y número de documento.
interface FiltrosClientesProps {
  filtroNombre: string;
  setFiltroNombre: (valor: string) => void;
  filtroDocumento: string;
  setFiltroDocumento: (valor: string) => void;
}

// Componente de filtros de clientes, creandolo o renderizando los campos.
export const FiltrosClientes: React.FC<FiltrosClientesProps> = ({
  filtroNombre,
  setFiltroNombre,
  filtroDocumento,
  setFiltroDocumento
}) => {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
      {/* Campo de filtro por nombre */}
      <TextField
        label="Filtrar por nombre"
        variant="outlined"
        value={filtroNombre}
        onChange={e => setFiltroNombre(e.target.value)}
        size="small"
      />
      {/* Campo de filtro por número de documento */}
      <TextField
        label="Filtrar por número de documento"
        variant="outlined"
        value={filtroDocumento}
        onChange={e => setFiltroDocumento(e.target.value)}
        size="small"
      />
    </Box>
  );
};