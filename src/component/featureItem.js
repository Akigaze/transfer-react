import React, {Component} from "react"
import '../style/transfer.css';

class FeatureItem extends Component {

    click=(event)=>{
        this.props.click(this.props.id,!this.props.selected)
    }

    render(){
        let {id,selected,text}=this.props;
        return(
            <li id={id}
                onClick={this.click}
                className={selected?"selected-column":"unselect-column"}>
                <input type="checkbox" className="column-check-box" checked={selected}/>
                <span className="column-item">{text}</span>
            </li>
        )
    }
}

export default FeatureItem;
