import React, { Component } from "react";
import { Modal,Form, Input, Radio,notification } from 'antd';
import { Row, Col, Button } from "shards-react";
import AuthorSelect from "./AuthorSelect";
import BookImage from "./BookImage";
import { createBook,editBook } from '../../../actions/booksAction';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const FormItem = Form.Item;

class CreateBookModal extends Component {

    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: this.props.modalVisible,
            authors:[],
            image:'',
            enabled:1,
            book_id:'',
            title:'',
            description:'',
        }
        this.onFinish = this.onFinish.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {modalVisible} = nextProps;
        this.setState({
          modalVisible: modalVisible
        })
        let nameList = ["title","description"];
        this.formRef.current&&this.formRef.current.resetFields(nameList);
        this.setState({
            authors:[],
            image:'',
            enabled:1,
            book_id:'',
            title:'',
            description:'',
        })
    }

    handleOk = e => {
        console.log(e);
        this.setState({
        modalVisible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            modalVisible: false,
        });
    };
    
    handleGetAuthorIds = (authorIds) => {
        this.setState({
            authors:authorIds
        })
    }

    handleGetImg = (image) => {
        this.setState({
            image:image
        })
    }

    onFinish = ({ errorFields }) => {
        let bookPrm = this.formRef.current.getFieldValue();
        bookPrm['image'] = this.state.image;
        bookPrm['authors'] = this.state.authors;
        bookPrm['enabled'] = this.state.enabled;
        this.props.createBook(bookPrm).then((result) => {
            notification.success({
                message: 'Book Management',
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
       
    };

    onChangeEnabled = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          enabled: e.target.value,
        });
      };

    render() {
        return (
            <Modal
                title='Create Book'
                visible={this.state.modalVisible}
                footer={null}
                onCancel={this.handleCancel}
              >
                <Form ref={this.formRef} onFinish={this.onFinish} >
                    <FormItem name="title" initialValue={this.state.title} rules={[{ required: true, message: 'Please input book title!' }]} >
                        <Input
                            size="large"
                            name="title"
                            placeholder="Title"
                            defaultValue={this.state.title}
                            />
                    </FormItem>
                    <FormItem name="description" initialValue={this.state.description} rules={[{ required: true, message: 'Please input book description!' }]}>
                        <Input
                            size="large"
                            name="description"
                            placeholder="Description"
                            defaultValue={this.state.description}
                            />
                    </FormItem>
                    <FormItem name="enabled" rules={[{ required: false }]}>
                        <Radio.Group onChange={this.onChangeEnabled} defaultValue={1} value={this.state.enabled}>
                            <Radio value={1}>Enabled</Radio>
                            <Radio value={0}>Disabled</Radio>
                        </Radio.Group>
                    </FormItem>
                    <FormItem name="authors" rules={[{ required: false, message: 'Please select authors!' }]}>
                        <strong className="text-muted d-block my-2">
                        Authors
                        </strong>
                        <AuthorSelect authorsPrm={this.state.authors} handleGetAuthorIds={this.handleGetAuthorIds}></AuthorSelect>
                    </FormItem>
                    <FormItem name="image" rules={[{ required: false}]}>
                        <BookImage imageUrl={this.state.image} handleGetImg={this.handleGetImg}></BookImage>
                    </FormItem>
                    <Row>
                        <Col>
                            <Button outline htmlType="submit" theme="primary" className="mb-2 mr-1 float-right">
                                Save
                            </Button>
                            <Button outline htmlType="" onClick={this.handleCancel} theme="dark" className="mb-2 mr-1 float-right">
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}
const mapSateToProps = (state) => {
    return {
      authors: state.authors
    }
  }
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ createBook: createBook,editBook:editBook}, dispatch);
  }
  
export default connect(mapSateToProps, mapDispatchToProps)(CreateBookModal);