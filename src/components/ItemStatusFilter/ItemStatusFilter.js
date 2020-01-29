//jshint esversion: 6
import React, {Component} from 'react';

import './ItemStatusFilter.css';

export default class ItemStatusFilter extends Component {

        render(){
                const {onActiveItems, onAllItems, onDoneItems} = this.props;

                return (
                        <div className="btn-group">
                        
                                <button type="button"
                                        className="btn btn-info"
                                        onClick={onAllItems}>
                                        All
                                </button>

                                <button type="button" 
                                        className="btn btn-outline-secondary"
                                        onClick={onActiveItems}>        
                                        Active
                                </button>

                                <button type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={onDoneItems}>
                                        Done
                                </button>

                        </div>
                      ); 
        }
}


