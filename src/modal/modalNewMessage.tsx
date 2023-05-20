import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validationMessage from '../validations/validationMessage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { postMessage } from '../store/feature/messagesSlice';
import { useMediaQuery } from '@mui/material';
import { useState } from 'react';

const ModalNewMessage = ({
	open,
	onClose,
}: {
	open: boolean;
	onClose: any;
}) => {
	const dispatch: AppDispatch = useDispatch();
	const { user_id } = useSelector((state: RootState) => state.userSlice);
	const [resetTitle, setResetTitle] = useState('');
	const [resetText, setResetText] = useState('');
	const isActive = useMediaQuery('(min-width:900px)');

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationMessage),
	});

	const save = (data: any) => {
		if (resetTitle !== '' && resetText !== '') {
			dispatch(postMessage({ data, user_id }));
			setResetTitle('');
			setResetText('');
		}
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
					New Message
				</Typography>

				<TextField
					sx={{ width: '100%' }}
					margin="normal"
					id="title"
					label="Title"
					variant="outlined"
					{...register('title')}
					error={errors.title ? true : false}
					helperText={String(
						errors.title?.message ? errors.title?.message : ''
					)}
					value={resetTitle}
					onChange={(e) => setResetTitle(e.target.value)}
				/>

				<TextField
					sx={{ width: '100%' }}
					margin="normal"
					id="text"
					label="Text"
					variant="outlined"
					{...register('text')}
					error={errors.text ? true : false}
					helperText={String(errors.text?.message ? errors.text?.message : '')}
					value={resetText}
					onChange={(e) => setResetText(e.target.value)}
				/>

				<Button
					variant="outlined"
					sx={{ width: '10%', marginLeft: '40%' }}
					onClick={handleSubmit(save)}
				>
					Save
				</Button>
			</Box>
		</Modal>
	);
};
export default ModalNewMessage;
