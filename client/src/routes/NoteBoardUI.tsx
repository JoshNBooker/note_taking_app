import Draggable from 'react-draggable';
import { Note } from '../Types.tsx';
import StickyNote from '../components/StickyNote.tsx';
import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import NewNoteForm from '../components/NewNoteForm.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { SignOutUser } from '../../firebase/firebase.ts';
import { useNavigate } from 'react-router-dom';

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
	const [noteToBeDeleted, setNoteToBeDeleted] = useState<Note | undefined>();
	const [binArea, setBinArea] = useState<DOMRect | null>();
	const [deleteMode, setDeleteMode] = useState<boolean>(false);
	const navigate = useNavigate();

	const fetchNotes = async () => {
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
	};

	useEffect(() => {
		fetchNotes();
	}, []);

	useEffect(() => {
		handleUpdateNotePosition();
	}, [notePosition]);

	let binDiv = document.getElementById('binArea');
	let bin = binDiv?.getBoundingClientRect();
	const updateBinArea = () => {
		setBinArea(bin);
	};
	useEffect(() => {
		updateBinArea();
	}, [notes]);

	console.log('bin area', binArea);

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
			console.log(
				'note to edit inside handleeditnotefunction: ',
				noteToEdit
			);
			if (currentUser && noteToEdit) {
				const noteToEditId = noteToEdit.id;

				const response = await fetch(
					`${apiUrl}/notes/${noteToEditId}`,
					{
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							title:
								newNoteTitle === undefined
									? noteToEdit.title
									: newNoteTitle,
							noteContent:
								newNoteContent === undefined
									? noteToEdit.noteContent
									: newNoteContent,
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

	const handleDeleteNote = async () => {
		try {
			if (deleteMode && noteToBeDeleted) {
				const noteToBeDeletedId = noteToBeDeleted.id;
				fetch(`${apiUrl}/notes/${noteToBeDeletedId}`, {
					method: 'DELETE',
				});
			} else {
				console.warn('Note to delete is undefined');
			}
		} catch (error) {
			console.error(error);
		}
		fetchNotes();
	};
	const handleSignOutUser = async () => {
		SignOutUser().then(() => {
			navigate('/');
		});
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
							setNoteToBeDeleted(note);
						}}
						onStop={() => {
							if (noteToBeMovedElement && noteToBeMoved) {
								let position =
									noteToBeMovedElement.getBoundingClientRect();
								setNotePosition(position);
							}
							if (deleteMode) {
								handleDeleteNote();
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
						</div>
					</Draggable>
				</div>
			))}
			<NewNoteForm
				apiUrl={apiUrl}
				currentUser={currentUser}
				fetchNotes={fetchNotes}
			/>
			<Draggable
				axis="both"
				handle="#binArea"
				onStop={() => setBinArea(bin)}
			>
				<div
					id="binArea"
					className="z-10"
					onMouseEnter={() => setDeleteMode(true)}
					onMouseLeave={() => setDeleteMode(false)}
				>
					<FontAwesomeIcon
						icon={faTrash}
						className="transition-all duration-300 ease-in-out h-16 w-12 hover:h-20 hover:w-16"
					/>
				</div>
			</Draggable>
			<button onClick={handleSignOutUser}>Sign Out</button>
		</div>
	);
}

export default NoteBoardUI;
