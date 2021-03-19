import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";

import PageTitle from "../../fragements/PageTitle";
import AuthorList from "./AuthorList";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPageAuthors } from '../../../actions/authorsAction';
import CreateAuthorModal from "./CreateAuthorModal";
import EditAuthorModal from "./EditAuthorModal";

class AuthorManagement extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authorPrm : {
        page: '',
        records_no: 10,
        modalVisible: false,
        modalMode:0,
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      createModalVisible: false,
      editModalVisible: false,
    });
  }

  componentDidMount() {
    this.handleInitList();
  }

  handleInitList = () => {
    this.setState({
      createModalVisible: false,
      editModalVisible: false
    });
    const {authorPrm} = this.state;
    authorPrm.page = 1;
    this.props.getPageAuthors(authorPrm);
  }

  handleReload() {
    const {authorPrm} = this.state;
    authorPrm.page = 1;
    this.props.getPageAuthors(authorPrm);
  }

  handleCreateAuthor() {
    this.setState({
      createModalVisible: true,
      editModalVisible:false
    });
  }

  handleEditAuthor(author) {
    this.setState({
      editModalVisible: true,
      createModalVisible:false,
      modalMode:1,
      author:author
    });
  }

  render() {
    return (<Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" subtitle="Author Management" className="text-sm-left" />
      </Row>
      {/* Default Light Table */}
      <Row>
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <Row form>
                <Col md="3" className="form-group">
                  <Button size="sm" theme="primary" className="mb-2 mr-1" onClick={this.handleCreateAuthor.bind(this)}>
                    Create New Author
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <AuthorList authorPrm={this.state.authorPrm} handleEditAuthor={this.handleEditAuthor.bind(this)}/>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <CreateAuthorModal handleReload={this.handleReload.bind(this)} modalVisible={this.state.createModalVisible}>
      </CreateAuthorModal>
      <EditAuthorModal author={this.state.author} handleReload={this.handleReload.bind(this)} modalVisible={this.state.editModalVisible}></EditAuthorModal>
    </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getPageAuthors: getPageAuthors }, dispatch);
}

export default connect(null, mapDispatchToProps)(AuthorManagement);