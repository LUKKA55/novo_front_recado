import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import IRecado from '../interfaces/recadoInterface';
import Grid from '@mui/material/Grid';
import {
	deleteMessage,
	getMessages,
	putArquived,
} from '../store/feature/messagesSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import ModalUpdateMessage from '../modal/modalUpdateMessage';
import Fab from '@mui/material/Fab';
import ModalNewMessage from '../modal/modalNewMessage';
import AddIcon from '@mui/icons-material/Add';
import ArchiveIcon from '@mui/icons-material/Archive';
import ModalArchived from '../modal/modalArchived';
import { useMediaQuery } from '@mui/material';

const Messages = () => {
	const dispatch: AppDispatch = useDispatch();

	const { user_id } = useSelector((state: RootState) => state.userSlice);

	const { all_messages_true } = useSelector(
		(state: RootState) => state.messagesSlice
	);

	const [messages, setMessages] = useState<IRecado[] | null>(null);
	const [open, setOpen] = useState(false);
	const [openNewMessage, setOpenNewMessage] = useState(false);
	const [openArchived, setOpenArchived] = useState(false);

	const [messageUpdate, setMessageUpdate] = useState<IRecado>();

	const isActive = useMediaQuery('(min-width:900px)');

	useEffect(() => {
		dispatch(getMessages(user_id));
	}, []);

	useEffect(() => {
		setMessages(all_messages_true);
	}, [all_messages_true]);

	return (
		<>
			<Grid
				container
				spacing={1}
				component="main"
				maxWidth="xs"
				sx={{
					display: 'flex',
					marginTop: isActive ? '10%' : '17%',
					padding: '1%',
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

								<Fab
									color="success"
									size="small"
									aria-label="edit"
									onClick={() => {
										setOpen(true);
										setMessageUpdate(message);
									}}
									sx={{ margin: '1%', marginTop: '4%' }}
								>
									<EditIcon />
								</Fab>

								<Fab
									color="error"
									size="small"
									aria-label="delete"
									onClick={() =>
										dispatch(
											deleteMessage({
												message_id: message.id,
												user_id: message.user_id,
											})
										)
									}
									sx={{ margin: '1%', marginTop: '4%' }}
								>
									<DeleteIcon />
								</Fab>

								<Fab
									aria-label="arquived"
									size="small"
									color="warning"
									onClick={() =>
										dispatch(
											putArquived({
												message_id: message.id,
												user_id: message.user_id,
											})
										)
									}
									sx={{ margin: '1%', marginTop: '4%' }}
								>
									<SystemUpdateAltIcon />
								</Fab>
							</Grid>
						);
					})
				) : (
					<Typography variant="h5">Sem recados por enquanto...</Typography>
				)}
			</Grid>
			<Fab
				color="warning"
				sx={{ position: 'fixed', right: '2%', bottom: '12%' }}
				onClick={() => setOpenArchived(true)}
			>
				<ArchiveIcon />
			</Fab>
			<Fab
				color="success"
				sx={{ position: 'fixed', right: '2%', bottom: '2%' }}
				onClick={() => setOpenNewMessage(true)}
			>
				<AddIcon />
			</Fab>
			<ModalUpdateMessage
				open={open}
				onClose={() => {
					setOpen(false);
				}}
				data={messageUpdate as IRecado}
			/>
			<ModalNewMessage
				open={openNewMessage}
				onClose={() => {
					setOpenNewMessage(false);
				}}
			/>
			<ModalArchived
				open={openArchived}
				onClose={() => {
					setOpenArchived(false);
				}}
			/>
		</>
	);
};
export default Messages;
