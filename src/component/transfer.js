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
                <div>
                    <input type="button" value="->"/><br/>
                    <input type="button" value="<-"/><br/>
                    <input type="button" value="up"/><br/>
                    <input type="button" value="down"/><br/>
                </div>
                <FeatureList cities={[]}/>
            </div>
        )
    }
}

export default Transfer;
