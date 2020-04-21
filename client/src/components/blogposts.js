import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
	blogposts: {
		marginTop: '10vh',
	},
	card: {
		margin: '10px',
	},
}));

export default function Blogposts(props) {
	const [blogposts, setBlogposts] = useState([]);

	useEffect(() => {
		axios
			.get('/api/blogposts')
			.then((res) => {
				props.setLoading(false);
				setBlogposts(res.data);
			})
			.catch((err) => {
				console.error({ err });
			});
	}, []);

	const classes = useStyles();

	return (
		<Container maxWidth="md" className={classes.blogposts}>
			{blogposts.map((post) => (
				<Card elevation={3} key={post._id} className={classes.card}>
					<CardActionArea component={Link} to={`/post/${post._id}`}>
						<CardContent>
							<Typography gutterBottom variant="h5">
								{post.title}
							</Typography>
							<Typography variant="subtitle1" color="textSecondary">
								by {post.author}
							</Typography>
							<Typography
								variant="subtitle1"
								color="textSecondary"
								align="right"
							>
								{formatDistanceToNowStrict(parseISO(post.timestamp))} ago
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>
			))}
		</Container>
	);
}
