import axios, {requestConfig}  from '../axios/axios';

const _getAuthors = (data) => {
    return ({
    type: 'GET_AUTHORS',
    data
})};

export const getAuthors = () => {
    return async (dispatch) => {
        return axios.get('author/author-list',requestConfig()).then(result => {
            let {data} = result.data;
            dispatch(_getAuthors(data));
        });
    };
};

const _getPageAuthors = (data) => {
    return ({
        type: 'GET_PAGE_AUTHORS',
        data
    })
};

export const getPageAuthors = (params = {
    page: '',
    records_no: '',
}) => {
    return async (dispatch) => {
        const result = await axios.get('author/author-page-list?page='+ params.page + '&records_no=' + params.records_no, requestConfig());
        let { data } = result.data;
        dispatch(_getPageAuthors(data));
    };
};

export const createAuthor = (authorPrm) => {
    return async () => {
        return await axios.post('author/create-author', authorPrm, requestConfig()).then(result => {
            return result;
        });
    };
};

export const editAuthor = (authorPrm) => {
    return async () => {
        return await axios.put('author/edit-author', authorPrm, requestConfig()).then(result => {
            return result;
        });
    };
};

export const deleteAuthor = (params = {
    author_id: ''
}) => {
    return async (dispatch) => {
        const result = await axios.delete('author/delete-author?authorId=' + params.author_id, requestConfig());
        return result;
    };
};


