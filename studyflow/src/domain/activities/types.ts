export type ActivityType = "tarea" | "trabajo" | "examen";

export type ActivityStatus = "pendiente" | "completada";

export interface ActivityInput {
  title?: string;
  type?: string;
  subjectId?: string;
  dueDate?: string;
  description?: string | null;
}

export interface ValidActivityInput {
  title: string;
  type: ActivityType;
  subjectId: string;
  dueDate: string;
  description?: string | null;
}

export interface NewActivity {
  title: string;
  type: ActivityType;
  subjectId: string;
  dueDate: string;
  description: string | null;
  status: ActivityStatus;
}

export interface Activity extends NewActivity {
  id: string;
}
