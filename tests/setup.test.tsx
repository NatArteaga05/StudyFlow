import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("entorno de pruebas", () => {
  it("descubre una prueba y renderiza una vista React en jsdom", () => {
    render(<main>Prueba de configuración</main>);

    expect(screen.getByText("Prueba de configuración")).toBeTruthy();
  });
});
