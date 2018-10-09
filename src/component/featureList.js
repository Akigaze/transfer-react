import React, {Component} from "react"
import FeatureItem from "./featureItem"
import '../style/transfer.css';

class FeatureList extends Component {
    constructor(props) {
        super(props);
    }

    getCityList(){
        let {cities} = this.props;
        let cityList = cities.map((city,index) => {
            return (
                <FeatureItem key={`city-${index}`} city={city.cityName} id={city.id} selected={city.selected} click={this.props.clickItem}/>
            )
        });
        return cityList;
    }

    render(){
        return(
            <div className="feature-div">

                <ol className="feature-list">
                    <span className="reature-list-header">{this.props.title}</span>
                    {this.getCityList()}
                </ol>
            </div>
        )
    }
}

export default FeatureList;
