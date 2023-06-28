import axios, { AxiosError } from 'axios';

class Api {
	init() {
		this.setBaseUrl();
	}
	setBaseUrl = () => {
		return axios.create({
			baseURL: 'https://back-recado.onrender.com',
		});
	};

	async doPost(url: string, body: object, token?: any) {
		try {
			const response = await this.setBaseUrl().post(url, body, token);
			if (response.status === 200) {
				return response.data;
			}
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				return error.response?.data;
			}
		}
	}

	async doGet(url: string, token?: any) {
		try {
			const response = await this.setBaseUrl().get(url, token);
			if (response.status === 200) {
				return response.data;
			}
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				return error.response?.data;
			}
		}
	}
	async doPut(url: string, body?: object, token?: any) {
		try {
			const response = await this.setBaseUrl().put(url, body, token);
			if (response.status === 200) {
				return response.data;
			}
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				return error.response?.data;
			}
		}
	}
	async doDelete(url: string, token?: any) {
		try {
			const response = await this.setBaseUrl().delete(url, token);
			if (response.status === 200) {
				return response.data;
			}
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				return error.response?.data;
			}
		}
	}
}

const apiService = new Api();
export default apiService;
