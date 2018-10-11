import React, {Component} from "react"
import '../style/transfer.css';

class FeatureList extends Component {

    getColumnList(){
        let {checkbox, columns, clickItem} = this.props;
        let columnList = columns.map((column,index) => {
            let {columnName,tid,selected}=column;
            return (
                <FeatureItem key={`${columnName}-${index}`}
                    tid={tid}
                    text={columnName}
                    selected={selected}
                    click={clickItem}
                    checkbox={checkbox}
                />
            )
        });
        return columnList;
    }

    render(){
        return(
            <div className="feature-div">
                <span className="feature-list-header">{this.props.title}</span>
                <ol className="feature-list">
                    {this.getColumnList()}
                </ol>
            </div>
        )
    }
}

const FeatureItem=(props)=>{
    let {tid, selected, text, click, checkbox}=props;
    return(
        <li tid={tid}
            onClick={()=>{click(tid,!selected)}}
            className={selected?"selected-column":"unselect-column"}>
            {checkbox && (
                <input type="checkbox" className="column-check-box" checked={selected}/>
            )}
            <span className="column-item">{text}</span>
        </li>
    )
}

export default FeatureList;
