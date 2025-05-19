import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FiltrosClientes } from "../FiltrosClientes";

describe("FiltrosClientes", () => {
  test("permite escribir y actualizar los filtros", () => {
    const setFiltroNombre = jest.fn();
    const setFiltroDocumento = jest.fn();

    render(
      <FiltrosClientes
        filtroNombre=""
        setFiltroNombre={setFiltroNombre}
        filtroDocumento=""
        setFiltroDocumento={setFiltroDocumento}
      />
    );

    fireEvent.change(screen.getByLabelText(/filtrar por nombre/i), { target: { value: "Juan" } });
    fireEvent.change(screen.getByLabelText(/filtrar por número de documento/i), { target: { value: "123" } });

    expect(setFiltroNombre).toHaveBeenCalledWith("Juan");
    expect(setFiltroDocumento).toHaveBeenCalledWith("123");
  });
});