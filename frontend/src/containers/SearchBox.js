import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Button, Form, FormControl, FormGroup, Input} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Subject} from 'rxjs';
import {search} from '../actions/search';

class SearchBox extends Component {

  static propTypes = {
    handleSearch: PropTypes.func.isRequired,
    searchQuery: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.handleChangeSubject = new Subject();
    this.handleChangeSubject.debounceTime(200)
        .subscribe(this.handleChange);
    this.handleChangeSubject.next(this.props.searchQuery);
  }

  handleChange(text) {
    this.props.handleSearch(text);
  }

  render() {
    return (
        <Form inline className='navbar-form' action=""
              onSubmit={e => {e.preventDefault();}}>
          <FormGroup>
            <FormControl className="form-control form-control-lg"
                         style={{width: 300}} type="text"
                         placeholder="Ask me anything..."
                         onChange={e => this.handleChangeSubject
                             .next(e.target.value)}
                         defaultValue={this.props.searchQuery}/>
          </FormGroup>
          <Button bsStyle='success' type='submit'>Search</Button>
        </Form>
    );
  }
}

const mapStateToProps = ({searchQuery}) => ({
  searchQuery: searchQuery.searchQuery,
});

const mapDispatchToProps = dispatch => ({
  handleSearch: text => dispatch(search({keywords: text, offset: 0})),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);