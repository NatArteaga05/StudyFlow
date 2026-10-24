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

  it("acepta 100 grafemas ASCII y rechaza 101", () => {
    expect(isValidSubjectName("a".repeat(100))).toBe(true);
    expect(isValidSubjectName("a".repeat(101))).toBe(false);
  });

  it("cuenta una letra y su marca combinante como un grafema", () => {
    const grapheme = "e\u0301";

    expect(isValidSubjectName(grapheme.repeat(100))).toBe(true);
    expect(isValidSubjectName(grapheme.repeat(101))).toBe(false);
  });

  it("cuenta una secuencia emoji unida como un grafema", () => {
    const grapheme = "👩‍🎓";

    expect(isValidSubjectName(grapheme.repeat(100))).toBe(true);
    expect(isValidSubjectName(grapheme.repeat(101))).toBe(false);
  });

  it("rechaza nombres compuestos solo por espacios en blanco Unicode", () => {
    expect(isValidSubjectName("\u0085\u0085")).toBe(false);
  });

  it("acepta nombres con espacios exteriores y los ignora al comparar equivalencia", () => {
    expect(isValidSubjectName("  Álgebra  ")).toBe(true);
    expect(normalizeSubjectName("  Álgebra  ")).toBe(normalizeSubjectName("Álgebra"));
  });

  it("ignora espacios en blanco Unicode exteriores al comparar nombres", () => {
    const nameWithUnicodeWhitespace = "\u0085\u00A0Álgebra\u2003\u0085";

    expect(normalizeSubjectName(nameWithUnicodeWhitespace)).toBe(
      normalizeSubjectName("Álgebra")
    );
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

  it("conserva el nombre original mientras deriva una clave de comparación", () => {
    const originalName = "\u0085 ÁLGEBRA I \u00A0";

    const normalized = normalizeSubjectName(originalName);

    expect(originalName).toBe("\u0085 ÁLGEBRA I \u00A0");
    expect(normalized).not.toContain("\u0085");
    expect(normalized).toBe("álgebra i");
  });

  it("considera válidos y distintos dos nombres no equivalentes", () => {
    const firstName = "Biología";
    const secondName = "Química";

    expect(isValidSubjectName(firstName)).toBe(true);
    expect(isValidSubjectName(secondName)).toBe(true);
    expect(normalizeSubjectName(firstName)).not.toBe(normalizeSubjectName(secondName));
  });
});
