import { api } from "../Api";

export const createAccount = async (form: { [k: string]: FormDataEntryValue; }) => {
    await api.post('/user', {
        fullname: form.fullname,
        email: form.email,
        password: form.password,
        company: form.company,
        role: form.role
    })
}