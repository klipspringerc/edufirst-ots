import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTopTrendingQuestions } from '../actions/top-trending-questions';
import TopTrendingQuestions from '../components/TopTrendingQuestions';
import { showSearchBox } from '../actions/search';

class SearchPage extends Component {
  static propTypes = {
    handleFetchTopTrendingQuestions: PropTypes.func.isRequired,
    handleShowSearchBox: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    topTrendingQuestions: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })).isRequired,
  };

  componentDidMount() {
    this.props.handleFetchTopTrendingQuestions();
    this.props.handleShowSearchBox();
  }

  renderTopTrendingQuestions() {
    const { loading, topTrendingQuestions } = this.props;
    return (
      <TopTrendingQuestions loading={loading}
        questions={topTrendingQuestions} />
    );
  }

  render() {
    return this.renderTopTrendingQuestions();
  }
}

const mapStateToProps = state => {
  return ({
    loading: state.loadingTopTrendingQuestions,
    topTrendingQuestions: state.topTrendingQuestions,
  });
}
const mapDispatchToProps = dispatch => ({
  handleFetchTopTrendingQuestions: () => dispatch(fetchTopTrendingQuestions()),
  handleShowSearchBox: () => dispatch(showSearchBox())
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);