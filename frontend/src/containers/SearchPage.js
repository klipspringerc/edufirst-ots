import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {clearSearchResults, showSearchBox} from '../actions/search';
import {fetchTopTrendingQuestions} from '../actions/top-trending-questions';
import TopTrendingQuestions from '../components/TopTrendingQuestions';

class SearchPage extends Component {
  static propTypes = {
    handleFetchTopTrendingQuestions: PropTypes.func.isRequired,
    handleShowSearchBox: PropTypes.func.isRequired,
    handleClearSearchResults: PropTypes.func.isRequired,
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

  componentWillUnmount() {
    this.props.handleClearSearchResults();
  }

  renderTopTrendingQuestions() {
    const {loading, topTrendingQuestions} = this.props;
    return (
        <TopTrendingQuestions loading={loading}
                              questions={topTrendingQuestions}/>
    );
  }

  render() {
    return this.renderTopTrendingQuestions();
  }
}

const mapStateToProps = ({topTrendingQuestions}) => {
  return ({
    loading: topTrendingQuestions.loadingTopTrendingQuestions,
    topTrendingQuestions: topTrendingQuestions.topTrendingQuestions,
  });
};
const mapDispatchToProps = dispatch => ({
  handleFetchTopTrendingQuestions: () => dispatch(fetchTopTrendingQuestions()),
  handleShowSearchBox: () => dispatch(showSearchBox()),
  handleClearSearchResults: () => dispatch(clearSearchResults()),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);