import React, {Component} from "react"
import '../style/transfer.css';

class FeatureList extends Component {

    getColumnList(){
        let columnList = this.props.columns.map((column,index) => {
            let {columnName,id,selected}=column;
            return (
                <FeatureItem key={`${columnName}-${index}`} text={columnName} id={id} selected={selected} click={this.props.clickItem}/>
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
    let {id, selected, text, click}=props;
    return(
        <li id={id}
            onClick={()=>{click(id,!selected)}}
            className={selected?"selected-column":"unselect-column"}>
            <input type="checkbox" className="column-check-box" checked={selected}/>
            <span className="column-item">{text}</span>
        </li>
    )
}

export default FeatureList;
