import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Chart} from 'react-d3-core';
// require `react-d3-basic` for Line chart component.
import {LineChart} from 'react-d3-basic';
import io from 'socket.io-client';
import d3Time from 'd3-time';

const socket = io.connect('http://localhost:3030');
/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

class SampleChart extends Component {

	constructor(props) {
		super(props);
		this.state = {
			level1 : [],
			level2 : [],
			level3 : []
		};
		socket.on('initGraphResponse', function(payload){
			if(payload){
				console.log('payload : ' , payload);
				for(let category in payload) {
					switch(category){
						case 'Level1':
							this.setState({
								level1 : payload[category],
							})
						break;
						case 'Level2':
							this.setState({
								level2 : payload[category]
							})
						break;
						case 'Level3':
							this.setState({
								level3 : payload[category]
							})
						break;
						default:
							console.log('Invalid Category');
						break;
					}
				}
			}
		}.bind(this));

		socket.on('updateCategoryGraph', function(payload){
			switch(payload.category){
				case 'Level1':
					if(this.state.level1){
						const levelData = this.state.level1;
						levelData.push(payload.meterReading);
						this.setState({
							level1 : levelData
						})
					}
					else{
						this.setState({
							level1 : [payload.meterReading]
						})	
					}
				break;
				case 'Level2':
					if(this.state.level2){
						const levelData = this.state.level2;
						levelData.push(payload.meterReading)
						this.setState({
							level2 : levelData
						})
					}
					else{
						this.setState({
							level2 : [payload.meterReading]
						})	
					}
				break;
				case 'Level3':
					if(this.state.level3){
						const levelData = this.state.level3;
						levelData.push(payload.meterReading)
						this.setState({
							level3 : levelData
						})
					}
					else{
						this.setState({
							level3 : [payload.meterReading]
						})	
					}
				break;
				default:
					console.log('Invalid Category');
				break;
			}
		}.bind(this));
	}

	componentDidMount() {
		var randomScalingFactor = function(){ return Math.round(Math.random()*1000)};

		socket.emit('initGraphs');

		setInterval(function(){
			let meterReading ={};
			meterReading.category = 'Level1';
			meterReading.total = randomScalingFactor();
			socket.emit('addMeterReading', meterReading);
			meterReading.category = 'Level2';
			meterReading.total = randomScalingFactor();
			socket.emit('addMeterReading', meterReading);
			meterReading.category = 'Level3';
			meterReading.total = randomScalingFactor();
			socket.emit('addMeterReading', meterReading);
		}.bind(this), 15000)
	}

    render() {
    	var width = 900,
		    height = 300,
		    margins = {left: 100, right: 100, top: 50, bottom: 50},
		    title = "User sample",
		    chartSeries = [
		      {
		        field: 'total',
		        name: 'MeterReadings',
		        color: '#000'
		      }
		    ],
		    x = function(d) {
		      return new Date(d.createdAt).getHours() + new Date(d.createdAt).getMinutes()/60;
		    }
        return (
        		<div>
        			<h3>Level1</h3>
			      <LineChart
			        margins= {margins}
			        title={title}
			        data={this.state.level1 || []}
			        width={width}
			        height={height}
			        chartSeries={chartSeries}
			        x={x}
			      />
			      <h3>Level2</h3>
			      <LineChart
			        margins= {margins}
			        title={title}
			        data={this.state.level2 || []}
			        width={width}
			        height={height}
			        chartSeries={chartSeries}
			        x={x}
			      />
			      <h3>Level3</h3>
			      <LineChart
			        margins= {margins}
			        title={title}
			        data={this.state.level3 || []}
			        width={width}
			        height={height}
			        chartSeries={chartSeries}
			        x={x}
			      />
			     </div>
        );
    }
}

// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
    return {
        // socket : state.socket,
        level1 : state.level1,
        level2 : state.level2,
        level3 : state.level3
    };
}

export default connect(mapStateToProps)(SampleChart);