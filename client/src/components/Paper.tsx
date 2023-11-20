import { ReactNode } from 'react';

interface PaperProps {
	children: ReactNode;
}

function Paper({ children }: PaperProps) {
	return <div className="bg-yellow-50">{children}</div>;
}

export default Paper;
