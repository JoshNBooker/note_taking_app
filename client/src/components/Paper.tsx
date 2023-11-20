import { ReactNode } from 'react';

interface PaperProps {
	children: ReactNode;
}

function Paper({ children }: PaperProps) {
	return (
		<div className="bg-yellow-200 p-4 rounded-md shadow-md sticky top-4 max-w-xs">
			{children}
		</div>
	);
}

export default Paper;
