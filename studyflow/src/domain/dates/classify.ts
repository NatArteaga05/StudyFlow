import { addCalendarDays, isValidDateOnly } from "./date-only";

export type ActivityStatus = "pendiente" | "completada";
export type DueDateClassification = "vencida" | "próxima a vencer" | "posterior" | "completada";

export interface DueDateActivity {
  dueDate: string;
  status: ActivityStatus;
}

export function classifyDueDate(
  activity: DueDateActivity,
  today: string
): DueDateClassification {
  if (activity.status === "completada") return "completada";

  if (!isValidDateOnly(activity.dueDate) || !isValidDateOnly(today)) {
    throw new RangeError("La fecha de entrega y la fecha local deben ser fechas válidas");
  }

  if (activity.dueDate < today) return "vencida";
  if (activity.dueDate <= addCalendarDays(today, 3)) return "próxima a vencer";
  return "posterior";
}
