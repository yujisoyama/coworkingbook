import { api } from "../Api";

export const checkEmailAlreadyUsing = async (form: { [k: string]: FormDataEntryValue; }): Promise<boolean> => {
    let emailAlreadyUsing: boolean = false;
    await api.get(`/user/${form.email}`).then((res) => {
        if (res.data) {
            emailAlreadyUsing = true;
        } else {
            emailAlreadyUsing = false;
        }
    })
    return emailAlreadyUsing;
}