import React, {Component} from "react";
import FeatureList from "./featureList";
import {isEqual, isEmpty, groupBy} from "lodash";

class Transfer extends Component {
    constructor(props) {
        super(props);
        let [availableColumns, displayColumns] = this.buildAvailableAndDisplayColumns(props);
        this.originalColumns = [
            ...availableColumns.map(col => col.tid),
            ...displayColumns.map(col => col.tid)
        ];
        this.originalAvailableColumns = availableColumns.map(col => col.tid);
        this.originalDisplayColumns = displayColumns.map(col => col.tid);
        this.originalColumns = [
            ...this.originalAvailableColumns,
            ...this.originalDisplayColumns
        ];
        this.state = this.initState(props, availableColumns, displayColumns);
    }

    initState(props, availableColumns, displayColumns) {
        let addAvailable = this.isAvailableWhenHasSelected(availableColumns);
        let removeAvailable = this.isAvailableWhenHasSelected(displayColumns);
        let removeAllAvailable = this.isAvailableWhenHasColumns(displayColumns);
        let moveUpAvailable = this.isAvailableWhenOneCanUp(displayColumns);
        let moveDownAvailable = this.isAvailableWhenOneCanDown(displayColumns);
        let saveAvailable = this.isColumnsChanged(...availableColumns, ...displayColumns);

        return {
            availableColumns,
            displayColumns,
            addAvailable,
            removeAvailable,
            removeAllAvailable,
            moveUpAvailable,
            moveDownAvailable,
            saveAvailable
        };
    }

    buildAvailableAndDisplayColumns(props) {
        let {useId, showText, availableList, displayList} = props;
        let availableColumns = [];
        let displayColumns = [];
        if (arrayAllHasOwnProperty([
            ...availableList,
            ...displayList
        ], useId)) {
            availableColumns = availableList.map(item => {
                return {
                    ...item,
                    columnName: ownIfNoSuchProperty(item, showText),
                    tid: item[useId],
                    selected: false
                };
            });
            displayColumns = displayList.map((item, id) => {
                return {
                    ...item,
                    columnName: ownIfNoSuchProperty(item, showText),
                    tid: item[useId],
                    selected: false
                };
            });
        } else {
            let id = 0;
            availableColumns = availableList.map(item => {
                return {
                    ...item,
                    columnName: ownIfNoSuchProperty(item, showText),
                    tid: id++,
                    selected: false
                };
            });
            displayColumns = displayList.map((item, id) => {
                return {
                    ...item,
                    columnName: ownIfNoSuchProperty(item, showText),
                    tid: id++,
                    selected: false
                };
            });
        }
        availableColumns = sortBy(availableColumns, "tid");
        return [availableColumns, displayColumns];
    }

    isAvailableWhenHasSelected(columns) {
        return columns.some(col => {
            return col.selected;
        });
    }

    isAvailableWhenHasColumns(columns) {
        return columns.length > 0;
    }

    isAvailableWhenSelectOnlyOne(columns) {
        let selectedCols = columns.filter(col => {
            return col.selected;
        });
        return selectedCols.length === 1;
    }

    isAvailableWhenOneCanDown(columns) {
        if (this.isAvailableWhenSelectOnlyOne(columns)) {
            let one = columns.find(col => {
                return col.selected;
            });
            return columns.indexOf(one) < columns.length - 1;
        }
        return false;
    }

    isAvailableWhenOneCanUp(columns) {
        if (this.isAvailableWhenSelectOnlyOne(columns)) {
            let one = columns.find(col => {
                return col.selected;
            });
            return columns.indexOf(one) > 0;
        }
        return false;
    }

    isColumnsChanged(...columns) {
        return !isEqual(this.originalColumns, columns.map(col => col.tid));
    }

