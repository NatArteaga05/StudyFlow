import { isValidDateOnly } from "../dates/date-only";
import type { ActivityInput, NewActivity, ValidActivityInput } from "./types";

const graphemeSegmenter = new Intl.Segmenter("es", { granularity: "grapheme" });
const unicodeWhitespaceOnly = /^\p{White_Space}*$/u;
const allowedActivityTypes = new Set(["tarea", "trabajo", "examen"]);

function countGraphemes(value: string): number {
  return Array.from(graphemeSegmenter.segment(value)).length;
}

export function normalizeActivityDescription(
  description: string | null | undefined
): string | null {
  if (description == null || unicodeWhitespaceOnly.test(description)) return null;
  return description;
}

export function isValidActivity(
  input: ActivityInput,
  registeredSubjectIds: readonly string[]
): boolean {
  if (
    typeof input.title !== "string" ||
    input.title.trim().length === 0 ||
    countGraphemes(input.title) > 100
  ) {
    return false;
  }

  if (
    typeof input.type !== "string" ||
    !allowedActivityTypes.has(input.type) ||
    typeof input.subjectId !== "string" ||
    !registeredSubjectIds.includes(input.subjectId) ||
    typeof input.dueDate !== "string" ||
    !isValidDateOnly(input.dueDate)
  ) {
    return false;
  }

  return input.description == null || typeof input.description === "string";
}

export function createActivity(input: ValidActivityInput): NewActivity {
  return {
    title: input.title,
    type: input.type,
    subjectId: input.subjectId,
    dueDate: input.dueDate,
    description: normalizeActivityDescription(input.description),
    status: "pendiente",
  };
}
