import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './components/home';
import Post from './components/post';
import CreateEditPost from './components/createEditPost';
import Err404 from './components/err404';
import Footer from './components/footer';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export default function App() {
	const [loggedIn, setLoggedIn] = useState(null);
	const [snackBar, setSnackBar] = useState(false);
	const [severity, setSeverity] = useState('');
	const [snackBarContent, setSnackBarContent] = useState('');

	const handleSnackBarClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnackBar(false);
	};

	const handleLog = (loginData) => {
		setLoggedIn(loginData);
	};

	const snackBarProps = {
		snackBar,
		setSnackBar,
		severity,
		setSeverity,
		snackBarContent,
		setSnackBarContent,
	};

	return (
		<>
			<Header
				loggedIn={loggedIn}
				handleLog={handleLog}
				snackBarProps={snackBarProps}
			/>

			<main>
				<Switch>
					<Route exact path="/">
						<Home loggedIn={loggedIn} handleLog={handleLog} />
					</Route>
					<Route path="/create">
						<CreateEditPost loggedIn={loggedIn} snackBarProps={snackBarProps} />
					</Route>
					<Route exact path="/post/:postId">
						<Post loggedIn={loggedIn} snackBarProps={snackBarProps} />
					</Route>
					<Route path="/post/edit/:postId">
						<CreateEditPost loggedIn={loggedIn} snackBarProps={snackBarProps} />
					</Route>
					<Route component={Err404} />
				</Switch>
			</main>

			<Snackbar
				open={snackBar}
				autoHideDuration={5000}
				onClose={handleSnackBarClose}
			>
				<Alert
					onClose={handleSnackBarClose}
					severity={severity}
					elevation={6}
					variant="filled"
				>
					{snackBarContent}
				</Alert>
			</Snackbar>

			<Footer />
		</>
	);
}
