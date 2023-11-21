import { ChangeEvent, FormEvent, useState } from 'react';
import reactLogo from '.././assets/react.svg';
import { signInUser } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const defaultFormFields = {
	email: '',
	password: '',
};

function Home() {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const [newUserFormFields, setNewUserFormFields] =
		useState(defaultFormFields);
	const { email, password } = formFields;
	const { email: newUserEmail, password: newUserPassword } =
		newUserFormFields;
	const navigate = useNavigate();

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
		setNewUserFormFields(defaultFormFields);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			// Send the email and password to firebase
			const userCredential = await signInUser(email, password);

			if (userCredential) {
				resetFormFields();
				navigate('/profile');
			}
		} catch (error: any) {
			console.log('User Sign In Failed', error.message);
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	const handleChangeNewUser = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setNewUserFormFields({ ...newUserFormFields, [name]: value });
	};

	const handleSubmitNewUser = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log('new user clicked');

		try {
			// Send the email and password to firebase to create a new user
			const auth = getAuth();
			await createUserWithEmailAndPassword(
				auth,
				newUserEmail,
				newUserPassword
			);

			resetFormFields();
			navigate('/profile');
		} catch (error: any) {
			console.error('User Sign Up Failed', error.message);
		}
	};

	return (
		<div className="App">
			<div className="card">
				<form onSubmit={handleSubmitNewUser}>
					<div>
						<input
							type="email"
							name="email"
							value={newUserEmail}
							onChange={handleChangeNewUser}
							placeholder="New User Email"
							required
						/>
					</div>
					<div>
						<input
							type="password"
							name="password"
							value={newUserPassword}
							onChange={handleChangeNewUser}
							placeholder="New UserPassword"
							required
						/>
					</div>
					<div>
						<input id="newUserRecaptcha" type="submit" />
					</div>
				</form>
				<form onSubmit={handleSubmit}>
					<div>
						<input
							type="email"
							name="email"
							value={email}
							onChange={handleChange}
							placeholder="Email"
							required
						/>
					</div>
					<div>
						<input
							type="password"
							name="password"
							value={password}
							onChange={handleChange}
							placeholder="Password"
							required
						/>
					</div>
					<div>
						<input id="recaptcha" type="submit" />
					</div>
				</form>
			</div>
		</div>
	);
}

export default Home;
