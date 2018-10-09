import React, {Component} from "react"
import '../style/transfer.css';


class FeatureItem extends Component {
    constructor(props) {
        super(props);
        this.state = {...this.props, isSelected:false};
    }

    click=(event)=>{
        console.log(event.target);
        this.setState(preState => {
            let {isSelected} = preState;
            return {...preState,isSelected:!isSelected}
        });
    }

    render(){
        return(
            <li onClick={this.click} className={this.state.isSelected?"selected-city":"unselect-city"}>
                <input type="checkbox" checked={this.state.isSelected}/>
                {this.state.city}
            </li>
        )
    }
}

export default FeatureItem;
