export const authReducer = (state, action) => {
    switch (action.type) {
        case "USER_LOADING":
            return {
                ...state,
                loading: true,
            };
        case "USER_LOADED":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false,
            };
        case "USER_LOAD_FAIL":
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                loading: false,
            };
        case "REMOVE_ACCOUNT":
            return {
                ...state,
                user: {
                    ...state.user,
                    subscriptions: state.user.subscriptions.filter(
                        (sub) => sub.email !== action.payload
                    ),
                },
                isAuthenticated: true,
                loading: false,
            };
        case "ADD_ACCOUNT":
            return {
                ...state,
                user: {
                    ...state.user,
                    subscriptions: [...state.user.subscriptions, action.payload],
                },
            };

        case "LOGOUT":
            localStorage.removeItem("token");
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                loading: false,
            };
        default:
            return state;
    }
};