import { search, showSearchBox, hideSearchBox } from './search';
import toggleFold from './toggle-fold';
import topTrendingQuestions from './top-trending-questions';

const reducers = [search, toggleFold, topTrendingQuestions, showSearchBox, hideSearchBox];
export default reducers;