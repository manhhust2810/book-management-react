import axios, { requestConfig } from '../axios/axios';

// POSTS
const _getBooks = (data) => {
    return ({
        type: 'GET_BOOKS',
        data
    })
};

export const getBooks = (params = {
    page: '',
    records_no: '',
    created_at: '',
    title:'',
    author_id:'',
}) => {
    return async (dispatch) => {
        const result = await axios.get('book/book-list?page=' + params.page + '&records_no=' + params.records_no + '&created_at=' + params.created_at+'&title='+params.title+'&author_id='+params.author_id, requestConfig());
        let { data } = result.data;
        dispatch(_getBooks(data));
    };
};

export const createBook = (bookPrm) => {
    return async () => {
        return await axios.post('book/create-book', bookPrm, requestConfig()).then(result => {
            return result;
        });
    };
};

export const editBook = (bookPrm) => {
    return async () => {
        return await axios.put('book/edit-book', bookPrm, requestConfig()).then(result => {
            return result;
        });
    };
};

export const deleteBook = (params = {
    book_id: ''
}) => {
    return async (dispatch) => {
        const result = await axios.delete('book/delete-book?bookId=' + params.book_id, requestConfig());
        return result;
    };
};