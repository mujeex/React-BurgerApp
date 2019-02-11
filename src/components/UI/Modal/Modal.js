import React,{Component} from 'react'
import classes from  './Modal.css'
import Backdrop from '../../UI/Backdrop/Backdrop'

class Modal extends Component{

    shouldComponentUpdate = (nextProps, nextState) => {
      return nextProps.show !== this.props.show|| nextProps.children !== this.props.children
    }
    componentWillUpdate = (nextProps, nextState) => {
      console.log('[Modal] WillUpdate')
    };
    
    

    render(){
        return(
            <>
        <Backdrop show={this.props.show} backdropClicked={this.props.modalClosed}/>
    <div 
    className={classes.Modal}
    style={{
        transform: this.props.show? 'translateY(0)': 'translateY(-100vh)',
        opacity: this.props.show? '1': '0'
    }}
    >
        {this.props.children}
    </div>
    </>
        )
    }
}
export default Modal