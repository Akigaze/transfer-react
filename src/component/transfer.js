import React, {Component} from "react"
import FeatureList from "./featureList"

class Transfer extends Component {
    constructor(props) {
        super(props);
        let availableColumns = props.availableList.map((item,i)=>{
            return {columnName:item,id:i,selected:false}
        });
        let displayColumns = props.displayList.map((item,i)=>{
            return {columnName:item,id:i,selected:false}
        });
        this.state = {availableColumns,displayColumns};
        console.log(this.state);
    }

    clickItem=(id,selected)=>{
        let {availableColumns,displayColumns} = this.state;
        availableColumns.map((column,i)=>{
            if(column.id===id){
                column.selected=selected;
            }
            return column;
        });
        displayColumns.map((column,i)=>{
            if(column.id===id){
                column.selected=selected;
            }
            return column;
        });
        this.setState((preState)=>{
            return {availableColumns,displayColumns}
        });
    }

    addToDisplay=()=>{
        let {availableColumns,displayColumns} = this.state;
        let selectedColumns=availableColumns.filter((column,i)=>{
            return column.selected;
        });
        availableColumns=availableColumns.filter((column,i)=>{
            return !column.selected;
        });
        displayColumns=displayColumns.concat(selectedColumns);
        this.setState((preState)=>{
            return {availableColumns,displayColumns}
        });
    }

    backToAvailable=()=>{
        let {availableColumns,displayColumns} = this.state;
        let backedColumns=displayColumns.filter((column,i)=>{
            return column.selected;
        });
        displayColumns=displayColumns.filter((column,i)=>{
            return !column.selected;
        });
        availableColumns=availableColumns.concat(backedColumns);
        availableColumns.sort((pre,cur)=>{
            return pre.id-cur.id;
        });
        this.setState((preState)=>{
            return {availableColumns,displayColumns}
        });
    }

    addAllToDisplay=()=>{
        let {availableColumns,displayColumns} = this.state;
        displayColumns=displayColumns.concat(availableColumns.map((column)=>{return {...column,selected:true}}));
        availableColumns=[];
        this.setState((preState)=>{
            return {availableColumns,displayColumns}
        });
    }

    backAllToAvailable=()=>{
        let {availableColumns,displayColumns} = this.state;
        availableColumns=availableColumns.concat(displayColumns.map((column)=>{return {...column,selected:true}}));
        displayColumns=[];
        availableColumns.sort((pre,cur)=>{
            return pre.id-cur.id;
        });
        this.setState((preState)=>{
            return {availableColumns,displayColumns}
        });
    }

    moveUp=()=>{
        let {availableColumns,displayColumns} = this.state;
        let columns=displayColumns.filter((column)=>{
            return column.selected;
        });
        if(columns.length!==1){
            return false;
        }
        let upperColumn = columns[0];
        let index=displayColumns.indexOf(upperColumn);
        if(index>0){
            let lastColumn = displayColumns[index-1];
            displayColumns[index]=lastColumn;
            displayColumns[index-1]=upperColumn;
            this.setState((preState)=>{
                return {availableColumns,displayColumns}
            })
        }
    }

    moveDown=()=>{
        let {availableColumns,displayColumns} = this.state;
        let columns=displayColumns.filter((column)=>{
            return column.selected;
        });
        if(columns.length!==1){
            return false;
        }
        let downerColumn = columns[0];
        let index=displayColumns.indexOf(downerColumn);
        if(index<displayColumns.length-1){
            let nextColumn = displayColumns[index+1];
            displayColumns[index]=nextColumn;
            displayColumns[index+1]=downerColumn;
            this.setState((preState)=>{
                return {availableColumns,displayColumns}
            })
        }
    }

    getFunctionBtnList(){
        let functions=[
            { func:this.addToDisplay, describe:" >" },
            { func:this.backToAvailable, describe:"< " },
            { func:this.addAllToDisplay, describe:"all >" },
            { func:this.backAllToAvailable, describe:"< all" },
            { func:this.moveUp, describe:"^" },
            { func:this.moveDown, describe:"v" },
        ];
        let functionBtnList=functions.map((fun,i)=>{
            return (
                <div key={`fun-${i}`}>
                    <input type="button"
                        value={fun.describe}
                        className="function-btn"
                        onClick={fun.func} />
                    <br/>
                </div>
            )
        });
        return functionBtnList;
    }

    render(){
        return(
            <div className="transfer">
                <FeatureList columns={this.state.availableColumns} clickItem={this.clickItem} title="Available Columns"/>
                <div className="btn-list">
                    <span className="btn-label">Select Column</span>
                    <input type="button" value="Add" className="function-btn" onClick={this.addToDisplay}/><br/>
                    <input type="button" value="Remove" className="function-btn" onClick={this.backToAvailable}/><br/>
                    <input type="button" value="Remove all" className="function-btn" onClick={this.backAllToAvailable}/><br/>
                    <span className="btn-label">Column Order</span>
                    <input type="button" value="Move Up" className="function-btn" onClick={this.moveUp}/><br/>
                    <input type="button" value="Move Down" className="function-btn" onClick={this.moveDown}/><br/>
                </div>
                <FeatureList columns={this.state.displayColumns}  clickItem={this.clickItem} title="Display Columns"/>
            </div>
        )
    }
}

export default Transfer;
