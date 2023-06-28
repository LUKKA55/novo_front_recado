import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import {
	deleteMessage,
	getMessagesFalse,
	putUnarchive,
} from '../store/feature/messagesSlice';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { IconButton, useMediaQuery } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IRecado from '../interfaces/recadoInterface';
import UnarchiveIcon from '@mui/icons-material/Unarchive';

const ModalArchived = ({ open, onClose }: { open: boolean; onClose: any }) => {
	const dispatch: AppDispatch = useDispatch();
	const { all_messages_false } = useSelector(
		(state: RootState) => state.messagesSlice
	);
	const { userOnline } = useSelector((state: RootState) => state.userSlice);
	const [messages, setMessages] = useState<IRecado[] | null>(null);

	const isActive = useMediaQuery('(min-width:900px)');

	useEffect(() => {
		dispatch(getMessagesFalse(userOnline));
	}, []);

	useEffect(() => {
		setMessages(all_messages_false);
	}, [all_messages_false]);

	return (
		<Modal open={open} onClose={onClose}>
			<Box
				sx={{
					position: 'absolute' as 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: '80%',
					bgcolor: 'background.paper',
					border: '2px solid #6bacd4',
					boxShadow: 24,
					p: 4,
					maxHeight: isActive ? '100%' : '70%',
					overflowY: 'scroll',
				}}
			>
				<Grid
					container
					spacing={1}
					component="main"
					maxWidth="xs"
					sx={{
						display: 'flex',
						padding: isActive ? '1%' : '0',
					}}
				>
					{messages?.length ? (
						messages.map((message) => {
							return (
								<Grid
									key={message.id}
									sx={{
										boxShadow: 'none',
										border: '1px solid #6bacd4',
										borderRadius: '10px',
									}}
									item
									xs={12}
									sm={6}
									md={4}
								>
									<Typography
										variant="body2"
										sx={{
											display: 'flex',
											justifyContent: 'end',
											marginRight: '1%',
										}}
									>
										{message.create_at}
									</Typography>
									<Typography
										variant="body2"
										sx={{
											display: 'flex',
											justifyContent: 'end',
											marginRight: '1%',
										}}
									>
										{message.create_at !== message.update_at
											? message.update_at
											: null}
									</Typography>
									<Typography variant="h6">{message.title}</Typography>
									<Typography variant="body2">{message.text}</Typography>

									<IconButton
										aria-label="delete"
										color="error"
										onClick={() =>
											dispatch(
												deleteMessage({
													message_id: message.id,
													token: userOnline,
												})
											)
										}
									>
										<DeleteIcon />
									</IconButton>
									<IconButton
										aria-label="arquived"
										color="warning"
										onClick={() =>
											dispatch(
												putUnarchive({
													message_id: message.id,
													token: userOnline,
												})
											)
										}
									>
										<UnarchiveIcon />
									</IconButton>
								</Grid>
							);
						})
					) : (
						<Typography variant="h5">Sem recados arquivados...</Typography>
					)}
				</Grid>
			</Box>
		</Modal>
	);
};
export default ModalArchived;
