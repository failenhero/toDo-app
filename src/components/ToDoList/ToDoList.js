//jshint esversion: 9
import React from 'react';

import ToDoListItem from '../ToDoList-item';
import './ToDoList.css';

const ToDoList = ( {todos, onDeleted, onToggleDone, onToggleImportant} ) => {

    const listElements = todos.map( (item) => {

        const {id, ...itemProps} = item;

        return (
        <li key={id} className='list-group-item'>
            <ToDoListItem 
                {...itemProps} 
                onDeleted = { () => onDeleted(id) }
                onToggleImportant = { () => onToggleImportant(id)} 
                onToggleDone = {() => onToggleDone(id)}
            />
        </li> 
        );
    }
    );

    return (
        <ul className='list-group todo-list'>
            {listElements}
        </ul>
    );
};

export default ToDoList;