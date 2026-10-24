import { describe, expect, it } from "vitest";
import {
  isValidSubjectName,
  normalizeSubjectName
} from "../../../studyflow/src/domain/subjects/validation";

describe("validación del nombre de una materia", () => {
  it("rechaza nombres vacíos o compuestos solo por espacios", () => {
    expect(isValidSubjectName("")).toBe(false);
    expect(isValidSubjectName("   \t\n  ")).toBe(false);
  });

  it("acepta 100 caracteres y rechaza 101", () => {
    expect(isValidSubjectName("a".repeat(100))).toBe(true);
    expect(isValidSubjectName("a".repeat(101))).toBe(false);
  });

  it("acepta nombres con espacios exteriores y los ignora al comparar equivalencia", () => {
    expect(isValidSubjectName("  Álgebra  ")).toBe(true);
    expect(normalizeSubjectName("  Álgebra  ")).toBe(normalizeSubjectName("Álgebra"));
  });

  it("identifica como equivalentes nombres que solo difieren en mayúsculas", () => {
    expect(normalizeSubjectName("FÍSICA")).toBe(normalizeSubjectName("física"));
  });

  it("identifica equivalencia al combinar mayúsculas y espacios exteriores", () => {
    expect(normalizeSubjectName("  Historia Universal ")).toBe(
      normalizeSubjectName("historia universal")
    );
  });

  it("conserva acentos y espacios interiores en la comparación", () => {
    expect(normalizeSubjectName("Álgebra I")).not.toBe(normalizeSubjectName("Algebra I"));
    expect(normalizeSubjectName("Álgebra I")).not.toBe(normalizeSubjectName("ÁlgebraI"));
  });

  it("considera válidos y distintos dos nombres no equivalentes", () => {
    const firstName = "Biología";
    const secondName = "Química";

    expect(isValidSubjectName(firstName)).toBe(true);
    expect(isValidSubjectName(secondName)).toBe(true);
    expect(normalizeSubjectName(firstName)).not.toBe(normalizeSubjectName(secondName));
  });
});
