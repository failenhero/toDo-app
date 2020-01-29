//jshint esversion: 9
import React, {Component} from 'react';

import './SearchPanel.css';

export default class SearchPanel extends Component {

    constructor() {
        super();

        this.state = ({
            searchedInfo: ''
        });
    }


    render() {

        document.onclick = () => {
            this.setState({
                searchedInfo: ''
            });

            const allItems = document.querySelectorAll('.todo-list-item');
            allItems.forEach( (item) => {
                item.classList.remove('not-display'); 
            });
    
        };

        const seatchFieldChange = (event) => {

            this.setState({
                searchedInfo: event.target.value
            });
            
            const value = this.state.searchedInfo.trim();
            const allItems = document.querySelectorAll('.todo-list-item');
            
            if(value !== '') {

                allItems.forEach( (elem) => {

                    if(elem.innerText.search(value) === -1) {

                        elem.classList.add('not-display');

                    } else {

                        elem.classList.remove('not-display');

                    }
                });
            }
        };

        return (
            <input  type='text'
                    placeholder='type to search'
                    className="form-control search-input" 
                    onChange={seatchFieldChange}
                    value={this.state.searchedInfo} />
        );
        
    }
};
