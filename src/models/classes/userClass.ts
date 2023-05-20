import { v4 } from 'uuid';
import IUser from '../interfaces/userInterface';
import newDate from '../../services/newDate';

class User implements IUser {
	public id: string;
	constructor(
		public name: string,
		public email: string,
		public password: string,
		public created_at: string,
		public updated_at: string
	) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.id = v4();
		this.created_at = newDate();
		this.updated_at = newDate();
	}
}

export default User;
