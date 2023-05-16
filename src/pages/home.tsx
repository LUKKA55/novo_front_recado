import { useSelector } from 'react-redux';
import NavBar from '../components/navBar';
import { RootState } from '../store/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Messages from '../components/messages';

const Home = () => {
	const navigate = useNavigate();
	const { userOnline } = useSelector((state: RootState) => state.userSlice);
	useEffect(() => {
		if (userOnline !== true) {
			navigate('/');
		}
	}, [userOnline]);

	return (
		<>
			<NavBar />
			<Messages />
		</>
	);
};
export default Home;
