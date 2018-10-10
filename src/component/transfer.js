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

    render(){
        let selectColButtons=[
            {text:"Add",clickHandler:this.addToDisplay},
            {text:"Remove",clickHandler:this.backToAvailable},
            {text:"Remove all",clickHandler:this.backAllToAvailable}
        ];
        let colOrderButtons=[
            {text:"Move up",clickHandler:this.moveUp},
            {text:"Move down",clickHandler:this.moveDown},
        ];
        let {availableColumns,displayColumns}=this.state;
        return(
            <div className="transfer">
                <FeatureList columns={availableColumns} clickItem={this.clickItem} title="Available Columns"/>
                <div className="btn-list">
                    <ButtonList title="Select Columns" buttons={selectColButtons}/>
                    <ButtonList title="Columns Order" buttons={colOrderButtons}/>
                </div>
                <FeatureList columns={displayColumns}  clickItem={this.clickItem} title="Display Columns"/>
            </div>
        )
    }
}

export const ButtonList=(props)=>{
    let {title,buttons}=props;
    return(
        <div>
            <span className="btn-label">{title}</span>
            {
                buttons.map((button)=>{
                    let {text,clickHandler}=button;
                    return (
                        <input type="button" value={text} className="function-btn" onClick={clickHandler} />
                    );
                })
            }
        </div>
    )
}

export default Transfer;
