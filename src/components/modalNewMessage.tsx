import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { style } from '../styled/styledModal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validationMessage from '../validations/validationMessage';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { postMessage } from '../store/feature/messagesSlice';
import { useEffect, useState } from 'react';

const defaultInputValues = {
	title: '',
	text: '',
};

const ModalNewMessage = ({
	open,
	onClose,
}: {
	open: boolean;
	onClose: any;
}) => {
	const dispatch: AppDispatch = useDispatch();
	const { user_id } = useSelector((state: RootState) => state.userSlice);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationMessage),
	});
	const [values, setValues] = useState(defaultInputValues);

	useEffect(() => {
		if (open) setValues(defaultInputValues);
	}, [open]);

	const save = (data: any) => {
		dispatch(postMessage({ data, user_id }));
	};
	const handleChange = (value: any) => {
		console.log(value);
		setValues(value);
	};

	return (
		<Modal open={open} onClose={onClose}>
			<Box sx={style}>
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
					value={values.title}
					onChange={(e) => handleChange({ ...values, title: e.target.value })}
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
					value={values.text}
					onChange={(e) => handleChange({ ...values, text: e.target.value })}
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
