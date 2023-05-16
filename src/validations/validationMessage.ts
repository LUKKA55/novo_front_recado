import * as yup from 'yup';

const validationMessage = yup.object().shape({
	title: yup.string().required('required.'),
	text: yup.string().required('required.'),
});

export default validationMessage;
