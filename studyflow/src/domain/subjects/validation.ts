export function isValidSubjectName(name: string): boolean {
  return name.trim().length > 0 && name.length <= 100;
}

export function normalizeSubjectName(name: string): string {
  return name.trim().toLowerCase();
}
