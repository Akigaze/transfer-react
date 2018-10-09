import React, {Component} from "react"
import FeatureList from "./featureList"

class Transfer extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="transfer">
                <FeatureList/>
                <div>
                    <input type="button" value="->"/><br/>
                    <input type="button" value="<-"/><br/>
                    <input type="button" value="up"/><br/>
                    <input type="button" value="down"/><br/>
                </div>
                <FeatureList/>
            </div>
        )
    }
}

export default Transfer;
