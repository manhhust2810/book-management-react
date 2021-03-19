/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import { Space, Pagination,Popover } from "antd";
import {
  Row,
  Col
} from "shards-react";
import { Popconfirm,notification } from 'antd';
import { Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getBooks,deleteBook } from '../../../actions/booksAction';

class BookList extends Component {

  constructor(props) {
    super(props);
    this.handleLoadPage = this.handleLoadPage.bind(this);
  }

  handleLoadPage(page) {
    const {bookPrm} = this.props;
    bookPrm.page = page;
    this.props.getBooks(bookPrm);
  }
 
  handleChangePage = page => {
    this.handleLoadPage(page);
  }

  more = (text,key) => {
    return <Popover key={key} style={{width:200}} placement="topLeft" content={text}>
        <span className="more-text">...</span>
    </Popover>;
  }
  handleShowText = (text,maxSize, key) => {
    return (text&&text.length>maxSize)?<span>{[text.substring(0,maxSize-3),this.more(text,key)]}</span>:text;
  }
  handleLoadData = (list,page_of_list) => {
    const records = [];
    const {records_no} = this.props.bookPrm;
    let startIndex = records_no*(page_of_list-1)+1;
    {list&&list.map((e,i) => {
      let bookId = e.book_id;
      let title = this.handleShowText(e.title,15,i);
      let authors = this.handleShowText(e.authors.map(e => ' '+e.full_name).toString(),30,i);
      let description = this.handleShowText(e.description,30,i);
      let createUser = this.handleShowText(e.create_user,30,i);
      let createAt = this.handleShowText(e.created_at,20,i);
      let updateAt = this.handleShowText(e.updated_at,20,i);
      let status = this.handleShowText(e.status,20,i);
      records.push(
        <tr key={bookId}>
          <th scope="row">{startIndex++}</th>
          <td>{title}</td>
          <td>{authors}</td>
          <td>{description}</td>
          <td>{createUser}</td>
          <td>{createAt}</td>
          <td>{updateAt}</td>
          <td>{status}</td>
          <td className="posts-action">
            <Space size="middle">
              <EditOutlined onClick={() => this.handleEdit(e)}/>
              <Popconfirm
                  placement="left"
                  title={"Are you sure to delete this book?"}
                  onConfirm={() => this.handleDelete(bookId)}
                  okText="Yes"
                  cancelText="No"
                >
                <DeleteOutlined />
              </Popconfirm>
            </Space>
          </td>
        </tr>
      )
    })};
    return records;
  }

  handleEdit = (book) => {
    this.props.handleEditBook(book);
  }

  handleDelete = (bookId) => {
    const param = {book_id:bookId};
    this.props.deleteBook(param).then((result) => {
      this.handleLoadPage(1);
      notification.success({
        message: 'Author Management',
        description: result.data.message
      });
      window.location.reload(false);
    }).catch(function (error) {
      if(error.response.status == 401) {
        notification.warning({
            message: 'Book Management',
            description: 'You have not permission to access, please login to use !'
        })
      } else {
        notification.warning({
            message: 'Book Management',
            description: 'An eror orrcured'
        })
      }
    });
    
  }
  render() {
    const {list,page_of_list,total_records} = this.props.books;
    const {records_no} = this.props.bookPrm;
    return (
      <>
        <Row>
          <Col lg="12" md="12">
            <div className="table-responsive p-2">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">#</th>
                    <th scope="col" className="border-0">Title</th>
                    <th scope="col" className="border-0">Authors</th>
                    <th scope="col" className="border-0">Description</th>
                    <th scope="col" className="border-0">Create User</th>
                    <th scope="col" className="border-0">Create At</th>
                    <th scope="col" className="border-0">Update At</th>
                    <th scope="col" className="border-0">Status</th>
                    <th scope="col" className="border-0">Image</th>
                  </tr>
                </thead>
                <tbody>
                  {this.handleLoadData(list,page_of_list)}
                </tbody>
              </table>
              <Pagination className="mt-3" onChange={this.handleChangePage} defaultPageSize={records_no} current={page_of_list} total={total_records} />
            </div>
          </Col>
        </Row>
      </>
    );
  }
}

const mapSateToProps = (state) => {
  return {
    books: state.books
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getBooks: getBooks,deleteBook:deleteBook }, dispatch);
}

export default connect(mapSateToProps, mapDispatchToProps)(BookList);