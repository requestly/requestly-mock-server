export const validatePassword = (
    savedPassword: string | undefined, 
    requestPassword: string | undefined
): boolean => {
    if(savedPassword) {
        if(!requestPassword || savedPassword !== requestPassword) {
            return false;
        }
    }
    return true;
}