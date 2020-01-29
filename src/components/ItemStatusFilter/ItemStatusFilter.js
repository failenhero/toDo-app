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
                                        onClick={onAllItems}
                                        id='btnAll'>
                                        All
                                </button>

                                <button type="button" 
                                        className="btn btn-outline-secondary"
                                        onClick={onActiveItems}
                                        id='btnActive'>        
                                        Active
                                </button>

                                <button type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={onDoneItems}
                                        id='btnDone'>
                                        Done
                                </button>

                        </div>
                      ); 
        }
}


