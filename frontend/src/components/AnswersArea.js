import {FlatButton} from 'material-ui';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import PropTypes from 'prop-types';
import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {putLike} from '../actions/likes';

const AnswersArea = ({answers, handlePutLike}) => (
    <div>
      {answers.map((answer, index) => (
          <Row className="col-md-10" key={index}>
            <Col xsOffset={4} className="col-centered">
              <Card style={{width: '100%', height: '30%'}}>
                <CardHeader
                    title={answer.author.username}
                    subtitle={(answer.author.certificate)
                        ? answer.author.certificate
                        : 'No certificate'}
                    actAsExpander={true}
                    showExpandableButton={true}/>
                <CardText expandable={true}>
                  <div className="body">{answer.body}</div>
                </CardText>
                <CardActions>
                  <FlatButton label={answer.votes_total}
                              onClick={(answer) => (answer.votes_total += 1)}/>
                </CardActions>
              </Card>
            </Col>
            <div style={{height: 20}}/>
          </Row>
      ))}
    </div>
);

AnswersArea.propTypes = {
  answers: PropTypes.array.isRequired,
  handlePutLike: PropTypes.func.isRequired,
};
const mapDispatchToProps = (dispatch) => ({
  handlePutLike: answerId => dispatch(putLike(answerId)),
});
export default connect(null, mapDispatchToProps)(AnswersArea);
//export default AnswersArea;
/*
<div key={answer.id}>
            <div className="user">{answer.author.username}</div>
            <div className="certificate">{answer.author.certificate}</div>
            <div className="answer-detail">{answer.body}</div>
            <div className="horizontal-rule"/>
            <div className="likes">{answer.votes_total}</div>
            <div style={{height:20}}/>
            {/*<CommentArea likes={answer.votes_total}* /}
            {/*comments={answer.comments}* /}
            {/*answerId={answer.id}/>* /}
          </div>
*/