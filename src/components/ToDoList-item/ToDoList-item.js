//jshint esversion: 9
import React, {Component} from 'react';

import './ToDoList-item.css';

export default class ToDoListItem extends Component {

    render(){
        const { label, onDeleted, 
            onToggleDone, 
            onToggleImportant,
            done, important } = this.props;
        let classTDLItem = 'todo-list-item';
        let classTDLItemLabel = 'ToDoList-item-label';

        if(done === true) {
            classTDLItem += ' done';
        }

        if(important === true) {
            classTDLItemLabel += ' important';
        }


        return (
            <span className={classTDLItem}>

                <span   className={classTDLItemLabel} 
                        onClick={onToggleDone}> 
                    { label } 
                </span>

                <button type="button" 
                        className="btn btn-outline-success btn-sm float-right"
                        onClick={onToggleImportant}>

                <i className="fa fa-exclamation" />

                </button>

                <button type="button"
                        className="btn btn-outline-danger btn-sm float-right"
                        onClick={onDeleted}>
                        
                <i className="fa fa-trash-o" />

                </button>

            </span>
    );    

    }
};

