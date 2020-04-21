import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';
import lorem from './lorem';
import axios from 'axios';
import { useHistory, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	textfield: {
		marginBottom: theme.spacing(2),
	},
	backdrop: {
		zIndex: theme.zIndex.appBar + 1,
	},
}));

let url, redirectUrl;

export default function CreateEditPost(props) {
	const classes = useStyles();
	const history = useHistory();
	const [title, setTitle] = useState('Lorem Ipsum');
	const [content, setContent] = useState(lorem);
	const [loading, setLoading] = useState(false);
	const match = useRouteMatch();

	useEffect(() => {
		if (match.path === '/create') {
			url = '/api/blogposts/create';
			redirectUrl = '/';
		} else {
			setLoading(true);
			url = `/api/blogposts/${match.params.postId}/modify`;
			redirectUrl = `/post/${match.params.postId}`;
			axios
				.get(`/api/blogposts/${match.params.postId}`)
				.then((res) => {
					setLoading(false);
					setTitle(res.data.title);
					setContent(res.data.content);
				})
				.catch((err) => {
					setLoading(false);
					console.error(err);
				});
		}
	}, []);

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	};

	const handleContentChange = (event) => {
		setContent(event.target.value);
	};

	const handleClick = () => {
		setLoading(true);
		axios
			.post(
				url,
				{ title, content },
				{
					params: {
						username: props.loggedIn.username,
						password: props.loggedIn.password,
					},
				}
			)
			.then((res) => {
				setLoading(false);
				if (res.data === 'Blogpost added' || res.data === 'Blogpost Modified') {
					props.snackBarProps.setSeverity('success');
					props.snackBarProps.setSnackBarContent(res.data);
					props.snackBarProps.setSnackBar(true);
					history.push(redirectUrl);
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
			<Container maxWidth="sm" style={{ marginTop: '10vh' }}>
				<TextField
					className={classes.textfield}
					id="title"
					label="Title"
					variant="outlined"
					fullWidth
					value={title}
					onChange={handleTitleChange}
					disabled={props.loggedIn === null ? true : false}
				/>
				<TextField
					className={classes.textfield}
					id="content"
					label="Content"
					variant="outlined"
					fullWidth
					multiline
					rows={25}
					value={content}
					onChange={handleContentChange}
					disabled={props.loggedIn === null ? true : false}
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={handleClick}
					disabled={props.loggedIn === null ? true : false}
				>
					Submit
				</Button>
			</Container>

			<Backdrop className={classes.backdrop} open={loading}>
				<CircularProgress color="secondary" />
			</Backdrop>
		</>
	);
}
