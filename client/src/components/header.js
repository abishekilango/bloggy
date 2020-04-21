import React, { useState } from 'react';
import Appbar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/';
import { Link } from 'react-router-dom';
import UserDialog from './userDialog';
import LogoutDialog from './logoutDialog';

const useStyles = makeStyles(() => ({
	title: {
		textDecoration: 'none',
		outline: 'none',
	},
}));

export default function Header(props) {
	const [userDialogOpen, setUserDialogOpen] = useState(false);
	const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

	const handleOpen = () => {
		if (props.loggedIn === null) {
			setUserDialogOpen(true);
		} else {
			setLogoutDialogOpen(true);
		}
	};

	const handleUserDialogClose = () => {
		setUserDialogOpen(false);
	};

	const handleLogoutDialogClose = () => {
		setLogoutDialogOpen(false);
	};

	const classes = useStyles();

	return (
		<>
			<CssBaseline />
			<Appbar>
				<Toolbar>
					<Grid justify="space-between" container>
						<Grid item>
							<Typography
								variant="h6"
								color="inherit"
								className={classes.title}
								component={Link}
								to="/"
							>
								Bloggy
							</Typography>
						</Grid>
						<Grid item>
							<Button color="inherit" onClick={handleOpen}>
								{props.loggedIn === null ? 'Login' : 'Logout'}
							</Button>
						</Grid>
					</Grid>
				</Toolbar>
			</Appbar>

			<UserDialog
				open={userDialogOpen}
				handleClose={handleUserDialogClose}
				loggedIn={props.loggedIn}
				handleLog={props.handleLog}
				snackBarProps={props.snackBarProps}
			/>
			<LogoutDialog
				open={logoutDialogOpen}
				handleClose={handleLogoutDialogClose}
				handleLog={props.handleLog}
				snackBarProps={props.snackBarProps}
			/>
		</>
	);
}
