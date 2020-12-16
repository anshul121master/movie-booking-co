import React, { Component } from 'react' 
import "./pageNotFound.scss"
import { Link } from "react-router-dom";

export default class PageNotFound extends Component{
constructor(props){
  super(props)
  this.container = null;
  this.ghostEyes = null;
  this.setContainer = element =>{
    this.container = element
  }
  this.setGhostEyes = element =>{
    this.ghostEyes = element
  }
}
  handleMotion = (event) =>{
    let pageX = this.container.clientWidth;
    let pageY = this.container.clientHeight;
    let mouseY=0;
    let mouseX=0;
    mouseY = event.pageY;
    let yAxis = (pageY/2-mouseY)/pageY*300; 
    //horizontalAxis
    mouseX = event.pageX / -pageX;
    let xAxis = -mouseX * 100 - 100;

    this.ghostEyes.style.cssText = `transform: translate(${xAxis}%,-${yAxis}%)`

  }
    render(){
        return (
          <div ref={this.setContainer} onMouseMove={this.handleMotion} style={{minHeight: "100vh", backgroundColor: "#28254C"}}>
            <div className="box">
            <div className="box__ghost">
              <div className="symbol"></div>
              <div className="symbol"></div>
              <div className="symbol"></div>
              <div className="symbol"></div>
              <div className="symbol"></div>
              <div className="symbol"></div>
              
              <div className="box__ghost-container">
                <div ref={this.setGhostEyes} className="box__ghost-eyes">
                  <div className="box__eye-left"></div>
                  <div className="box__eye-right"></div>
                </div>
                <div className="box__ghost-bottom">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div className="box__ghost-shadow"></div>
            </div>
            
            <div className="box__description">
              <div className="box__description-container">
                <div className="box__description-title">Whoops!</div>
                <div className="box__description-text">It seems like we couldn't find the page you were looking for</div>
              </div>
              
              <Link to="/" className="box__button">Go to Home</Link>
              
            </div>
            
          </div>
          </div>
        )
    }
}