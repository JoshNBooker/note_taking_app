import Draggable from 'react-draggable';
import { Note } from '../Types.tsx';
import StickyNote from './StickyNote';

interface NoteBoardUIProps {
	notes: Note[];
}

function NoteBoardUI({ notes }: NoteBoardUIProps) {
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
