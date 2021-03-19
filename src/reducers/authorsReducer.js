const authorsReducerDefaultState = [];
const authorsReducerObjectState = {};

export const Authors = (state = authorsReducerDefaultState, action) => {
    switch (action.type) {
        case 'GET_AUTHORS':
            return action.data;
        default:
            return state;
    }
};

export const PageAuthors = (state = authorsReducerObjectState, action) => {
    switch (action.type) {
        case 'GET_PAGE_AUTHORS':
            return action.data;
        default:
            return state;
    }
};