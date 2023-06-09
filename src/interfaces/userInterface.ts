interface IUser {
	id: string;
	name: string;
	email: string;
	password: string;
	created_at: string;
	updated_at: string;
	token?: string;
}

export default IUser;
