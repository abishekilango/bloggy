import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import MuiDialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

const DialogContentText = withStyles((theme) => ({
	root: {
		paddingRight: theme.spacing(8),
		paddingBottom: theme.spacing(2),
	},
}))(MuiDialogContentText);

export default function LogoutDialog(props) {
	const handleYesClick = () => {
		props.handleLog(null);
		props.handleClose();
		props.snackBarProps.setSeverity('info');
		props.snackBarProps.setSnackBarContent('Logout Succesful!');
		props.snackBarProps.setSnackBar(true);
	};

	return (
		<>
			<Dialog open={props.open} onClose={props.handleClose}>
				<DialogTitle>Logout</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<Typography>Are you Sure?</Typography>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={props.handleClose} color="primary">
						No
					</Button>
					<Button onClick={handleYesClick} color="primary">
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
