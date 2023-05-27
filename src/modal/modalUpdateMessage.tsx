import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { putMessage } from '../store/feature/messagesSlice';
import { useState } from 'react';
import IRecado from '../interfaces/recadoInterface';
import { useMediaQuery } from '@mui/material';

const ModalUpdateMessage = ({
	open,
	onClose,
	data,
}: {
	open: boolean;
	onClose: any;
	data: IRecado;
}) => {
	const dispatch: AppDispatch = useDispatch();
	const { user_id } = useSelector((state: RootState) => state.userSlice);
	const [messageTitle, setMessageTitle] = useState<string>();
	const [messageText, setMessageText] = useState<string>();
	const isActive = useMediaQuery('(min-width:900px)');

	const save = ({ title, text }: { title: string; text: string }) => {
		if (messageTitle !== '' || messageText !== '') {
			dispatch(
				putMessage({
					message_id: data.id,
					data: { title, text },
					user_id: user_id,
				})
			);
		}
		setMessageTitle('');
		setMessageText('');
	};

	return (
		<Modal open={open} onClose={onClose}>
			<Box
				sx={{
					position: 'absolute' as 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: isActive ? '400px' : '80%',
					bgcolor: 'background.paper',
					border: '2px solid #6bacd4',
					boxShadow: 24,
					p: 4,
				}}
			>
				<Typography
					id="modal-modal-title"
					variant="h6"
					component="h2"
					sx={{ display: 'flex', justifyContent: 'center' }}
				>
					Update Message
				</Typography>
				<TextField
					sx={{ width: '100%' }}
					margin="normal"
					id="title"
					label="Title"
					variant="outlined"
					value={messageTitle ? messageTitle : ''}
					onChange={(e) => setMessageTitle(e.target.value)}
				/>
				<TextField
					sx={{ width: '100%' }}
					margin="normal"
					id="text"
					label="Text"
					variant="outlined"
					value={messageText ? messageText : ''}
					onChange={(e) => setMessageText(e.target.value)}
				/>
				<Button
					variant="outlined"
					sx={{ width: '10%', marginLeft: '40%' }}
					onClick={() =>
						save({ title: messageTitle as string, text: messageText as string })
					}
				>
					Save
				</Button>
			</Box>
		</Modal>
	);
};
export default ModalUpdateMessage;
