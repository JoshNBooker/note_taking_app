import Draggable from 'react-draggable';
import { Note } from '../Types.tsx';
import StickyNote from '../components/StickyNote.tsx';
import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import NewNoteForm from '../components/NewNoteForm.tsx';

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
					<ul key={note.id} className="list-none">
						<li>
							<Draggable
								axis="both"
								onStart={() => console.log('Drag start')}
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
			<NewNoteForm apiUrl={apiUrl} currentUser={currentUser} />
		</div>
	);
}

export default NoteBoardUI;
