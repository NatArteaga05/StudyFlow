import { describe, expect, it } from "vitest";

async function loadActivityFunctions() {
  const validationPath = "../../../studyflow/src/domain/activities/validation";
  return import(/* @vite-ignore */ validationPath);
}

const registeredSubjectIds = ["subject-1"];
const validActivityInput = {
  title: "Entrega de laboratorio",
  type: "tarea",
  subjectId: "subject-1",
  dueDate: "2026-10-24",
};

describe("validación de actividades académicas", () => {
  it.each(["title", "type", "subjectId", "dueDate"] as const)(
    "rechaza la actividad cuando falta el campo obligatorio %s",
    async (field) => {
      const { isValidActivity } = await loadActivityFunctions();
      const input = { ...validActivityInput, [field]: undefined };

      expect(isValidActivity(input, registeredSubjectIds)).toBe(false);
    }
  );

  it.each(["", "   "])("rechaza un título vacío o compuesto solo por espacios (%j)", async (title) => {
    const { isValidActivity } = await loadActivityFunctions();

    expect(isValidActivity({ ...validActivityInput, title }, registeredSubjectIds)).toBe(false);
  });

  it("cuenta grafemas Unicode en el límite de longitud del título", async () => {
    const { isValidActivity } = await loadActivityFunctions();
    const grapheme = "👩‍🎓";

    expect(
      isValidActivity({ ...validActivityInput, title: grapheme.repeat(100) }, registeredSubjectIds)
    ).toBe(true);
    expect(
      isValidActivity({ ...validActivityInput, title: grapheme.repeat(101) }, registeredSubjectIds)
    ).toBe(false);
  });

  it("acepta solo materias registradas", async () => {
    const { isValidActivity } = await loadActivityFunctions();

    expect(isValidActivity(validActivityInput, registeredSubjectIds)).toBe(true);
    expect(
      isValidActivity({ ...validActivityInput, subjectId: "subject-2" }, registeredSubjectIds)
    ).toBe(false);
  });

  it.each(["tarea", "trabajo", "examen"])("acepta el tipo %s", async (type) => {
    const { isValidActivity } = await loadActivityFunctions();

    expect(isValidActivity({ ...validActivityInput, type }, registeredSubjectIds)).toBe(true);
  });

  it("rechaza un tipo de actividad no permitido", async () => {
    const { isValidActivity } = await loadActivityFunctions();

    expect(
      isValidActivity({ ...validActivityInput, type: "presentación" }, registeredSubjectIds)
    ).toBe(false);
  });

  it("acepta fechas gregorianas válidas anteriores a hoy y rechaza fechas imposibles", async () => {
    const { isValidActivity } = await loadActivityFunctions();

    expect(
      isValidActivity({ ...validActivityInput, dueDate: "2020-02-29" }, registeredSubjectIds)
    ).toBe(true);
    expect(
      isValidActivity({ ...validActivityInput, dueDate: "2026-04-31" }, registeredSubjectIds)
    ).toBe(false);
  });

  it("trata descripciones ausentes, vacías o solo Unicode White_Space como omitidas", async () => {
    const { isValidActivity, normalizeActivityDescription } = await loadActivityFunctions();

    expect(normalizeActivityDescription(undefined)).toBeNull();
    expect(normalizeActivityDescription("")).toBeNull();
    expect(normalizeActivityDescription("\u0085\u00A0\u2003")).toBeNull();
    expect(isValidActivity(validActivityInput, registeredSubjectIds)).toBe(true);
    expect(
      isValidActivity(
        { ...validActivityInput, description: "\u0085\u00A0\u2003" },
        registeredSubjectIds
      )
    ).toBe(true);
  });

  it("conserva una descripción con contenido sin imponer un límite adicional", async () => {
    const { isValidActivity, normalizeActivityDescription } = await loadActivityFunctions();
    const description = "  " + "detalle académico ".repeat(1_000) + "  ";

    expect(normalizeActivityDescription(description)).toBe(description);
    expect(
      isValidActivity({ ...validActivityInput, description }, registeredSubjectIds)
    ).toBe(true);
  });

  it("permite actividades distintas con títulos repetidos", async () => {
    const { isValidActivity } = await loadActivityFunctions();
    const first = { ...validActivityInput, type: "tarea" };
    const second = { ...validActivityInput, type: "examen" };

    expect(first.title).toBe(second.title);
    expect(isValidActivity(first, registeredSubjectIds)).toBe(true);
    expect(isValidActivity(second, registeredSubjectIds)).toBe(true);
  });

  it("crea una actividad nueva con estado pendiente", async () => {
    const { createActivity } = await loadActivityFunctions();

    expect(createActivity(validActivityInput).status).toBe("pendiente");
  });
});
