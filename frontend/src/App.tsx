import React, { useRef, useState  } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ClienteForm } from "./components/ClienteForm";
import { ClientesTable, ClientesTableRef } from "./components/ClientesTable";
import { FiltrosClientes } from "./components/FiltrosClientes";

function App() {
  // Usamos useRef para referenciar la tabla de clientes y poder refrescarla desde el formulario manualmente.
  const refTabla = useRef<ClientesTableRef>(null);

  // Estado para los filtros
  // Al cambiar estos valores, se filtran los clientes mostrados en la tabla.
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroDocumento, setFiltroDocumento] = useState("");

  return (
    // Container de MUI que centra el contenido y limita el ancho.
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Módulo de Clientes
      </Typography>
      <ClienteForm onClienteCreado={() => refTabla.current?.fetchData()} />
      {/* Filtros personalizados, pasa los valores y setters para que el componente FiltrosClientes
       pueda actualizar el estado del filtro directamente desde aquí */}
      <FiltrosClientes
        filtroNombre={filtroNombre}
        setFiltroNombre={setFiltroNombre}
        filtroDocumento={filtroDocumento}
        setFiltroDocumento={setFiltroDocumento}
      />
      {/* Tabla de clientes con filtros */}
      <ClientesTable
        ref={refTabla}
        filtroNombre={filtroNombre}
        filtroDocumento={filtroDocumento}
      />
    </Container>
  );
}

export default App;