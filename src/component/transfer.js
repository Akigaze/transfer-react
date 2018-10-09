import React, {Component} from "react"
import FeatureList from "./featureList"
import {cityList} from "../constant/list_data"


class Transfer extends Component {
    constructor(props) {
        super(props);
        let originalCities = cityList.map((city,i)=>{
            return {cityName:city,id:i,selected:false}
        });
        this.state = {originalCities,displayCities:[]};
    }

    addToDisplay=()=>{
        let {originalCities,displayCities} = this.state;
        let selectedCities=originalCities.filter((city,i)=>{
            return city.selected;
        });
        originalCities=originalCities.filter((city,i)=>{
            return !city.selected;
        });
        displayCities=displayCities.concat(selectedCities);
        this.setState((preState)=>{
            return {originalCities:[...originalCities],displayCities:[...displayCities]}
        });
    }

    backToOriginal=()=>{
        let {originalCities,displayCities} = this.state;
        let backedCities=displayCities.filter((city,i)=>{
            return city.selected;
        });
        displayCities=displayCities.filter((city,i)=>{
            return !city.selected;
        });
        originalCities=originalCities.concat(backedCities.map((city)=>{return{...city,selected:false}}));
        originalCities.sort((pre,cur)=>{
            return pre.id-cur.id;
        });
        this.setState((preState)=>{
            return {originalCities:[...originalCities],displayCities:[...displayCities]}
        });
    }

    clickItem=(id,selected)=>{
        let {originalCities,displayCities} = this.state;
        originalCities.map((city,i)=>{
            if(city.id===id){
                city.selected=selected;
            }
            return city;
        });
        displayCities.map((city,i)=>{
            if(city.id===id){
                city.selected=selected;
            }
            return city;
        });
        this.setState((preState)=>{
            return {originalCities,displayCities}
        })
    }

    render(){
        console.log(this.state);
        return(
            <div className="transfer">
                <FeatureList cities={this.state.originalCities} clickItem={this.clickItem}/>
                <div className="btn-list">
                    <input type="button" value="->" className="function-btn" onClick={this.addToDisplay}/><br/>
                    <input type="button" value="<-" className="function-btn" onClick={this.backToOriginal}/><br/>
                    <input type="button" value="up" className="function-btn"/><br/>
                    <input type="button" value="down" className="function-btn"/><br/>
                </div>
                <FeatureList cities={this.state.displayCities}  clickItem={this.clickItem}/>
            </div>
        )
    }
}

export default Transfer;
