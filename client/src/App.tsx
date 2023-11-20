import { useState, useEffect } from 'react';
import { Note, User } from '../../types/Types';
import StickyNote from './components/StickyNote';

function App() {
	const [notes, setNotes] = useState<Note[]>([]);
	const [users, setUsers] = useState<User[]>([]);
	const apiUrl: string = 'http://localhost:8080';
	const fetchData = async (url: string) => {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
	};
	useEffect(() => {
		(async () => {
			try {
				const notesData = await fetchData(apiUrl + '/notes');
				console.log('notes:', notesData);
				setNotes(notesData);

				const usersData = await fetchData(apiUrl + '/users');
				console.log('users:', usersData);
				setUsers(usersData);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);
	if (!notes) {
		return (
			<div>
				<h1>No notes</h1>
			</div>
		);
	}
	if (!users) {
		return (
			<div>
				<h1>No users</h1>
			</div>
		);
	}
	return (
		<div>
			<div>
				{notes.map((note: Note) => (
					<ul key={note.id}>
						<li>
							<StickyNote
								title={note.title}
								noteContent={note.noteContent}
							/>
						</li>
					</ul>
				))}
			</div>
			<div>
				{users.map((user: User) => (
					<ul key={user.id}>
						<li>{user.userName}</li>
					</ul>
				))}
			</div>
		</div>
	);
}

export default App;
