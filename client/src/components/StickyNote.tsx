import { ChangeEvent, useEffect, useState, useRef } from 'react';
import Paragraph from './Content';
import Paper from './Paper';
import Title from './Title';
import { Note } from '../Types';

interface StickyNoteProps {
	originalTitle: string;
	originalNoteContent: string;
	setNewNoteTitle: Function;
	setNewNoteContent: Function;
	setNoteToEdit: Function;
	handleEditNote: Function;
	note: Note;
	newNoteTitle: string | undefined;
	newNoteContent: string | undefined;
}

function StickyNote({
	originalTitle,
	originalNoteContent,
	setNewNoteTitle,
	setNewNoteContent,
	setNoteToEdit,
	handleEditNote,
	note,
	newNoteTitle,
	newNoteContent,
}: StickyNoteProps) {
	const [editMode, setEditMode] = useState(false);
	const wrapperRef = useRef<HTMLDivElement | null>(null);

	const handleEditClick = () => {
		setEditMode(true);
		setNoteToEdit(note);
	};

	const handleTitleEdit = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault;
		setNewNoteTitle(e.target.value);
		console.log('new title: ', e.target.value);
	};

	const handleContentEdit = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault;
		setNewNoteContent(e.target.value);
		console.log('new contents', e.target.value);
	};

	useEffect(() => {
		handleEditNote();
		setNewNoteContent(undefined);
		setNewNoteTitle(undefined);
	}, [editMode]);

	const handleClickOutside = (event: MouseEvent) => {
		if (
			wrapperRef.current &&
			!wrapperRef.current.contains(event.target as Node) &&
			editMode
		) {
			console.log('title in click outside:', newNoteTitle);
			console.log('noteContent in click outside:', newNoteContent);
			setEditMode(false);
			console.log('exited edit mode');
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [editMode]);

	return (
		<div className="note-handle m-5" ref={wrapperRef}>
			<Paper>
				{!editMode ? (
					<div onClick={handleEditClick}>
						<Title>{originalTitle}</Title>
					</div>
				) : (
					<input
						type="text"
						placeholder="Enter title"
						onChange={handleTitleEdit}
						defaultValue={originalTitle}
					/>
				)}

				<div onClick={handleEditClick}>
					{!editMode ? (
						<Paragraph>{originalNoteContent}</Paragraph>
					) : (
						<input
							type="text"
							placeholder="Enter content"
							onChange={handleContentEdit}
							defaultValue={originalNoteContent}
						/>
					)}
				</div>
			</Paper>
		</div>
	);
}

export default StickyNote;
