const booksReducerDefaultState = {};

export const Books = (state = booksReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_BOOKS':
            return action.data;
        default:
            return state;
    }
};
