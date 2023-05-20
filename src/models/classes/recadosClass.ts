import { v4 } from 'uuid';
import IRecado from '../interfaces/recadoInterface';
import newDate from '../../services/newDate';

class Recado implements IRecado {
	public id: string;
	public status: boolean;
	public create_date: string;
	public update_date: string;

	constructor(
		public title: string,
		public text: string,
		public user_id: string
	) {
		this.title = title;
		this.text = text;
		this.user_id = user_id;
		this.status = true;
		this.update_date = newDate();
		this.create_date = newDate();
		this.id = v4();
	}
}

export default Recado;
