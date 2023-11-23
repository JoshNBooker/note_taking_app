import { ChangeEvent, useEffect, useState, useRef } from 'react';
import Paragraph from './Content';
import Paper from './Paper';
import Title from './Title';

interface StickyNoteProps {
	title: string;
	noteContent: string;
	setNoteTitle: Function;
	setNoteContent: Function;
}

function StickyNote({
	title,
	noteContent,
	setNoteTitle,
	setNoteContent,
}: StickyNoteProps) {
	const [editMode, setEditMode] = useState(false);
	const wrapperRef = useRef<HTMLDivElement | null>(null);

	const handleTitleEdit = (e: ChangeEvent<HTMLInputElement>) => {
		setNoteTitle(e.target.value);
		console.log('new title: ', e.target.value);
	};

	const handleContentEdit = (e: ChangeEvent<HTMLInputElement>) => {
		setNoteContent(e.target.value);
		console.log('new contents', e.target.value);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			wrapperRef.current &&
			!wrapperRef.current.contains(event.target as Node)
		) {
			setEditMode(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className="note-handle m-5" ref={wrapperRef}>
			<Paper>
				<div onClick={() => setEditMode(true)}>
					{!editMode ? (
						<Title>{title}</Title>
					) : (
						<input
							type="text"
							placeholder={title}
							onChange={handleTitleEdit}
						/>
					)}
				</div>
				<div onClick={() => setEditMode(true)}>
					{!editMode ? (
						<Paragraph>{noteContent}</Paragraph>
					) : (
						<input
							type="text"
							placeholder={noteContent}
							onChange={handleContentEdit}
						/>
					)}
				</div>
			</Paper>
		</div>
	);
}

export default StickyNote;
