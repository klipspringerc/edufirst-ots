import React, {Component} from 'react';

const ProfileAnswers = ({answers}) => (
    <div>
      {answers.map(answer => (
          <div key={answer.id}>
            <div>{answer.question}</div>
            <div>{answer.answer}</div>
          </div>
      ))}
    </div>
);

const ProfileQuestions = ({questions}) => (
    <div>
      {questions.map(question => (
          <div key={question.id}>
            <div className="question">{question.question}</div>
            <div className="asked">
              Asked on {new Date(question.asked).toLocaleDateString()}
            </div>
            <div className="answers">{question.answers}</div>
          </div>
      ))}
    </div>
);

const ProfileTopics = ({topics}) => (
    <div>
      {topics.map(topic => (
          <div className="topic">{topic}</div>
      ))}
    </div>
);

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'answers',
    };
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  handleTabClick(tab) {
    this.setState({selected: tab});
  }

  renderActivities() {
    switch (this.state.selected) {
      case 'answers':
        return <ProfileAnswers answers={this.props.answers}/>;
      case 'questions':
        return <ProfileQuestions questions={this.props.questions}/>;
      case 'topics':
        return <ProfileTopics topics={this.props.topics}/>;
      default:
        return null;
    }
  }

  render() {
    const {picture, name, answers, questions, topics} = this.props;
    return (
        <div>
          <img src={picture}/>
          <div>{name}</div>
          <div onClick={() => this.handleTabClick('answers')}>
            Answers {answers.length}
          </div>
          <div onClick={() => this.handleTabClick('questions')}>
            Questions {questions.length}
          </div>
          <div onClick={() => this.handleTabClick('topics')}>
            Topics {topics.length}
          </div>
          {this.renderActivities()}
        </div>
    );
  }
}

export default Profile;