const firebaseConfig = {
	apiKey: 'AIzaSyCQPTXBFR89C-CRX4lWodvY18QM3EOMoyE',
	authDomain: 'notebooker-6f3d4.firebaseapp.com',
	projectId: 'notebooker-6f3d4',
	storageBucket: 'notebooker-6f3d4.appspot.com',
	messagingSenderId: '884152322599',
	appId: '1:884152322599:web:3cce199e75519500d31c02',
	measurementId: 'G-PZD6YCBZHG',
};

export function getFirebaseConfig() {
	if (!firebaseConfig || !firebaseConfig.apiKey) {
		throw new Error(
			'No Firebase configuration object provided.' +
				'\n' +
				"Add your web app's configuration object to firebase-config.ts"
		);
	} else {
		return firebaseConfig;
	}
}
