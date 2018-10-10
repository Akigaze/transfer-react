import React, {Component} from "react"
import '../style/transfer.css';


class FeatureItem extends Component {
    constructor(props) {
        super(props);
    }

    click=(event)=>{
        this.props.click(this.props.id,!this.props.selected)
    }

    render(){
        return(
            <li id={this.props.id}
                onClick={this.click}
                className={this.props.selected?"selected-column":"unselect-column"}>
                <input type="checkbox" className="column-check-box" checked={this.props.selected}/>
                <span className="column-item">{this.props.text}</span>
            </li>
        )
    }
}

export default FeatureItem;
