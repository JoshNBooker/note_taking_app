import { ChangeEvent, useEffect, useState } from 'react';
import Paper from './Paper';
import Draggable from 'react-draggable';
import { User } from 'firebase/auth';

interface NewNoteFormProps {
	apiUrl: string;
	currentUser: User | null;
	fetchNotes: Function;
}

function NewNoteForm({ apiUrl, currentUser, fetchNotes }: NewNoteFormProps) {
	const [newFormTitle, setNewFormTitle] = useState('');
	const [newFormContents, setNewFormContent] = useState('');
	const [newNotePosition, setNewNotePosition] = useState<
		DOMRect | undefined
	>();
	const [isPeeled, setPeeled] = useState(false);

	const handleNewNoteSubmit = async () => {
		try {
			if (currentUser) {
				const response = await fetch(
					`${apiUrl}/notes?email=${currentUser.email}`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							title: newFormTitle,
							noteContent: newFormContents,
							x: newNotePosition?.left,
							y: newNotePosition?.top,
						}),
					}
				);
				if (response.ok) {
					const newNote = await response.json();
					console.log('new note:', newNote);
					console.log('response: ', response);
					setNewFormTitle('');
					setNewFormContent('');
				} else {
					console.error(
						'Failed to submit note: ',
						response.statusText
					);
				}
			}
		} catch (error) {
			console.error(error);
		}
		fetchNotes();
	};

	const handlePeelNote = () => {
		setPeeled(true);
		handleNewNoteSubmit();
	};

	const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setNewFormTitle(event.target.value);
		console.log('new form title: ', newFormTitle);
	};

	const handleContentsChange = (event: ChangeEvent<HTMLInputElement>) => {
		setNewFormContent(event.target.value);
		console.log('new form content', newFormContents);
	};

	return (
		<Draggable
			axis="both"
			onStop={() => {
				const form = document.querySelector('#newNotePosition');
				let position = form?.getBoundingClientRect();
				setNewNotePosition(position);
			}}
		>
			<div
				className={`relative w-72 h-80 p-4 sticky-note-pad ${
					isPeeled ? 'transform -translate-y-full' : ''
				}`}
				id="newNotePosition"
			>
				<div className="absolute bottom-0 sticky-note-form p-4 rounded-lg w-full">
					<Paper>
						<input
							type="text"
							name="title"
							value={newFormTitle}
							onChange={handleTitleChange}
							placeholder="Title"
							className="w-full border-none resize-none bg-transparent text-4xl italic"
						/>
						<input
							type="textarea"
							name="contents"
							value={newFormContents}
							onChange={handleContentsChange}
							placeholder="Write your note..."
							className="w-full border-none resize-none bg-transparent text-base italic"
						/>
						<div
							className="absolute bottom-0 right-0 w-8 h-8 hover:bg-yellow-500 cursor-pointer translate transform ease-in-out transition-all duration-500 hover:shadow-2xl"
							onClick={handlePeelNote}
						></div>
					</Paper>
				</div>
			</div>
		</Draggable>
	);
}

export default NewNoteForm;
