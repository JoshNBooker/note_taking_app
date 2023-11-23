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
	const [notePosition, setNotePosition] = useState<DOMRect | undefined>();
	const [noteTitle, setNoteTitle] = useState<DOMRect | undefined>();
	const [noteContent, setNoteContent] = useState<DOMRect | undefined>();
	const [noteToBeMovedElement, setNoteToBeMovedElement] =
		useState<HTMLElement | null>();
	const [noteToBeMoved, setNoteToBeMoved] = useState<Note | undefined>();
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

	useEffect(() => {
		console.log('position:', notePosition);
		console.log('note position x', notePosition?.left);
		console.log('note position y', notePosition?.top);
		handleUpdateNotePosition();
	}, [notePosition]);

	const handleUpdateNotePosition = async () => {
		try {
			if (currentUser) {
				console.log('note to be moved id', noteToBeMoved?.id);
				const response = await fetch(
					`${apiUrl}/notes/${noteToBeMoved?.id}`,
					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							title: noteToBeMoved?.title,
							noteContent: noteToBeMoved?.noteContent,
							x: notePosition?.left,
							y: notePosition?.top,
						}),
					}
				);

				if (response.ok) {
					const newNote = await response.json();
					console.log('new note:', newNote);
					console.log('response: ', response);
				} else {
					console.error('Failed to edit note: ', response.statusText);
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleEditNote = async () => {
		try {
			if (currentUser) {
				console.log('note to be moved id', noteToBeMoved?.id);
				const response = await fetch(
					`${apiUrl}/notes/${noteToBeMoved?.id}`,
					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							title: noteTitle,
							noteContent: noteContent,
						}),
					}
				);

				if (response.ok) {
					const newNote = await response.json();
					console.log('new note:', newNote);
					console.log('response: ', response);
				} else {
					console.error('Failed to edit note: ', response.statusText);
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div style={{ position: 'relative' }}>
			{notes.map((note: Note, index: number) => (
				<div key={index}>
					<Draggable
						axis="both"
						onStart={() => {
							setNoteToBeMovedElement(
								document.getElementById(`${note.id}`)
							);
							setNoteToBeMoved(note);
							console.log(
								'note to be moved',
								noteToBeMovedElement
							);
						}}
						onStop={() => {
							if (noteToBeMovedElement && noteToBeMoved) {
								let position =
									noteToBeMovedElement.getBoundingClientRect();
								setNotePosition(position);
							}
						}}
						handle=".note-handle"
					>
						<div
							style={{
								position: 'absolute',
								top: `${note.y}px`,
								left: `${note.x}px`,
							}}
							id={`${note.id}`}
						>
							<StickyNote
								title={note.title}
								noteContent={note.noteContent}
								setNoteTitle={setNoteTitle}
								setNoteContent={setNoteContent}
							/>
							<h1>{note.id}</h1>
						</div>
					</Draggable>
				</div>
			))}
			<NewNoteForm apiUrl={apiUrl} currentUser={currentUser} />
		</div>
	);
}

export default NoteBoardUI;
