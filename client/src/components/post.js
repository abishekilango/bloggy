import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { useRouteMatch, Link, useHistory } from 'react-router-dom';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: '8vh',
		margin: theme.spacing(2),
	},
	backdrop: {
		zIndex: theme.zIndex.appBar + 1,
	},
	content: {
		whiteSpace: 'pre-line',
	},
	fab: {
		position: 'fixed',
	},
	edit: {
		right: 80,
		bottom: 40,
	},
	delete: {
		right: 10,
		bottom: 40,
	},
}));

export default function Post(props) {
	const classes = useStyles();
	const [post, setPost] = useState({
		title: 'Title',
		author: 'Author',
		content: 'Content',
		timestamp: '1970-01-01T00:00:00.000Z',
	});
	const [loading, setLoading] = useState(true);
	const match = useRouteMatch();
	const history = useHistory();

	useEffect(() => {
		axios
			.get(`/api/blogposts/${match.params.postId}`)
			.then((res) => {
				setLoading(false);
				setPost(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	const handleClick = () => {
		setLoading(true);
		axios
			.delete(`/api/blogposts/${match.params.postId}/delete`, {
				params: {
					username: props.loggedIn.username,
					password: props.loggedIn.password,
				},
			})
			.then((res) => {
				setLoading(false);
				if (res.data === 'Deleted Successfully') {
					props.snackBarProps.setSeverity('success');
					props.snackBarProps.setSnackBarContent(res.data);
					props.snackBarProps.setSnackBar(true);
					history.push('/');
				} else {
					props.snackBarProps.setSeverity('warning');
					props.snackBarProps.setSnackBarContent(res.data);
					props.snackBarProps.setSnackBar(true);
				}
			})
			.catch((err) => {
				setLoading(false);
				console.error(err);
				props.snackBarProps.setSeverity('error');
				props.snackBarProps.setSnackBarContent('Error! Please try again.');
				props.snackBarProps.setSnackBar(true);
			});
	};

	return (
		<>
			<Box className={classes.root}>
				<Typography variant="h3">{post.title}</Typography>
				<Typography variant="subtitle1" color="textSecondary">
					by {post.author}
				</Typography>
				<Typography variant="subtitle1" color="textSecondary" align="right">
					{formatDistanceToNowStrict(parseISO(post.timestamp))} ago
				</Typography>
				<Typography variant="body1" align="justify" className={classes.content}>
					{post.content}
				</Typography>
			</Box>

			<Fab
				color="inherit"
				className={`${classes.fab} ${classes.edit}`}
				disabled={
					props.loggedIn !== null && props.loggedIn.username === post.author
						? false
						: true
				}
				component={Link}
				to={`/post/edit/${post._id}`}
			>
				<EditIcon />
			</Fab>
			<Fab
				color="secondary"
				className={`${classes.fab} ${classes.delete}`}
				disabled={
					props.loggedIn !== null && props.loggedIn.username === post.author
						? false
						: true
				}
				onClick={handleClick}
			>
				<DeleteIcon />
			</Fab>

			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color="secondary" />
			</Backdrop>
		</>
	);
}
