import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorRoute from './errorRoute';
import Home from '../pages/home';
import Signup from '../pages/signup';
import Login from '../pages/login';

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/Signup" element={<Signup />} />
				<Route path="/Home" element={<Home />} />
				<Route path="*" element={<ErrorRoute />} />
			</Routes>
		</BrowserRouter>
	);
};
export default AppRoutes;