    updateState(availableColumns, displayColumns) {
        let addAvailable = this.isAvailableWhenHasSelected(availableColumns);
        let removeAvailable = this.isAvailableWhenHasSelected(displayColumns);
        let removeAllAvailable = this.isAvailableWhenHasColumns(displayColumns);
        let moveUpAvailable = this.isAvailableWhenOneCanUp(displayColumns);
        let moveDownAvailable = this.isAvailableWhenOneCanDown(displayColumns);
        let saveAvailable = this.isColumnsChanged(...availableColumns, ...displayColumns);

        this.setState(preState => {
            return {
                availableColumns,
                displayColumns,
                addAvailable,
                removeAvailable,
                removeAllAvailable,
                moveUpAvailable,
                moveDownAvailable,
                saveAvailable
            };
        });
    }

    clickItem = (tid, selected) => {
        let {availableColumns, displayColumns} = this.state;
        availableColumns = availableColumns.map(column => {
            return column.tid === tid
                ? {
                    ...column,
                    selected
                }
                : column;
        });
        displayColumns = displayColumns.map(column => {
            return column.tid === tid
                ? {
                    ...column,
                    selected
                }
                : column;
        });
        this.updateState(availableColumns, displayColumns);
    };

    transferSelectedItems(givenList, recivedList) {
        let {true: selectedColumns, false: unSelectedColumns} = groupBy(givenList, "selected");
        let afterRecivedList = [...recivedList].concat(selectedColumns);
        return [unSelectedColumns, afterRecivedList];
    }

    addToDisplay = () => {
        let {availableColumns, displayColumns} = this.state;
        this.updateState(...this.transferSelectedItems(availableColumns, displayColumns));
    };

    backToAvailable = () => {
        let {availableColumns, displayColumns} = this.state;
        [displayColumns, availableColumns] = this.transferSelectedItems(displayColumns, availableColumns);
        availableColumns = sortBy(availableColumns, "tid");
        this.updateState(availableColumns, displayColumns);
    };

    addAllToDisplay = () => {
        let {availableColumns, displayColumns} = this.state;
        displayColumns = displayColumns.concat(availableColumns.map(column => {
            return {
                ...column,
                selected: true
            };
        }));
        availableColumns = [];
        this.updateState(availableColumns, displayColumns);
    };

    backAllToAvailable = () => {
        let {availableColumns, displayColumns} = this.state;
        availableColumns = availableColumns.concat(displayColumns.map(column => {
            return {
                ...column,
                selected: true
            };
        }));
        displayColumns = [];
        availableColumns = sortBy(availableColumns, "tid");
        this.updateState(availableColumns, displayColumns);
    };

    moveUp = () => {
        let {availableColumns, displayColumns} = this.state;
        let selectedCol = this.getOnlyMoveItem(displayColumns);
        if (selectedCol !== null) {
            let index = displayColumns.indexOf(selectedCol);
            if (index > 0) {
                displayColumns = swap(displayColumns, index - 1, index);
                this.updateState(availableColumns, displayColumns);
            }
        }
    };

    moveDown = () => {
        let {availableColumns, displayColumns} = this.state;
        let selectedCol = this.getOnlyMoveItem(displayColumns);
        if (selectedCol !== null) {
            let index = displayColumns.indexOf(selectedCol);
            if (index < displayColumns.length - 1) {
                displayColumns = swap(displayColumns, index, index + 1);
                this.updateState(availableColumns, displayColumns);
            }
        }
    };

    onSave = () => {
        let {availableColumns, displayColumns} = this.state;
        availableColumns.forEach(col => {
            col.selected = false;
        });
        displayColumns.forEach(col => {
            col.selected = false;
        });
        this.originalAvailableColumns = availableColumns.map(col => col.tid);
        this.originalDisplayColumns = displayColumns.map(col => col.tid);
        this.originalColumns = [
            ...this.originalAvailableColumns,
            ...this.originalDisplayColumns
        ];
        this.props.save({availableColumns, displayColumns});
        this.updateState(availableColumns, displayColumns);
    };

    onCancel = () => {
        let {availableColumns, displayColumns} = this.state;
        this.props.cancel({availableColumns, displayColumns});
        let allColumns = [...availableColumns].concat(displayColumns);
        allColumns.forEach(col => {
            col.selected = false;
        });
        availableColumns = mapFromAnotherBy(this.originalAvailableColumns, allColumns, "tid");
        displayColumns = mapFromAnotherBy(this.originalDisplayColumns, allColumns, "tid");
        this.updateState(availableColumns, displayColumns);
    };

