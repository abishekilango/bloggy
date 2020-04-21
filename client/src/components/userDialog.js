import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	textfield: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserDialog(props) {
	const [value, setValue] = useState(0);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleUsernameChange = (event) => {
		setUsername(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleClick = () => {
		if (value === 0) {
			axios
				.get('/api/users/check', {
					params: {
						username,
						password,
					},
				})
				.then((res) => {
					if (res.data === 'User data valid') {
						props.handleLog({ username, password });
						props.snackBarProps.setSeverity('success');
						props.snackBarProps.setSnackBarContent('Login Succesful!');
						setUsername('');
						setPassword('');
						props.snackBarProps.setSnackBar(true);
						props.handleClose();
					} else {
						props.snackBarProps.setSeverity('warning');
						props.snackBarProps.setSnackBarContent(res.data);
						props.snackBarProps.setSnackBar(true);
					}
				})
				.catch((err) => {
					console.error(err);
					props.snackBarProps.setSeverity('error');
					props.snackBarProps.setSnackBarContent('Error! Please try again.');
					props.snackBarProps.setSnackBar(true);
				});
		} else {
			axios
				.post('/api/users/create', null, {
					params: { username, password },
				})
				.then((res) => {
					if (res.data === 'User created') {
						props.snackBarProps.setSeverity('success');
						props.snackBarProps.setSnackBarContent(
							'Registration Succesful! Login to continue.'
						);
						setPassword('');
						setValue(0);
						props.snackBarProps.setSnackBar(true);
					} else {
						props.snackBarProps.setSeverity('warning');
						props.snackBarProps.setSnackBarContent(res.data);
						props.snackBarProps.setSnackBar(true);
					}
				})
				.catch((err) => {
					console.error(err);
					props.snackBarProps.setSeverity('error');
					props.snackBarProps.setSnackBarContent('Error! Please try again.');
					props.snackBarProps.setSnackBar(true);
				});
		}
	};

	const classes = useStyles();

	return (
		<>
			<Dialog
				open={props.open}
				onClose={props.handleClose}
				TransitionComponent={Transition}
			>
				<AppBar position="static" color="default">
					<Tabs value={value} onChange={handleChange} indicatorColor="primary">
						<Tab label="Login" id="0" />
						<Tab label="Register" id="1" />
					</Tabs>
				</AppBar>
				<DialogContent>
					<div>
						<TextField
							className={classes.textfield}
							id="username"
							label="Username"
							value={username}
							onChange={handleUsernameChange}
							autoFocus
							fullWidth
						/>
					</div>
					<div>
						<TextField
							className={classes.textfield}
							id="password"
							label="Password"
							type="password"
							value={password}
							onChange={handlePasswordChange}
							fullWidth
						/>
					</div>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClick} color="primary">
						{value ? 'Register' : 'Login'}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
