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
            <li onClick={this.click}
                className={this.props.selected?"selected-city":"unselect-city"}
                id={this.props.id}
            >
                <input type="checkbox" checked={this.props.selected}/>
                <span>{this.props.city}</span>
            </li>
        )
    }
}

export default FeatureItem;
