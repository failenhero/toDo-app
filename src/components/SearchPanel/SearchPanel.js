//jshint esversion: 6
import React from 'react';

import './SearchPanel.css';

const SearchPanel = () => {

    return (
    <input type='text'
            placeholder='type to search'
            className="form-control search-input" />
    );
};

export default SearchPanel;