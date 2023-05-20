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
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validationLogin from '../validations/validationLogin';
import { AppDispatch, RootState } from '../store/store';
import { loginUser, setMessage } from '../store/feature/userSlice';
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';

const FormLogin = () => {
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();
	const { message } = useSelector((state: RootState) => state.userSlice);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(validationLogin),
	});
	useEffect(() => {
		if (message === 'Login feito com SUCESSO.') {
			setTimeout(() => {
				navigate('/Home');
				dispatch(setMessage(''));
			}, 2000);
		}
	}, [message]);

	const login = (data: any) => {
		console.log(data);
		dispatch(loginUser(data));
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
					<Avatar
						alt="Wave"
						src="https://prints.ultracoloringpages.com/815c3491fc3bcbcdd24f343c38e40aad.png"
						sx={{ width: '25%', height: '25%' }}
					/>
					<Typography
						component="h1"
						variant="h3"
						color="initial"
						sx={{ marginBottom: '5%', color: '#6bacd4' }}
					>
						WordWave
					</Typography>
					<TextField
						sx={{ width: '80%' }}
						margin="normal"
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
						sx={{ width: '80%' }}
						margin="normal"
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
						sx={{ width: '80%' }}
						margin="normal"
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
					<Button
						variant="contained"
						sx={{ width: '80%', marginTop: '5%' }}
						onClick={handleSubmit(login)}
					>
						Login
					</Button>

					<Typography
						variant="caption"
						color="initial"
						sx={{ marginBottom: '5%', marginTop: '5%' }}
					>
						Don't have an account?{' '}
						<span
							style={{ textDecoration: 'underline', cursor: 'pointer' }}
							onClick={() => {
								navigate('/Signup');
							}}
						>
							Create your account here.
						</span>
					</Typography>
				</Box>
			</Container>
		</>
	);
};

export default FormLogin;
