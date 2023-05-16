import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import IRecado from '../models/interfaces/recadoInterface';
import Grid from '@mui/material/Grid';
import { getMessages } from '../store/feature/messagesSlice';

const Messages = () => {
	const dispatch: AppDispatch = useDispatch();

	const { user_id } = useSelector((state: RootState) => state.userSlice);

	const { all_messages_true } = useSelector(
		(state: RootState) => state.messagesSlice
	);

	const [messages, setMessages] = useState<IRecado[] | null>(null);

	useEffect(() => {
		dispatch(getMessages(user_id));
	}, []);

	useEffect(() => {
		setMessages(all_messages_true);
		console.log('messages', messages);
	}, [all_messages_true]);

	return (
		<>
			<Grid
				container
				spacing={2}
				component="main"
				maxWidth="xs"
				sx={{
					display: 'flex',
					marginTop: '10%',
					padding: '1%',
				}}
			>
				{messages?.length ? (
					messages.map((message) => {
						console.log(message);
						return (
							<Grid
								key={message.id}
								sx={{
									boxShadow: 'none',
									cursor: 'pointer',
									border: '1px solid #6bacd4',
									borderRadius: '10px',
								}}
								item
								xs={4}
							>
								<Typography>{message.create_date}</Typography>
								<Typography>{message.title}</Typography>
								<Typography>{message.text}</Typography>
							</Grid>
						);
					})
				) : (
					<Typography>Sem recados por enquanto...</Typography>
				)}
			</Grid>
		</>
	);
};
export default Messages;
