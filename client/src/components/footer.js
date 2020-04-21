import React from 'react';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
	appbar: {
		bottom: 0,
		top: 'auto',
	},
}));

export default function Footer() {
	const classes = useStyles();

	return (
		<>
			<AppBar color="inherit" className={classes.appbar}>
				<Typography variant="overline" align="center" color="textSecondary">
					Created by Abishek Ilango
				</Typography>
			</AppBar>
		</>
	);
}
