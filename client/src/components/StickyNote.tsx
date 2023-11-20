import Paragraph from './Content';
import Paper from './Paper';
import Title from './Title';

interface StickyNoteProps {
	title: string;
	noteContent: string;
}

function StickyNote({ title, noteContent }: StickyNoteProps) {
	console.log('title in sticky note:', title);
	return (
		<div className="note-handle m-5">
			<Paper>
				<Title>{title}</Title>
				<Paragraph>{noteContent}</Paragraph>
			</Paper>
		</div>
	);
}

export default StickyNote;
