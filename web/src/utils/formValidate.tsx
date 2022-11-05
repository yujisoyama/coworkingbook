
export const inputEmpty = (input: string): string => {
    if (input === "") {
        return 'true';
    } else {
        return 'false';
    }
}

export const verifyEmail = (email: string): string => {
    if (email.indexOf('@') === -1) {
        return 'true';
    } else {
        return 'false';
    }
}