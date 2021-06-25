export const setUser = (data) => {
    return {
        type: "SET_USER",
        payload: data
    };
};

export const UnsetUser = () => {
    return {
        type: "RESET_USER"
    };
};