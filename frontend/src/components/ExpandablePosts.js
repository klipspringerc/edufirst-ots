import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import "../components/auxiliary_position.css"


const CardExampleExpandable = ({title, author, votes, topAnswer, questionId}) => (
    <Card>
        <CardHeader
            title={title}
            subtitle={author}
            actAsExpander={true}
            showExpandableButton={true}
        />
        <CardActions>
            <FlatButton className="text-right" label={votes}/>
            <FlatButton label="View Original"><Link to={`/questions/${questionId}`}>{topAnswer}</Link></FlatButton>>
        </CardActions>
        <CardText expandable={true}>
            {topAnswer}
        </CardText>
        <div style={{height:20}} />
    </Card>
);



CardExampleExpandable.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    votes : PropTypes.string.isRequired,
    topAnswer: PropTypes.string,
    questionId: PropTypes.number.isRequired,
};

export default CardExampleExpandable;
