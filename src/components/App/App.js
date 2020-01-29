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
            notDisplay: false,
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

    activeButtonClass = (btnAllClass, btnActiveClass, btnDoneClass) => {
        const btnAll = document.getElementById('btnAll');
        const btnActive = document.getElementById('btnActive');
        const btnDone = document.getElementById('btnDone');
        
        btnAll.className = btnAllClass;
        btnActive.className = btnActiveClass;
        btnDone.className = btnDoneClass;
    }

    onActiveItems = () => {
        const notAvtiveItems = this.state.todoData.filter( (elem) => elem.done === true );
        const activeItems = this.state.todoData.filter( (elem) => elem.done ===false );

        notAvtiveItems.forEach( (item) => {
            item.notDisplay = true; 
        });

        activeItems.forEach( (item) => {
            item.notDisplay = false; 
        });

        const newArr = [...activeItems, ...notAvtiveItems];
        
        newArr.sort( function(a,b) {
            return a.id - b.id
        });

        this.setState( ({todoData}) => {
            return({
                todoData: newArr
            })
        });

        this.activeButtonClass('btn btn-outline-secondary', 'btn btn-info', 'btn btn-outline-secondary');
    }

    onDoneItems = () => {
        const notAvtiveItems = this.state.todoData.filter( (elem) => elem.done === true );
        const activeItems = this.state.todoData.filter( (elem) => elem.done ===false );

        activeItems.forEach( (item) => {
            item.notDisplay = true; 
        });

        notAvtiveItems.forEach( (item) => {
            item.notDisplay = false; 
        });

        const newArr = [...activeItems, ...notAvtiveItems];
        
        newArr.sort( function(a,b) {
            return a.id - b.id
        });

        this.setState( ({todoData}) => {
            return({
                todoData: newArr
            })
        });

        this.activeButtonClass('btn btn-outline-secondary', 'btn btn-outline-secondary', 'btn btn-info');

    }

    onAllItems =() => {
        const allItems = [...this.state.todoData];

        allItems.forEach( (item) => {
            item.notDisplay = false;
        })
        
        allItems.sort( function(a,b) {
            return a.id - b.id
        });

        this.setState( ({todoData}) => {
            return({
                todoData: allItems
            })
        })

        this.activeButtonClass('btn btn-info', 'btn btn-outline-secondary', 'btn btn-outline-secondary');
    }


    render() {
        const countDone = this.state.todoData.filter( (elem) => elem.done ).length;
        const countNotDone = this.state.todoData.filter( (elem) => elem.done === false ).length;

        return (
            <div className='todo-app'>
    
                <AppHeader toDo={countNotDone} done={countDone} />
    
                <div className='top-panel d-flex'>
                    <SearchPanel 
                        todos={this.state.todoData}/>
                    <ItemStatusFilter 
                        onActiveItems={this.onActiveItems}
                        onAllItems={this.onAllItems}
                        onDoneItems={this.onDoneItems}
                        todos={this.state.todoData} 
                    />
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
