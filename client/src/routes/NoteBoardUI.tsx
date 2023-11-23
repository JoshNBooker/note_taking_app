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
	const [newNoteTitle, setNewNoteTitle] = useState<string>();
	const [newNoteContent, setNewNoteContent] = useState<string>();
	const [noteToBeMovedElement, setNoteToBeMovedElement] =
		useState<HTMLElement | null>();
	const [noteToBeMoved, setNoteToBeMoved] = useState<Note | undefined>();
	const [noteToEdit, setNoteToEdit] = useState<Note | undefined>();
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
		handleUpdateNotePosition();
	}, [notePosition]);

	const handleUpdateNotePosition = async () => {
		try {
			if (currentUser) {
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
				// if (response.ok) {
				// 	const newNote = await response.json();
				// 	console.log('new note:', newNote);
				// 	console.log('response: ', response);
				// } else {
				// 	console.error('Failed to edit note: ', response.statusText);
				// }
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleEditNote = async () => {
		console.log('title about to be submitted: ', newNoteTitle);
		console.log('contents about to be submittied: ', newNoteContent);
		try {
			console.log(
				'note to edit inside handleeditnotefunction: ',
				noteToEdit
			);
			if (currentUser && noteToEdit && newNoteTitle && newNoteContent) {
				const noteToEditId = noteToEdit.id;
				console.log('note to edit Id in handleEditNote', noteToEditId);
				console.log('title in submission:', newNoteTitle);
				console.log('noteContent in submission:', newNoteContent);
				console.log('x in submission:', notePosition?.left);
				console.log('y in submission:', notePosition?.top);
				const response = await fetch(
					`${apiUrl}/notes/${noteToEditId}`,

					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							title: newNoteTitle,
							noteContent: newNoteContent,
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
			} else {
				console.warn('Note to edit is undefined');
			}
		} catch (error) {
			console.error(error);
		}
	};
	console.log('note to edit outside of handleEditNote', noteToEdit);

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
								originalTitle={note.title}
								originalNoteContent={note.noteContent}
								setNewNoteTitle={setNewNoteTitle}
								setNewNoteContent={setNewNoteContent}
								setNoteToEdit={setNoteToEdit}
								handleEditNote={handleEditNote}
								note={note}
								newNoteTitle={newNoteTitle}
								newNoteContent={newNoteContent}
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
