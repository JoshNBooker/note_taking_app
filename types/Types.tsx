export interface Note {
    id: number;
	title: string;
	content: string;
}

export interface User {
    id:number;
	userName: string;
	notes: Note[];
}
