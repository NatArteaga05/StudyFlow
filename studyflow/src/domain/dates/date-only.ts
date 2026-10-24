const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function daysInMonth(year: number, month: number): number {
  if (month === 2) return isLeapYear(year) ? 29 : 28;
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
}

function parseDateOnly(value: string): [year: number, month: number, day: number] | null {
  const match = DATE_ONLY_PATTERN.exec(value);
  if (!match) return null;

  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

export function isValidDateOnly(value: string): boolean {
  const date = parseDateOnly(value);
  if (!date) return false;

  const [year, month, day] = date;
  return month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth(year, month);
}

function formatDateOnly(year: number, month: number, day: number): string {
  return `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function getLocalToday(now: Date = new Date()): string {
  return formatDateOnly(now.getFullYear(), now.getMonth() + 1, now.getDate());
}

export function addCalendarDays(value: string, days: number): string {
  if (!isValidDateOnly(value) || !Number.isInteger(days)) {
    throw new RangeError("Se requiere una fecha válida y una cantidad entera de días");
  }

  const date = parseDateOnly(value);
  if (!date) throw new RangeError("Fecha calendario no válida");

  const [year, month, day] = date;
  const calendarDate = new Date(0);
  calendarDate.setUTCHours(0, 0, 0, 0);
  calendarDate.setUTCFullYear(year, month - 1, day);
  calendarDate.setUTCDate(calendarDate.getUTCDate() + days);

  return formatDateOnly(
    calendarDate.getUTCFullYear(),
    calendarDate.getUTCMonth() + 1,
    calendarDate.getUTCDate()
  );
}
