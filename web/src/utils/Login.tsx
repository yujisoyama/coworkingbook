import { api } from "../Api";

export const login = async (form: { [k: string]: FormDataEntryValue; }): Promise<number> => {
    let statusCode: number = 0;
    try {
        await api.post('/login', {
            email: form.email,
            password: form.password,
        })
            .then((res) => {
                statusCode = res.status;
            })
            .catch((error) => {
                statusCode = error.response.status;
            })
        return statusCode;
    } catch (error) {
        console.log(error);
        return 500;
    }
}