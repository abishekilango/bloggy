import React, { useState } from 'react';
import Blogposts from './blogposts';
import { makeStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(() => ({
	fab: {
		right: 10,
		bottom: 40,
		position: 'fixed',
	},
}));

export default function Home(props) {
	const classes = useStyles();
	const [loading, setLoading] = useState(true);
	const backdropStyle = {
		zIndex: 1101,
	};

	return (
		<>
			<Backdrop style={backdropStyle} open={loading}>
				<CircularProgress color="secondary" />
			</Backdrop>

			<Blogposts setLoading={setLoading} />

			<Fab
				className={classes.fab}
				color="secondary"
				disabled={props.loggedIn === null}
				component={Link}
				to="/create"
			>
				<AddIcon />
			</Fab>
		</>
	);
}
