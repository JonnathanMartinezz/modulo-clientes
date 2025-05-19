// Mock del servicio getClientes
jest.mock("../../services/clientesService", () => ({
  getClientes: jest.fn(() => Promise.resolve([
    {
      id: 1,
      nombre: "Juan",
      apellido: "Pérez",
      tipo_identificacion: "CC",
      numero_identificacion: "123",
      correo: "juan@mail.com",
      edad: 30,
      telefono: "3111234567",
      estado: true,
    },
    {
      id: 2,
      nombre: "Ana",
      apellido: "García",
      tipo_identificacion: "CC",
      numero_identificacion: "456",
      correo: "ana@mail.com",
      edad: 28,
      telefono: "3123456789",
      estado: false,
    },
  ]))
}));

import React from "react";
import { render, screen } from "@testing-library/react";
import { ClientesTable, ClientesTableRef } from "../ClientesTable";


describe("ClientesTable", () => {
  test("muestra solo clientes activos y filtra por nombre", async () => {
    render(
      <ClientesTable
        ref={React.createRef<ClientesTableRef>()}
        filtroNombre="Juan"
        filtroDocumento=""
      />
    );
    expect(await screen.findByText("Juan")).toBeInTheDocument();
    expect(screen.queryByText("Ana")).not.toBeInTheDocument();
  });

  test("muestra mensaje si no hay clientes filtrados", async () => {
    render(
      <ClientesTable
        ref={React.createRef<ClientesTableRef>()}
        filtroNombre="ZZZ"
        filtroDocumento=""
      />
    );
    expect(await screen.findByText(/no hay clientes activos que coincidan/i)).toBeInTheDocument();
  });
});