import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';
import { setUserOnline } from '../store/feature/userSlice';
import { useState } from 'react';
import ModalNewMessage from '../components/modalNewMessage';

const NavBar = () => {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState('');
	const dispatch: AppDispatch = useDispatch();

	return (
		<>
			<AppBar sx={{ backgroundColor: '#6bacd4' }}>
				<Toolbar
					sx={{
						display: 'flex',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'flex-start',
							width: '50%',
						}}
					>
						<Avatar
							alt="Wave"
							src="https://prints.ultracoloringpages.com/815c3491fc3bcbcdd24f343c38e40aad.png"
							sx={{
								width: '15%',
								height: '15%',
								marginRight: '2%',
								marginLeft: '3%',
							}}
						/>
						<Typography
							variant="h5"
							component="a"
							sx={{
								fontFamily: 'monospace',
								marginTop: '5%',

								fontSize: '700',
							}}
						>
							Wordwave
						</Typography>
					</Box>
					<Button
						variant="contained"
						color="success"
						sx={{ marginRight: '10%' }}
						onClick={() => setOpen(true)}
					>
						Publish
					</Button>
					<TextField
						sx={{ marginRight: '20%' }}
						id="search"
						type="search"
						label="Search..."
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Button
						variant="contained"
						color="error"
						sx={{ marginRight: '3%' }}
						onClick={() => dispatch(setUserOnline(false))}
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
			<ModalNewMessage
				open={open}
				onClose={() => {
					setOpen(false);
				}}
			/>
		</>
	);
};
export default NavBar;
