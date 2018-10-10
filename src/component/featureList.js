import React, {Component} from "react"
import FeatureItem from "./featureItem"
import '../style/transfer.css';

class FeatureList extends Component {
    constructor(props) {
        super(props);
    }

    getColumnList(){
        let columnList = this.props.columns.map((column,index) => {
            let {columnName,id,selected}=column;
            return (
                <FeatureItem key={`column-${index}`} text={columnName} id={id} selected={selected} click={this.props.clickItem}/>
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

export default FeatureList;
