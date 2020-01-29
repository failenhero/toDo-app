//jshint esversion: 6
import React, {Component} from 'react';

import './AddNewItem.css';

export default class AddNewItem extends Component {
   
    constructor(){
        super();

        this.state = ({
            label: ''
        });
    }

    onSubmit = (event) => {
        event.preventDefault();

        this.props.onAdded(this.state.label);

        this.setState({
            label: ''
        });
    }


    render() {

        const inputFieldChange = (event) => {
            this.setState({
                label: event.target.value
            });
        };

        return (
            <form   className='add-new-item d-flex'
                    onSubmit={this.onSubmit}>

                <input  type='text' 
                        className='form-control inputField'
                        placeholder='Type here to add new item'
                        onChange= {inputFieldChange}
                        value= {this.state.label} />

                <button 
                    type='button'
                    className='btn btn-outline-secondary'
                    onClick={this.onSubmit}>
                    Add
                </button>
            </form>
        );
    }

};

