import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardText,
  CardTitle,
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import React from 'react';
import '../components/auxiliary_position.css';

export default class CardExampleControlled extends React.Component {

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };
  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };
  handleExpand = () => {
    this.setState({expanded: true});
  };
  handleReduce = () => {
    this.setState({expanded: false});
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  render() {
    const {result} = this.props;
    return (
        <Card expanded={this.state.expanded}
              onExpandChange={this.handleExpandChange}>
          <CardHeader
              title={result.title}
              actAsExpander={true}
              showExpandableButton={true}
          />
          <CardText>
            <Toggle
                toggled={this.state.expanded}
                onToggle={this.handleToggle}
                labelPosition="right"
                label="Toggle to view the answer instantly!"
            />
          </CardText>
          <CardMedia
              expandable={true}
              overlay={<CardTitle title="" subtitle=""/>}
          >
            <img src={result.img.src} alt={result.img.alt}/>
          </CardMedia>
          <CardTitle title={result.title} subtitle="" expandable={true}
                     style={{color: '#6dfaff', height: '200px'}}/>
          <CardText expandable={true}>
            {result.text}
          </CardText>
          <CardActions>
            <FlatButton label="Expand" onClick={this.handleExpand}/>
            <FlatButton label="Reduce" onClick={this.handleReduce}/>
          </CardActions>
        </Card>
    );
  }
}
