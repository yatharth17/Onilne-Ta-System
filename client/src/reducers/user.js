
const initialState = {
    name: "",
    email: "",
    type: "",
    home: "",
}

export default function setuser(state = initialState, action) {
    switch(action.type) {
        case "SET_USER":
            return {
                ...state,
                
                name: action.payload.name,
                email: action.payload.email,
                type: action.payload.type,
                home: action.payload.home,
            };
        
        case "RESET_USER":
            return {
                name: "",
                email: "",
                type: "",
                home: "/",
            };
        
        default: 
            return state;        
    }
}