import { v4 } from 'uuid';
import IRecado from '../interfaces/recadoInterface';
import newDate from '../../services/newDate';

class Recado implements IRecado {
	public id: string;
	public status: boolean;
	public create_at: string;
	public update_at: string;

	constructor(
		public title: string,
		public text: string,
		public user_id: string
	) {
		this.title = title;
		this.text = text;
		this.user_id = user_id;
		this.status = true;
		this.update_at = newDate();
		this.create_at = newDate();
		this.id = v4();
	}
}

export default Recado;
