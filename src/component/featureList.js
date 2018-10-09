import React, {Component} from "react"
import FeatureItem from "./featureItem"
import '../style/transfer.css';


class FeatureList extends Component {
    constructor(props) {
        super(props);
        this.state = {cities:props.cities};
    }

    getCityList(){
        const {cities} = this.state;
        let cityList = cities.map((city,index) => {
            return (
                <FeatureItem key={`city-${index}`} city={city}/>
            )
        });
        return cityList;
    }

    render(){
        return(
            <div className="feature-div">
                <ol className="feature-list">
                    {this.getCityList()}
                </ol>
            </div>
        )
    }
}

export default FeatureList;
