export interface Todo {
	id: string;
	title: string;
	isCompleted: boolean;
}

export type Filter = "all" | "active" | "completed";
