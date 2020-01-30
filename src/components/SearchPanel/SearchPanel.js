//jshint esversion: 6
import React, {Component} from 'react';

import './SearchPanel.css';

export default class SearchPanel extends Component {

    constructor() {
        super();

        this.state = ({
            term: ''
        });
    }

    onSearchChange = (event) => {
        const term = event.target.value;

        this.setState({ term });
        this.props.onSearchChange(term);
    }


    render() {

        return (
            <input type='text'
                    placeholder='type to search'
                    className="form-control search-input"
                    value = {this.state.term} 
                    onChange = {this.onSearchChange}/>
            )
    }
}