    getOnlyMoveItem(columns) {
        let selectedCols = columns.filter(column => {
            return column.selected;
        });
        return selectedCols.length === 1
            ? selectedCols[0]
            : null;
    }

    getSelectColButtons() {
        let {addAvailable, removeAvailable, removeAllAvailable} = this.state;
        return [
            {
                text: "Add",
                clickHandler: this.addToDisplay,
                available: addAvailable
            }, {
                text: "Remove",
                clickHandler: this.backToAvailable,
                available: removeAvailable
            }, {
                text: "Remove all",
                clickHandler: this.backAllToAvailable,
                available: removeAllAvailable
            }
        ];
    }

    getColumnOrderButtons() {
        let {moveUpAvailable, moveDownAvailable} = this.state;
        return [
            {
                text: "Move up",
                clickHandler: this.moveUp,
                available: moveUpAvailable
            }, {
                text: "Move down",
                clickHandler: this.moveDown,
                available: moveDownAvailable
            }
        ];
    }

    render() {
        let {availableColumns, displayColumns, saveAvailable} = this.state;
        let {showCheckbox, cancelAndSave} = this.props;
        let selectColButtons = this.getSelectColButtons();
        let columnOrderButtons = this.getColumnOrderButtons();
        return (<div className="transfer">
            <div className="transfer-core">
                <FeatureList columns={availableColumns} clickItem={this.clickItem} title="Available Columns" checkbox={showCheckbox}/>
                <div className="btn-list">
                    <ButtonList title="Select Columns" buttons={selectColButtons}/>
                    <ColumnBlank height="40"/>
                    <ButtonList title="Columns Order" buttons={columnOrderButtons}/>
                </div>
                <FeatureList columns={displayColumns} clickItem={this.clickItem} title="Display Columns" checkbox={this.props.showCheckbox}/>
            </div>
            {
                cancelAndSave && (<div className="cancel-and-save">
                    <input type="button" value="Cancel" className="cancel-btn" onClick={this.onCancel}/>
                    <input type="button" value="Save" className={saveAvailable
                            ? "save-btn"
                            : "save-disabled"} disabled={saveAvailable
                            ? ""
                            : "disabled"} onClick={this.onSave}/>
                </div>)
            }
        </div>);
    }
}

const swap = (list, current, next) => {
    let currentItem = list[current];
    let nextItem = list[next];
    list[current] = nextItem;
    list[next] = currentItem;
    return [...list];
};

const arrayAllHasOwnProperty = (array, property) => {
    return isEmpty(array) && !array.some(item => !item.hasOwnProperty(property));
};

const ownIfNoSuchProperty = (obj, property) => {
    return obj.hasOwnProperty(property)
        ? obj[property]
        : JSON.stringify(obj);
};

const sortBy = (array, by) => {
    array.sort((pre, cur) => {
        return typeof pre[by] === "string"
            ? pre[by].localeCompare(cur[by])
            : pre[by] - cur[by];
    });
    return array;
};

const mapFromAnotherBy = (aim, source, by) => {
    return aim.map(item => source.find(col => col[by] === item));
};

const mapButtonTags = buttons => {
    let tags = buttons.map((button, i) => {
        let {text, clickHandler, available} = button;
        return (<input key={`${text}-${i}`} type="button" value={text} disabled={available
                ? ""
                : "disabled"} className={available
                ? "function-btn-available"
                : "btn-disabled"} onClick={clickHandler}/>);
    });
    return tags;
};

const ButtonList = props => {
    let {title, buttons} = props;
    return (<div>
        <span className="btn-label">{title}</span>
        {mapButtonTags(buttons)}
    </div>);
};

export const ColumnBlank = props => {
    return <div style={{
            height: `${props.height}px`
        }}/>;
};

export default Transfer;
