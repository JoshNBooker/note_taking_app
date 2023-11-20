import { ReactNode } from 'react';

interface TitleProps {
	children: ReactNode;
}

function Title({ children }: TitleProps) {
	return <h3 className="text-4xl">{children}</h3>;
}

export default Title;
