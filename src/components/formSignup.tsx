import Container from '@mui/material/Container';
import {
	CssBaseline,
	Typography,
	TextField,
	Button,
	Alert,
	IconButton,
} from '@mui/material';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import validationSignup from '../validations/validationSignup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { postUser, setMessage } from '../store/feature/userSlice';
import { useSelector } from 'react-redux/es/exports';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';

const FormSignup = () => {
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const { message } = useSelector((state: RootState) => state.userSlice);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationSignup),
	});

	useEffect(() => {
		if (message === 'Cadastrado com SUCESSO.') {
			setTimeout(() => {
				navigate('/');
				dispatch(setMessage(''));
			}, 2000);
		}
	}, [message]);

	const signup = (data: any): any => {
		dispatch(postUser(data));
	};

	return (
		<>
			<Container
				component="main"
				maxWidth="xs"
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}}
			>
				<CssBaseline />
				{message && (
					<Alert
						sx={{ marginBottom: '2%' }}
						severity="info"
						action={
							<IconButton
								aria-label="close"
								color="inherit"
								size="small"
								onClick={() => {
									dispatch(setMessage(''));
								}}
							>
								<CloseIcon fontSize="inherit" />
							</IconButton>
						}
					>
						{message}
					</Alert>
				)}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'column',
						border: '2px solid 	#6bacd4',
						borderRadius: '20px',
					}}
				>
					<Typography
						component="h1"
						variant="h3"
						color="initial"
						sx={{ marginBottom: '5%', marginTop: '5%', color: '#6bacd4' }}
					>
						WordWave
					</Typography>

					<TextField
						sx={{ width: '80%', marginBottom: '5%' }}
						id="name"
						label="Name"
						variant="outlined"
						{...register('name')}
						error={errors.name ? true : false}
						helperText={String(
							errors.name?.message ? errors.name?.message : ''
						)}
					/>
					<TextField
						sx={{ width: '80%', marginBottom: '5%' }}
						type="email"
						id="email"
						label="Email"
						variant="outlined"
						{...register('email')}
						error={errors.email ? true : false}
						helperText={String(
							errors.email?.message ? errors.email?.message : ''
						)}
					/>
					<TextField
						sx={{ width: '80%', marginBottom: '5%' }}
						type="password"
						id="password"
						label="Password"
						variant="outlined"
						{...register('password')}
						error={errors.password ? true : false}
						helperText={String(
							errors.password?.message ? errors.password?.message : ''
						)}
					/>
					<TextField
						sx={{ width: '80%' }}
						type="password"
						id="confirm password"
						label="Confirm Password"
						variant="outlined"
						{...register('confirmPassword')}
						error={errors.confirmPassword ? true : false}
						helperText={String(
							errors.confirmPassword?.message
								? errors.confirmPassword?.message
								: ''
						)}
					/>
					<Button
						variant="contained"
						sx={{ width: '80%', marginTop: '5%' }}
						onClick={handleSubmit(signup)}
					>
						Signup
					</Button>

					<Typography
						variant="caption"
						color="initial"
						sx={{ marginBottom: '5%', marginTop: '5%' }}
					>
						Already have an account?{' '}
						<span
							style={{ textDecoration: 'underline', cursor: 'pointer' }}
							onClick={() => {
								navigate('/');
							}}
						>
							login.
						</span>
					</Typography>
				</Box>
			</Container>
		</>
	);
};

export default FormSignup;
