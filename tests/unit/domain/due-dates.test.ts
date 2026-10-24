import { describe, expect, it } from "vitest";

async function loadDateFunctions() {
  const dateOnlyPath = "../../../studyflow/src/domain/dates/date-only";
  const classificationPath = "../../../studyflow/src/domain/dates/classify";
  const dateOnly = await import(/* @vite-ignore */ dateOnlyPath);
  const classification = await import(/* @vite-ignore */ classificationPath);
  return { ...dateOnly, ...classification };
}

describe("fechas calendario y vencimientos", () => {
  it("aplica las reglas gregorianas de años seculares", async () => {
    const { isValidDateOnly } = await loadDateFunctions();

    expect(isValidDateOnly("2000-02-29")).toBe(true);
    expect(isValidDateOnly("1900-02-29")).toBe(false);
    expect(isValidDateOnly("2400-02-29")).toBe(true);
    expect(isValidDateOnly("2100-02-29")).toBe(false);
  });

  it("acepta fechas calendario válidas y rechaza fechas imposibles o con hora", async () => {
    const { isValidDateOnly } = await loadDateFunctions();

    expect(isValidDateOnly("2026-04-30")).toBe(true);
    expect(isValidDateOnly("2024-02-29")).toBe(true);
    expect(isValidDateOnly("2026-04-31")).toBe(false);
    expect(isValidDateOnly("2025-02-29")).toBe(false);
    expect(isValidDateOnly("2026-04-30T00:00:00Z")).toBe(false);
  });

  it("obtiene la fecha local usando los componentes locales, sin convertir a UTC", async () => {
    const { getLocalToday } = await loadDateFunctions();
    const localDate = new Date(2026, 0, 2, 23, 30, 0);

    expect(getLocalToday(localDate)).toBe("2026-01-02");
  });

  it("suma días calendario al cruzar el límite de un mes", async () => {
    const { addCalendarDays } = await loadDateFunctions();

    expect(addCalendarDays("2026-01-31", 1)).toBe("2026-02-01");
  });

  it("suma días calendario al cruzar el límite de un año", async () => {
    const { addCalendarDays } = await loadDateFunctions();

    expect(addCalendarDays("2026-12-31", 1)).toBe("2027-01-01");
  });

  it.each([
    ["ayer", "2026-10-23", "vencida"],
    ["hoy", "2026-10-24", "próxima a vencer"],
    ["el tercer día desde hoy", "2026-10-27", "próxima a vencer"],
    ["el cuarto día desde hoy", "2026-10-28", "posterior"],
  ])("clasifica como corresponde una actividad pendiente con entrega %s", async (_label, dueDate, expected) => {
    const { classifyDueDate } = await loadDateFunctions();

    expect(classifyDueDate({ dueDate, status: "pendiente" }, "2026-10-24")).toBe(expected);
  });

  it("no clasifica una actividad completada como vencida ni próxima a vencer", async () => {
    const { classifyDueDate } = await loadDateFunctions();

    expect(classifyDueDate({ dueDate: "2026-10-20", status: "completada" }, "2026-10-24"))
      .toBe("completada");
  });

  it("recalcula la clasificación con otra fecha local sin modificar la fecha de entrega", async () => {
    const { classifyDueDate } = await loadDateFunctions();
    const activity = { dueDate: "2027-01-02", status: "pendiente" as const };

    const beforeYearBoundary = classifyDueDate(activity, "2026-12-30");
    const afterYearBoundary = classifyDueDate(activity, "2027-01-03");

    expect(beforeYearBoundary).toBe("próxima a vencer");
    expect(afterYearBoundary).toBe("vencida");
    expect(activity.dueDate).toBe("2027-01-02");
  });
});
