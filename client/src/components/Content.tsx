import { ReactNode } from 'react';

interface ParagraphProps {
	children: ReactNode;
}

function Paragraph({ children }: ParagraphProps) {
	return <div className="text-base">{children}</div>;
}

export default Paragraph;
