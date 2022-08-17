export const userActionTypes = {
    REGISTER_USER_ERROR:"REGISTER_USER_ERROR",
    AUTHORIZE_USER_SUCCESSFUL:"AUTHORIZE_USER_SUCCESSFUL",
}

const initialState = {
    user: {},
    is_login: false,
    is_admin: false,
    reply:0
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userActionTypes.REGISTER_USER_ERROR:{
            return {...state,reply:action.payload};
        }
        case userActionTypes.AUTHORIZE_USER_SUCCESSFUL:{
            return {...state,reply:200,user:action.payload,is_login:true,is_admin:action.payload.isAdmin};
        }
        default: {
            return state
        }
    }
}