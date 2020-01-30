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
            term: '',
            todoData: [
                this.createToDoItem('Drink Tea'),
                this.createToDoItem('Learn React'),
                this.createToDoItem('Make awesome app')
            ],
            filter: 'all'  //active, all, done
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

    search(items, term) {
        if(term.length === 0){
            return items
        } else {
            return items.filter( (item) => {
                return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
            });    
        }
    }

    onSearchChange = (term) => {
        this.setState({
            term
        })
    }

    filterButtons = (items, filter) => {

        switch(filter) {
            case 'all':
                return items
            
            case 'active': 
                return items.filter( (item) => item.done === false )
            
            case 'done':
                return items.filter( (item) => item.done === true )
            
            default:
                return items
        }
    }

    onFilterChange = (filter) => {
        this.setState({
            filter
        })
    }

    render() {
        const countDone = this.state.todoData.filter( (elem) => elem.done ).length;
        const countNotDone = this.state.todoData.filter( (elem) => elem.done === false ).length;
        const { todoData, term, filter } = this.state;
        const visibleItems = this.filterButtons(this.search(todoData, term), filter) ;

        return (
            <div className='todo-app'>
    
                <AppHeader toDo={countNotDone} done={countDone} />
    
                <div className='top-panel d-flex'>
                    <SearchPanel 
                        onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter 
                        filter={filter}
                        onFilterChange={this.onFilterChange}/>
                </div>
    
                <ToDoList 
                    todos = {visibleItems}
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
