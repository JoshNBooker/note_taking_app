export interface Note {
	id: number;
	title: string;
	noteContent: string;
}

export interface User {
	id: number;
	userName: string;
	notes: Note[];
}
