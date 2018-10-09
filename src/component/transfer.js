import React, {Component} from "react"
import FeatureList from "./featureList"
import {cityList} from "../constant/list_data"


class Transfer extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="transfer">
                <FeatureList cities={cityList}/>
                <div className="btn-list">
                    <input type="button" value="->" className="function-btn"/><br/>
                    <input type="button" value="<-" className="function-btn"/><br/>
                    <input type="button" value="up" className="function-btn"/><br/>
                    <input type="button" value="down" className="function-btn"/><br/>
                </div>
                <FeatureList cities={[]}/>
            </div>
        )
    }
}

export default Transfer;
