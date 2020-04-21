import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
	tg: {
		fontSize: '15vmin',
	},
	grid: {
		minHeight: '100vh',
	},
}));

export default function Err404() {
	const classes = useStyles();

	return (
		<>
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="center"
				className={classes.grid}
			>
				<Typography className={classes.tg} color="textSecondary">
					(╯°□°)╯︵ ┻━┻
				</Typography>
				<Typography className={classes.tg} color="textSecondary">
					404!
				</Typography>
			</Grid>
		</>
	);
}
