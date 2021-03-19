import React, { Component } from "react";
import { FormSelect } from "shards-react";
import { Row} from "shards-react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAuthors } from '../../../actions/authorsAction';

class AuthorsFilter extends Component {

    componentDidMount() {
        this.props.getAuthors();
    }

    loadAuthors(authors) {
        let list = [];
        authors&&authors.forEach((e,i) => {
            list.push(<option key={i} value={e.author_id}>{e.full_name}</option>)
        });
        return list;
    }

    handleChangeCategory = e => {
        const authorId = e.target.value;
        this.props.handleFilterAuthors&&this.props.handleFilterAuthors(authorId);
    }
    render() {
        // onChange = {this.handleChangeCategory.bind(this)}
        return (
            <Row className="pl-3 pr-3">
                <FormSelect size="sm" onChange = {this.handleChangeCategory.bind(this)}>
                    <option value="">all</option>
                    {this.loadAuthors(this.props.authors)}
                </FormSelect>
            </Row>
        );
    }
}
const mapSateToProps = (state) => {
    return {
        authors: state.authors
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getAuthors: getAuthors }, dispatch);
  }
  
  export default connect(mapSateToProps, mapDispatchToProps)(AuthorsFilter);