import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ClienteForm } from "../ClienteForm";

// Mock de la función que se llama cuando se crea el cliente.
const mockOnClienteCreado = jest.fn();

jest.mock("../../services/clientesService", () => {
  return {
    __esModule: true,
    ...jest.requireActual("../../services/clientesService"),
    createCliente: jest.fn(() => Promise.resolve([]))
  };
});

describe("ClienteForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza los campos del formulario", () => {
    render(<ClienteForm onClienteCreado={mockOnClienteCreado} />);
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tipo de identificación/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/número de identificación/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
  });

  test("muestra error si envío campos vacíos", async () => {
    render(<ClienteForm onClienteCreado={mockOnClienteCreado} />);
    fireEvent.click(screen.getByRole("button", { name: /guardar/i }));
    expect(await screen.findByText(/por favor, llena los campos obligatorios/i)).toBeInTheDocument();
  });

  test("llama a onClienteCreado cuando el cliente se crea correctamente", async () => {
    render(<ClienteForm onClienteCreado={mockOnClienteCreado} />);
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Juan" } });
    fireEvent.change(screen.getByLabelText(/apellido/i), { target: { value: "Pérez" } });
    fireEvent.change(screen.getByLabelText(/tipo de identificación/i), { target: { value: "CC" } });
    fireEvent.change(screen.getByLabelText(/número de identificación/i), { target: { value: "123456" } });
    fireEvent.change(screen.getByLabelText(/teléfono/i), { target: { value: "3111234567" } });
    fireEvent.click(screen.getByRole("button", { name: /guardar/i }));
    await waitFor(() => expect(mockOnClienteCreado).toHaveBeenCalled());
    expect(await screen.findByText(/cliente creado exitosamente/i)).toBeInTheDocument();
  });
});