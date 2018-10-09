import React, {Component} from "react"
import FeatureList from "./featureList"

class Transfer extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                I am a Transfer
                <FeatureList/>
            </div>
        )
    }
}

export default Transfer;
