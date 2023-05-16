import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { CssBaseline } from '@mui/material';

const ErrorRoute = () => {
	return (
		<>
			<CssBaseline />
			<Alert
				severity="error"
				sx={{
					position: 'absolute',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					margin: 'auto',
					left: 0,
					right: 0,
					bottom: 0,
					top: 0,
				}}
			>
				<AlertTitle>Error</AlertTitle>
				This page was not found
			</Alert>
		</>
	);
};
export default ErrorRoute;
