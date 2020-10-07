import React from 'react';
import {withRouter} from 'react-router-dom'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // USE THIS LATER FOR ANIMATIONS
import './Modal.css';

class Modal extends React.Component {
  constructor(props) {
    super(props)
  }
  bgClick = (e) => {
    // e.preventDefault()
    e.target === e.currentTarget || e.keyCode === 27 ? this.props.close() : undefined
  }
  componentDidMount(){
    document.addEventListener("keydown", this.bgClick, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.bgClick, false);
  }
  render() {
    return (
    this.props.isOpen ? 
  <div className="modal-bg" onClick={(e) => this.bgClick(e)}>
        <div className="modal-main">
          {this.props.children}
         { this.props.showClose ? <button onClick={this.props.close}> Close </button> : ''}
         { this.props.showContine ? 
          <button onClick={()=>{this.props.close(); console.log('continue clicked')}} >Continue</button>
          : undefined}
         { this.props.showCancel ? <button onClick={this.props.close}>Cancel</button> : undefined}
        </div>
      </div>
  : ''
    )
  }
}
 export default withRouter(Modal)

//  PURE COMP WITHOUT THE ABILITY TO USE ESC KEY!
// const Modal = (props) => {

  
  
//   return props.isOpen ? 
//   <div className="modal-bg" onClick={(e) => bgClick(e, props.close)}>
//  { document.addEventListener("keydown", (e) => bgClick(e, props.close), false)}
//         <div className="modal-main">
//           {props.children}
//          { props.showClose ? <button onClick={props.close}> Close </button> : ''}
//          { props.showContine ? 
//           <button onClick={()=>{props.close(); console.log('continue clicked')}} >Continue</button>
//           : undefined}
//          { props.showCancel ? <button onClick={props.close}>Cancel</button> : undefined}
//         </div>
//       </div>
//   : ''
// }

// export default Modal;
