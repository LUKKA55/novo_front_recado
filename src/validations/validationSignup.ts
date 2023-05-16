import * as yup from 'yup';

const validationSignup = yup.object().shape({
	name: yup.string().required('required.').min(5, 'minimum 5 characters.'),
	email: yup.string().email('email is invalid.').required('required.'),
	password: yup.string().min(8, 'minimum 8 characters.').required('required.'),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password')], 'need to be equal'),
});

export default validationSignup;
