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
        let addAvailable=this.isAvailableWhenHasSelected(availableColumns);
        let removeAvailable=this.isAvailableWhenHasSelected(displayColumns);
        let removeAllAvailable=this.isAvailableWhenHasColumns(displayColumns);
        let moveUpAvailable=this.isAvailableWhenOneCanUp(displayColumns);
        let moveDownAvailable=this.isAvailableWhenOneCanDown(displayColumns);

        this.state = {
            availableColumns,
            displayColumns,
            addAvailable,
            removeAvailable,
            removeAllAvailable,
            moveUpAvailable,
            moveDownAvailable
        };
    }

    isAvailableWhenHasSelected(columns){
        return columns.some((col)=>{
            return col.selected;
        });
    }

    isAvailableWhenHasColumns(columns){
        return columns.length>0;
    }

    isAvailableWhenSelectOnlyOne(columns){
        let selectedCols=columns.filter((col)=>{
            return col.selected;
        });
        return selectedCols.length===1;
    }

    isAvailableWhenOneCanDown(columns){
        if(this.isAvailableWhenSelectOnlyOne(columns)){
            let one=columns.find((col)=>{
                return col.selected;
            });
            return columns.indexOf(one)<columns.length-1
        }
        return false;
    }

    isAvailableWhenOneCanUp(columns){
        if(this.isAvailableWhenSelectOnlyOne(columns)){
            let one=columns.find((col)=>{
                return col.selected;
            });
            return columns.indexOf(one)>0;
        }
        return false;
    }

    updateState(availableColumns,displayColumns){
        let addAvailable=this.isAvailableWhenHasSelected(availableColumns);
        let removeAvailable=this.isAvailableWhenHasSelected(displayColumns);
        let removeAllAvailable=this.isAvailableWhenHasColumns(displayColumns);
        let moveUpAvailable=this.isAvailableWhenOneCanUp(displayColumns);
        let moveDownAvailable=this.isAvailableWhenOneCanDown(displayColumns);
        this.setState((preState)=>{
            return {
                availableColumns,
                displayColumns,
                addAvailable,
                removeAvailable,
                removeAllAvailable,
                moveUpAvailable,
                moveDownAvailable
            }
        });
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
        this.updateState(availableColumns,displayColumns);
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
        this.updateState(availableColumns,displayColumns);
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
        this.updateState(availableColumns,displayColumns);
    }

    addAllToDisplay=()=>{
        let {availableColumns,displayColumns} = this.state;
        displayColumns=displayColumns.concat(availableColumns.map((column)=>{return {...column,selected:true}}));
        availableColumns=[];
        this.updateState(availableColumns,displayColumns);
    }

    backAllToAvailable=()=>{
        let {availableColumns,displayColumns} = this.state;
        availableColumns=availableColumns.concat(displayColumns.map((column)=>{return {...column,selected:true}}));
        displayColumns=[];
        availableColumns.sort((pre,cur)=>{
            return pre.id-cur.id;
        });
        this.updateState(availableColumns,displayColumns);
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
            this.updateState(availableColumns,displayColumns);
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
            this.updateState(availableColumns,displayColumns);
        }
    }

    render(){
        let {
            availableColumns,
            displayColumns,
            addAvailable,
            removeAvailable,
            removeAllAvailable,
            moveUpAvailable,
            moveDownAvailable
        } = this.state;
        let selectColButtons=[
            {text:"Add",clickHandler:this.addToDisplay,style:addAvailable},
            {text:"Remove",clickHandler:this.backToAvailable,style:removeAvailable},
            {text:"Remove all",clickHandler:this.backAllToAvailable,style:removeAllAvailable}
        ];
        let colOrderButtons=[
            {text:"Move up",clickHandler:this.moveUp,style:moveUpAvailable},
            {text:"Move down",clickHandler:this.moveDown,style:moveDownAvailable},
        ];
        return(
            <div className="transfer">
                <FeatureList columns={availableColumns} clickItem={this.clickItem} title="Available Columns"/>
                <div className="btn-list">
                    <ButtonList title="Select Columns" buttons={selectColButtons}/>
                    <ColumnBlank height="40" />
                    <ButtonList className="order-btn-list" title="Columns Order" buttons={colOrderButtons}/>
                </div>
                <FeatureList columns={displayColumns}  clickItem={this.clickItem} title="Display Columns"/>
            </div>
        )
    }
}

export const ColumnBlank=(props)=>{
    return <div style={{height:`${props.height}px`}}></div>
}

export const ButtonList=(props)=>{
    let {title,buttons}=props;
    return(
        <div>
            <span className="btn-label">{title}</span>
            {
                buttons.map((button)=>{
                    let {text,clickHandler,style}=button;
                    return (
                        <input type="button" value={text} disabled={style?"":"disabled"} className={style?"function-btn-available":"function-btn-disabled"} onClick={clickHandler} />
                    );
                })
            }
        </div>
    )
}

export default Transfer;
