//jshint esversion: 6
import React, {Component} from 'react';

import SearchPanel from '../SearchPanel';
import ToDoList from '../ToDoList';
import AppHeader from '../AppHeader';
import ItemStatusFilter from '../ItemStatusFilter';
import AddNewItem from '../AddNewItem';


import './App.css';

export default class App extends Component {

    maxID = 100;

    constructor() {
        super();

        this.state = ({
            todoData: [
                this.createToDoItem('Drink Tea'),
                this.createToDoItem('Learn React'),
                this.createToDoItem('Make awesome app')
            ]
        }); 

    }

    deleteItem = (id) => {
        this.setState( ({ todoData} ) => {
            const index = todoData.findIndex( (elem) => elem.id === id );
            const before = todoData.slice(0, index);
            const after = todoData.slice(index + 1);
            const newAray = [ ...before, ...after];

            return({
                todoData: newAray
            });
        })
    };

    createToDoItem = (label) => {
        return {
            label,
            important: false,
            done: false,
            id: this.maxID++
        }
    }

    onAdded = (text) => {
        const newItem = this.createToDoItem(text);

        this.setState( ({todoData}) => {
            const newArr = [...todoData, newItem];

            return({
                todoData: newArr
            });
        });
    };

    toggleProperty = (array, id, propName) => {
        const index = array.findIndex( (elem) => elem.id === id );
        const oldItem = array[index];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        return [
            ...array.slice(0, index),
            newItem,
            ...array.slice(index + 1)
        ];
    }

    onToggleImportant = (id) => {
        this.setState( ({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    }


    onToggleDone = (id) => {
       this.setState( ({todoData}) => {
           return {
               todoData: this.toggleProperty(todoData, id, 'done')
           }
       })
    };


    render() {
        const countDone = this.state.todoData.filter( (elem) => elem.done ).length;
        const countNotDone = this.state.todoData.filter( (elem) => elem.done === false ).length;

        return (
            <div className='todo-app'>
    
                <AppHeader toDo={countNotDone} done={countDone} />
    
                <div className='top-panel d-flex'>
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>
    
                <ToDoList 
                    todos = {this.state.todoData}
                    onDeleted = {this.deleteItem}
                    onToggleImportant = {this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />

                <AddNewItem
                    onAdded = { this.onAdded } 
                />
            </div>
        );    
    }

};
