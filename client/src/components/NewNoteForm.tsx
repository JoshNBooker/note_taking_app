import { ChangeEvent, useState } from 'react';
import Paper from './Paper';
import Draggable from 'react-draggable';
import { User } from 'firebase/auth';

interface NewNoteFormProps {
	apiUrl: string;
	currentUser: User | null;
}

function NewNoteForm({ apiUrl, currentUser }: NewNoteFormProps) {
	const [newFormTitle, setNewFormTitle] = useState('');
	const [newFormContents, setNewFormContent] = useState('');

	const handleNewNoteSubmit = async () => {
		console.log('submit');
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
		<Draggable axis="both">
			<div className="m-5">
				<Paper>
					<input
						type="text"
						name="title"
						value={newFormTitle}
						onChange={handleTitleChange}
						placeholder="Title"
					/>
					<input
						type="textarea"
						name="contents"
						value={newFormContents}
						onChange={handleContentsChange}
						placeholder="Write your note..."
					/>
					<button onClick={handleNewNoteSubmit}>rip</button>
				</Paper>
			</div>
		</Draggable>
	);
}

export default NewNoteForm;