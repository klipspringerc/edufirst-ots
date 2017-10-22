import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import {Card, CardHeader, CardMedia, CardText, CardActions} from 'material-ui/Card';
import {Button, Form, FormControl, FormGroup, Input} from 'react-bootstrap';
import {MenuItem, Nav, Navbar, NavDropdown, NavItem, Row, Col} from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import {IconButton, FlatButton} from 'material-ui';
import '../components/auxiliary_position.css'

const QuestionDetail = ({questionId, title, body, allowAddingAnswer}) => (
    <Row className="col-md-10">
      <Col xsOffset={4} className="col-centered" >
      <Card style={{width: '100%', height: '30%'}}>
        <CardHeader 
          title={title}
          actAsExpander={true}
          showExpandableButton={true}/>
        <CardText expandable={false }>
            <div className="body">{body}</div>
        </CardText>
        <CardActions>
          <Link to={allowAddingAnswer
            ? `/questions/${questionId}/editAnswer`
            : '/login'}>
            <RaisedButton label={allowAddingAnswer
              ? 'Add Answer'
              : 'Login to Add Answer'} primary={true} linkButton={true}/>
          </Link>
        </CardActions>
      </Card>
      </Col>
      <div style={{height:20}}/>
    </Row>
    
);

QuestionDetail.propTypes = {
  questionId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  allowAddingAnswer: PropTypes.bool.isRequired,
};

export default QuestionDetail;

/*


<Link to={allowAddingAnswer
            ? `/questions/${questionId}/editAnswer`
            : '/login'}>
          <Button pullRight bsStyle="primary">{allowAddingAnswer
              ? 'Add Answer'
              : 'Login to Add Answer'}</Button>
        </Link>


<button>{allowAddingAnswer
                ? 'Add Answer'
                : 'Login to Add Answer'}</button>


<div className='middle-row col-md-12' style={{width: '50%', margin: '0 auto'}}>
    </div>


<div className="question-detail">
      <div className="title">{title}</div>
      <div className="body">{body}</div>
      <Link to={allowAddingAnswer
          ? `/questions/${questionId}/editAnswer`
          : '/login'}>
        <button>{allowAddingAnswer
            ? 'Add Answer'
            : 'Login to Add Answer'}</button>
      </Link>
    </div>
*/