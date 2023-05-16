import { v4 } from 'uuid';
import IRecado from '../interfaces/recadoInterface';

class Recado implements IRecado {
	public id: string;
	public status: boolean;
	public create_date: string;
	public update_date: string;

	constructor(
		public title: string,
		public text: string,
		public id_user: string
	) {
		this.title = title;
		this.text = text;
		this.id_user = id_user;
		this.status = true;
		this.update_date = new Date().toISOString();
		this.create_date = new Date().toISOString();
		this.id = v4();
	}
}

export default Recado;
