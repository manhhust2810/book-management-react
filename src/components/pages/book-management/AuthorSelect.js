import React, { Component } from "react";
import { Select } from 'antd';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAuthors } from '../../../actions/authorsAction';

const { Option } = Select;
class AuthorSelect extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.state = {
            authorsPrm:[]
        }
    }
    componentDidMount() {
        this.props.getAuthors();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.authorsPrm) {
            this.setState({
                authorsPrm:nextProps.authorsPrm
            })
        }
    }

    handleChange(authorIds) {
        this.props.handleGetAuthorIds&&this.props.handleGetAuthorIds(authorIds);
    }

    loadAuthors(authors) {
        let list = [];
        authors&&authors.map((e,i) => {
            list.push(<Option value={e.author_id} key={e.author_id} >{e.full_name}</Option>);
        })
        return list;
    }
    render() {
        return (
            <Select
                mode="multiple"
                allowClear
                size={'default'}
                placeholder="Please select"
                value={this.state.authorsPrm}
                onChange={this.handleChange}
                style={{ width: '95%' }}
                >
                {this.loadAuthors(this.props.authors)}
            </Select>
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
  
  export default connect(mapSateToProps, mapDispatchToProps)(AuthorSelect);