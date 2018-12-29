import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { mapRange } from '../helpers/helpers'

import "../css/LineChart.scss";

const mapStateToProps = state => {
  return { windowWidth: state.windowWidth }
}

class ReduxLineChart extends React.Component {
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

    let minScore = Math.min(...scores)
    let maxScore = Math.max(...scores)
    let length = scores.length

    let points = scores.map((score, index) => {
      let y = height - mapRange(score, minScore - 10, maxScore + 10, 0, height)
      let x = ((width / scores.length) * index) + ((width / scores.length) / 2)

      return (
        {
          x: x,
          y: y,
          score: score,
          label: timestamps[index],
          timestamp: timestamps[index],
          displayLabel: moment(timestamps[index]).format('MMM D')
        }
      )
    })

    if (points.length > 0) {
      let path = `M${points[0].x} ${points[0].y} `

      path += points.slice(1).map(point => {
        return `L${point.x} ${point.y} `
      })

      let lastScore = 0;

      scores = points.map( (point, index) => {
        if (index === 0) lastScore = point.score
        
        let diffScore = point.score - lastScore
        lastScore = point.score

        return (
          (length < 30) ?
            <g 
              onMouseOver={ this.handleHover(point) }
              onMouseOut={ this.handleHover(null) } >
              
              <circle
                cx={ point.x } 
                cy={ point.y }
                r="17"
                stroke="#949494"
                strokeWidth="3"
                fill="black">
              </circle>
              
              <text 
                x={ point.x } 
                y={ point.y + 1 } 
                textAnchor="middle"
                alignmentBaseline="middle"
                key={ 'score-' + index} 
                fill={ diffScore >= 0 ? 'rgba(0,235,0,1)' : 'rgba(235,0,0,1)' } 
                fontSize={length > 30 ? "12px" : "15px"}>

                { diffScore > 0 ? "+" : null}{ diffScore != 0 ? diffScore : "0" }
              </text>
            </g>
          : 
            <g 
              onMouseOver={ this.handleHover(point) }
              onMouseOut={ this.handleHover(null) } >
             
              <circle
                cx={ point.x } 
                cy={ point.y }
                r="2"
                fill="white">
              </circle>
              
              <text 
                x={ point.x } 
                y={ diffScore > 0 ? point.y - 8 : point.y + 14 } 
                textAnchor="middle"
                key={ 'score-' + index} 
                fill={ diffScore >= 0 ? 'rgba(0,235,0,1)' : 'rgba(235,0,0,1)' } 
                fontSize={length > 30 ? "12px" : "15px"}>

                { diffScore > 0 ? "+" : null}{ diffScore != 0 ? diffScore : null }
              </text>
            </g>
          )
      })

      let labels = points.map( (point, index) => {
        let displayLabel = moment(point.label).format('MMM D')

        return (
          <text 
            x={ point.x }
            y={ height - 10 }
            fill="dimgrey"
            fontSize="12px"
            textAnchor={ point.x < 25 ? 'start' : (point.x > width - 25 ? 'end' : 'middle') }
            key={'label' + index}>
            { points.length < 30 ? displayLabel : (index % 30 === 0 ? displayLabel : null) }
          </text>
        )
      })

      let chartStyle = {
        minHeight: height
      }

      return (    
        <div className="chart-container" style={chartStyle} >
          <svg height={ height } width="100%" className="chart-svg" viewBox={"0 0 " + width + " " + height} preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
            <path
              d={ path }
              className="comp-path"
              fill="none"
              strokeLinejoin="round"
              strokeWidth="3"
              stroke="#949494"
              vectorEffect="non-scaling-stroke"
              />
            { scores }
            { labels }
         
            { this.state.tooltip &&
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
                  y={ this.state.tooltip.y - 35 <= 0 ? 35 : this.state.tooltip.y - 35 }
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
  }

  render () {
    let chart = this.chart(this.props.scores, this.props.timestamps)
    
    return (
      <div className="line-chart">
        { chart }
      </div>
    )
  }

}

const LineChart = connect(mapStateToProps)(ReduxLineChart)

export default LineChart
