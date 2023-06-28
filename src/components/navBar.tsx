import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AppDispatch, RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setUserOnline } from '../store/feature/userSlice';
import { useEffect, useState } from 'react';
import { getSearch } from '../store/feature/messagesSlice';
import { useMediaQuery } from '@mui/material';

const NavBar = () => {
	const [search, setSearch] = useState('');
	const dispatch: AppDispatch = useDispatch();
	const { user_name, userOnline } = useSelector(
		(state: RootState) => state.userSlice
	);
	const isActive = useMediaQuery('(min-width:900px)');

	useEffect(() => {
		dispatch(getSearch({ token: userOnline, data: search }));
	}, [search]);

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
							width: '40%',
						}}
					>
						{isActive && (
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
						)}
						<Typography
							variant="h5"
							component="a"
							sx={{
								fontFamily: 'monospace',
								marginTop: '5%',
								fontSize: '700',
							}}
						>
							Hi {user_name.split(' ')[0]}
						</Typography>
					</Box>

					<TextField
						sx={{ marginRight: '10%', width: '30%' }}
						id="search"
						type="search"
						label="Search..."
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Button
						variant="contained"
						color="error"
						sx={{ marginRight: '3%' }}
						onClick={() => dispatch(setUserOnline(''))}
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</>
	);
};
export default NavBar;
