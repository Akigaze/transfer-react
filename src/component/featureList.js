import React, {Component} from "react"
import {cityList} from "../constant/list_data"
import '../style/transfer.css';


class FeatureList extends Component {
    constructor(props) {
        super(props);
        this.state = {cities:cityList};
    }

    getCityList(){
        const {cities} = this.state;
        let cityList = cities.map((city,index) => {
            return (
                <li key={`city-${index}`}>
                    <input type="checkbox" />
                    {city}
                </li>
            )
        });
        return cityList;
    }

    render(){
        return(
            <div>
                <ol className="feature-list">
                    {this.getCityList()}
                </ol>
            </div>
        )
    }
}

export default FeatureList;
