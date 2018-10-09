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
        });
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
            return {originalCities,displayCities}
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
            return {originalCities,displayCities}
        });
    }

    addAllToDisplay=()=>{
        let {originalCities,displayCities} = this.state;
        displayCities=displayCities.concat(originalCities.map((city)=>{return {...city,selected:true}}));
        originalCities=[];
        this.setState((preState)=>{
            return {originalCities,displayCities}
        });
    }

    backAllToOriginal=()=>{
        let {originalCities,displayCities} = this.state;
        originalCities=originalCities.concat(displayCities.map((city)=>{return {...city,selected:false}}));
        displayCities=[];
        originalCities.sort((pre,cur)=>{
            return pre.id-cur.id;
        });
        this.setState((preState)=>{
            return {originalCities,displayCities}
        });
    }

    moveUp=()=>{
        let {originalCities,displayCities} = this.state;
        let cities=displayCities.filter((city)=>{
            return city.selected;
        });
        if(cities.length!==1){
            return false;
        }
        let upperCity = cities[0];
        let index=displayCities.indexOf(upperCity);
        if(index>0){
            let lastCity = displayCities[index-1];
            displayCities[index]=lastCity;
            displayCities[index-1]=upperCity;
            this.setState((preState)=>{
                return {originalCities,displayCities}
            })
        }
    }

    moveDown=()=>{
        let {originalCities,displayCities} = this.state;
        let cities=displayCities.filter((city)=>{
            return city.selected;
        });
        if(cities.length!==1){
            return false;
        }
        let downerCity = cities[0];
        let index=displayCities.indexOf(downerCity);
        if(index<displayCities.length-1){
            let nextCity = displayCities[index+1];
            displayCities[index]=nextCity;
            displayCities[index+1]=downerCity;
            this.setState((preState)=>{
                return {originalCities,displayCities}
            })
        }
    }

    render(){
        return(
            <div className="transfer">
                <FeatureList cities={this.state.originalCities} clickItem={this.clickItem} title="Original Cities"/>
                <div className="btn-list">
                    <input type="button" value="->" className="function-btn" onClick={this.addToDisplay}/><br/>
                    <input type="button" value="<-" className="function-btn" onClick={this.backToOriginal}/><br/>
                    <input type="button" value="all->" className="function-btn" onClick={this.addAllToDisplay}/><br/>
                    <input type="button" value="<-all" className="function-btn" onClick={this.backAllToOriginal}/><br/>
                    <input type="button" value="up" className="function-btn" onClick={this.moveUp}/><br/>
                    <input type="button" value="down" className="function-btn" onClick={this.moveDown}/><br/>
                </div>
                <FeatureList cities={this.state.displayCities}  clickItem={this.clickItem} title="Display Cities"/>
            </div>
        )
    }
}

export default Transfer;
