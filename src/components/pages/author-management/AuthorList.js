/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import { Space, Pagination,Popover } from "antd";
import {
  Row,
  Col
} from "shards-react";
import { Popconfirm,notification } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPageAuthors,deleteAuthor } from '../../../actions/authorsAction';

class AuthorList extends Component {

  constructor(props) {
    super(props);
    this.handleLoadPage = this.handleLoadPage.bind(this);
  }

  handleLoadPage(page) {
    const {authorPrm} = this.props;
    authorPrm.page = page;
    this.props.getPageAuthors(authorPrm);
  }
 
  handleChangePage = page => {
    this.handleLoadPage(page);
  }

  more = (text,key) => {
    return <Popover key={key} style={{width:200}} placement="topLeft" content={text}>
        <span className="more-text">...</span>
    </Popover>;
  }
  
  handleLoadData = (list,page_of_list) => {
    const records = [];
    const {records_no} = this.props.authorPrm;
    let startIndex = records_no*(page_of_list-1)+1;
    {list&&list.map((e,i) => {
      let authorId = e.author_id;
      let fullName = e.full_name;
      let description = e.description;
      records.push(
        <tr key={authorId}>
          <th scope="row">{startIndex++}</th>
          <td>{fullName}</td>
          <td>{description}</td>
          <td className="posts-action">
            <Space size="middle">
              <EditOutlined onClick={() => this.handleEdit(e)}/>
              <Popconfirm
                  placement="left"
                  title={"Are you sure to delete this author?"}
                  onConfirm={() => this.handleDelete(authorId)}
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

  handleEdit = (author) => {
    this.props.handleEditAuthor(author);
  }

  handleDelete = (authorId) => {
    const param = {author_id:authorId};
    this.props.deleteAuthor(param).then((result) => {
      this.handleLoadPage(1);
      notification.success({
        message: 'Author Management',
        description: result.data.message
      });
      window.location.reload(false);
    }).catch(function (error) {
      if(error.response.status == 401 || error.response.status == 403) {
        notification.warning({
            message: 'Book Management',
            description: 'You have not permission to access, please login with admin to use !'
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
    const {list,page_of_list,total_records} = this.props.pageAuthors;
    const {records_no} = this.props.authorPrm;
    return (
      <>
        <Row>
          <Col lg="12" md="12">
            <div className="table-responsive p-2">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">#</th>
                    <th scope="col" className="border-0">Full Name</th>
                    <th scope="col" className="border-0">Description</th>
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
    pageAuthors: state.pageAuthors
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getPageAuthors: getPageAuthors,deleteAuthor:deleteAuthor }, dispatch);
}

export default connect(mapSateToProps, mapDispatchToProps)(AuthorList);