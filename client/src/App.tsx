import { useState, useEffect, useContext } from 'react';
import { Note, User } from '../../types/Types';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth-context';
import Home from './routes/home';
import Profile from './routes/profile';
import NoteBoardUI from './components/NoteBoardUI';
import RequireAuth from './components/RequireAuth';

function App() {
	const [notes, setNotes] = useState<Note[]>([]);
	const [users, setUsers] = useState<User[]>([]);
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
	const apiUrl: string = 'http://localhost:8080';
	const fetchData = async (url: string) => {
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.error('Error fetching data:', error);
			throw error;
		}
	};
	useEffect(() => {
		(async () => {
			try {
				const notesData = await fetchData(apiUrl + '/notes');
				console.log('notes:', notesData);
				setNotes(notesData);

				const usersData = await fetchData(apiUrl + '/users');
				console.log('users:', usersData);
				setUsers(usersData);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	if (!notes) {
		return (
			<div>
				<h1>No notes</h1>
			</div>
		);
	}
	if (!users) {
		return (
			<div>
				<h1>No users</h1>
			</div>
		);
	}
	return (
		<Routes>
			<Route index element={<Home />} />
			<Route
				path="noteboard"
				element={
					<RequireAuth>
						<NoteBoardUI notes={notes} />
					</RequireAuth>
				}
			/>
		</Routes>
	);
}

export default App;
