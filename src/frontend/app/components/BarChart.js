import React from "react";
import moment from 'moment';
import { connect } from 'react-redux'
import { mapRange } from '../helpers/helpers'
import {returnFillColor, returnBorderColor} from "../helpers/helpers.js";

import "../css/TrendChartSVG.scss";

const mapStateToProps = state => {
  return { windowWidth: state.windowWidth }
}

class ReduxBarChart extends React.Component {
  constructor(props) {
    super()

    this.state = {
      tooltip: null,
      tooltipRect: null
    }
  }

  tooltipRef = (element) => {
    if (element) {
      this.setState({
        tooltipRect: element.getBBox()
      })
    }
  }

  handleHover = (point) => (e) => {
    if(point) {
      this.setState({
        tooltip: point
      })
    } 

    else {
     this.setState({
        tooltip: null
      })
    }
  }
 
  chart = (scores, timestamps) => {
    let ratio = .2
    let width = typeof this.state.windowWidth != 'undefined' ? this.state.windowWidth : window.innerWidth
    let height = width * ratio

    let chartStyle = {
      minHeight: height
    }

    let bars = scores.map( (score, index) => {
      let padding = (width / scores.length) * .35
      let rectWidth = (width / scores.length)
      let rectHeight = mapRange(score, 0, 100, 0, height);

      let y = height - rectHeight
      let x = index * rectWidth
      let displayLabel = moment(timestamps[index]).format('MMM D')

      let point = { x: x + (rectWidth / 2), y, displayLabel, score }

      return (  
        <g 
          onMouseOver={ this.handleHover(point) }
          onMouseOut={ this.handleHover(null) } >
  
          <rect
            x={ x + (padding / 4) }
            y={ y }
            width={ (rectWidth - (padding / 2)) }
            height={ rectHeight - 30 }
            fill={ returnFillColor(score) }
            strokeWidth={ timestamps.length > 30 ? 0 : 1 }
            stroke={ returnBorderColor(score) }
            key={'bar-' + index}
          />
          
          { timestamps.length < 32 &&   
            <text
              x={x + (rectWidth / 2) }
              y={ score >= 75 ? (y + 25) : (y - 10) }
              textAnchor="middle"
              className="score"
              fill={ returnBorderColor(score) }
              fontSize={ timestamps.length > 14 ? '16px' : '24px' }>
            { score }
            </text> 
          }
         </g>
        )}
    )

    let labels = scores.map( (score, index) => {
      let displayLabel = moment(timestamps[index]).format('MMM D')
      let rectWidth = (width / scores.length)
      let x = index * rectWidth
      let centerX = x + (rectWidth / 2)

        return (
          <text 
            x={ centerX }
            y={ height - 10 }
            fill="dimgrey"
            fontSize="12px"
            textAnchor={ centerX < 25 ? 'start' : (centerX > width - 25 ? 'end' : 'middle') }
            key={ 'label-' + index} >
            { scores.length < 30 ? displayLabel : (index % 30 === 0 ? displayLabel : null) }
          </text>
        )
    })

     return (
      <div className="chart-container" style={chartStyle}>
        <svg height={ height } width="100%" className="chart-svg" viewBox={"0 0 " + width + " " + height} preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          { bars }
          { labels }

          { this.state.tooltip && this.props.scores.length > 31 &&
              <g>
                { this.state.tooltipRect && 
                  <rect
                    x={ this.state.tooltipRect.x - 10 }
                    y={ this.state.tooltipRect.y - 8 }
                    rx="5"
                    ry="5"
                    width={ this.state.tooltipRect.width + 20 }
                    height={ this.state.tooltipRect.height + 16 }
                    fill="black"
                    stroke="white"
                    strokeWidth="2"
                  />
                }

                <text
                  ref={ this.tooltipRef }
                  x={ this.state.tooltip.x + 50 > width ? width - 50 : (this.state.tooltip.x - 50 < 0 ? 50 : this.state.tooltip.x) }
                  y={ this.state.tooltip.y - 25 <= 0 ? 25 : this.state.tooltip.y - 25 }
                  textAnchor="middle"
                  fill="white" >
                    { this.state.tooltip.displayLabel}: { this.state.tooltip.score } 
                </text>
              </g>
            }
        </svg>
      </div>
    )
  }
 
  render () {
    let chart = this.chart(this.props.scores, this.props.timestamps) 

    return (
      <div className="bar-chart">
        { chart }
      </div>
    )
  }
}

const BarChart = connect(mapStateToProps)(ReduxBarChart)

export default BarChart
