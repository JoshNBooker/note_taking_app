import Draggable from 'react-draggable';
import { Note } from '../Types.tsx';
import StickyNote from './StickyNote';
import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';

interface NoteBoardUIProps {
	currentUser: User | null;
}

function NoteBoardUI({ currentUser }: NoteBoardUIProps) {
	const [notes, setNotes] = useState<Note[]>([]);
	const apiUrl: string = 'http://localhost:8080';

	useEffect(() => {
		(async () => {
			try {
				if (currentUser) {
					const response = await fetch(
						`${apiUrl}/notes?email=${currentUser.email}`,
						{
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
							},
						}
					);

					if (response.ok) {
						const notesData = await response.json();
						console.log('notes:', notesData);
						setNotes(notesData);
					} else {
						console.error(
							'Failed to fetch notes:',
							response.statusText
						);
					}
				}
			} catch (error) {
				console.error(error);
			}
		})();
	}, [apiUrl]);
	if (!notes) {
		return (
			<div>
				<h1>No notes</h1>
			</div>
		);
	}

	return (
		<div style={{ position: 'relative' }}>
			<div>
				{notes.map((note: Note) => (
					<ul key={note.id}>
						<li>
							<Draggable
								axis="both"
								onStart={() => console.log('Drag start')} // You can customize the behavior during drag start
								onStop={() => console.log('Drag stop')}
								handle=".note-handle"
							>
								<div>
									<StickyNote
										title={note.title}
										noteContent={note.noteContent}
									/>
								</div>
							</Draggable>
						</li>
					</ul>
				))}
			</div>
		</div>
	);
}

export default NoteBoardUI;
