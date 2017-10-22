import React from "react";
import Article from "../components/Article";
import CircleComp from '../components/layout/CircleComp';
import { Grid, Row, Col, Button } from 'react-bootstrap';

export default class Featured extends React.Component {
  constructor(){
    super();
    this.state = {
      temp: 50,
      humidity: 100,
      heartRate: 60,
    };
  }
  changeState() {
    var newtemp = parseInt(Math.random() * 45 + 5, 10);
    var newhumidty = parseInt(Math.random() * 101, 10);
    var newheartRate = parseInt(Math.random() * 121 + 30, 10);
    this.setState({
      temp: newtemp,
      humidity: newhumidty,
      heartRate: newheartRate,
    });
    console.log(this.state.color, this.state.percent);
  }

  render() {
    const Articles = [
      "Some Article",
      "Some Other Article",
      "Yet Another Article",
      "Still More",
      "Some Article",
      "Some Other Article",
      "Yet Another Article",
      "Still More",
      "Some Article",
      "Some Other Article",
      "Yet Another Article",
      "Still More",
    ].map((title, i) => <Article key={i} title={title}/> );

    const adText = [
      "Ad spot #1",
      "Ad spot #2",
      "Ad spot #3",
      "Ad spot #4",
      "Ad spot #5",
    ];
    const randomAd = adText[Math.round( Math.random() * (adText.length-1) )];
    console.log("featured");
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={4}>

                <CircleComp 
                    value={this.state.temp} 
                    max='51' 
                    min='5' 
                    
                    label1='Air Temperature'
                    label2='&deg;C' />

            </Col>

            <Col xs={6} md={4}>

                <CircleComp 
                    value={this.state.humidity} 
                    max='101' 
                    min='0' 
                    
                    label1='Humidity'
                    label2='%' />

            </Col>

            <Col xs={6} md={4}>

                <CircleComp 
                    value={this.state.heartRate} 
                    max='151' 
                    min='30' 
                    
                    label1='Heart Rate'
                    label2='bpm' />

            </Col>
          </Row>
        </Grid>
      <p>
            <button onClick={this.changeState.bind(this)}>Change State</button>
      </p>
        <div class="row">
          <div class="col-lg-12">
            <div class="well text-center">
              {randomAd}
            </div>
          </div>
        </div>

        <div class="row">{Articles}</div>
      </div>
    );
  }
}
