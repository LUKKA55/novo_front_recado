import { v4 } from 'uuid';
import IUser from '../interfaces/userInterface';

class User implements IUser {
	public id: string;
	constructor(
		public name: string,
		public email: string,
		public password: string
	) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.id = v4();
	}
}

export default User;
