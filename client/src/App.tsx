import { useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import Home from './routes/home';
import NoteBoardUI from './components/NoteBoardUI';
import RequireAuth from './components/RequireAuth';

function App() {
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();
	// NOTE: console log for testing purposes
	console.log('User:', !!currentUser);

	// Check if the current user exists on the initial render.
	useEffect(() => {
		if (currentUser) {
			navigate('/noteboard');
		}
	}, [currentUser]);

	return (
		<Routes>
			<Route index element={<Home />} />
			<Route
				path="noteboard"
				element={
					<RequireAuth>
						<NoteBoardUI currentUser={currentUser} />
					</RequireAuth>
				}
			/>
		</Routes>
	);
}

export default App;
