import { combineReducers } from "redux";
import {
        Books,
    } from './booksReducer';
import {Authors,PageAuthors} from './authorsReducer';
import {
        AccessToken,
        CurrentUser
    } from './userReducer';

const allReducers = combineReducers({
    authors:Authors,
    pageAuthors:PageAuthors,
    books: Books,
    accessToken: AccessToken,
    currentUser: CurrentUser
});

export default allReducers;