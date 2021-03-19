import React, { Component } from "react";
import { Modal,Form, Input, notification } from 'antd';
import { Row, Col, Button } from "shards-react";
import AuthorAvatar from "./AuthorAvatar";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createAuthor,editAuthor } from '../../../actions/authorsAction';
const FormItem = Form.Item;
class CreateAuthorModal extends Component {
    
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: this.props.modalVisible,
            authorPrm:{
                author_id:'',
                full_name:'',
                description:'',
                avatar:''
            }
        }
        this.onFinish = this.onFinish.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const {modalVisible} = nextProps;
        let nameList = ["fullName","description"];
        this.formRef.current&&this.formRef.current.resetFields(nameList);
        this.setState({
            modalVisible:modalVisible,
            avatar:''
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

    handleGetAvatar = (avatar) => {
        this.setState({
            avatar:avatar
        })
    }

    onFinish = ({ errorFields }) => {
        let authorPrm = this.formRef.current.getFieldValue();
        authorPrm['avatar'] = this.state.avatar;
        this.props.createAuthor(authorPrm).then((result) => {
            notification.success({
                message: 'Book Management',
                description: result.data.message
            });
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
            window.location.reload(false);
    };

    render() {
        return (
            <Modal
                title='Create Author'
                visible={this.state.modalVisible}
                footer={null}
                onCancel={this.handleCancel}
              >
                <Form ref={this.formRef} onFinish={this.onFinish} >
                    <FormItem name="fullName" initialValue={this.state.authorPrm.full_name} rules={[{ required: true, message: 'Please input author name!' }]} >
                        <Input
                            size="large"
                            name="fullName"
                            placeholder="Full Name" 
                            defaultValue={this.state.authorPrm.full_name}/>
                    </FormItem>
                    <FormItem name="description" initialValue={this.state.authorPrm.description} rules={[{ required: true, message: 'Please input author description!' }]}>
                        <Input
                            size="large"
                            name="description"
                            placeholder="Description"
                            defaultValue={this.state.authorPrm.description}/>
                    </FormItem>
                    <FormItem>
                        <AuthorAvatar imageUrl={this.state.avatar} handleGetAvatar={this.handleGetAvatar}></AuthorAvatar>
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
    return bindActionCreators({ createAuthor: createAuthor,editAuthor:editAuthor}, dispatch);
  }
  
export default connect(mapSateToProps, mapDispatchToProps)(CreateAuthorModal);