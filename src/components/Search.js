import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
    render() {
        return (
            <div id="search-container">
                <input id="searchInput"
                        name={"searchInput"}
                        type="text"
                        placeholder={"Search for gifs"}
                        value={this.props.searchInput}
                        onChange={this.props.onInputChange}
                />
                <button onClick={this.props.onSubmit}>Search</button>
                <div id="pagination-container">
                    <label htmlFor={"pagination"}>Items Per Page</label>
                    <select id={"pagination"} value={this.props.perPage} onChange={this.props.onPerPageChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                    </select>
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    searchInput: PropTypes.string,
    onInputChange: PropTypes.func,
    onSubmit: PropTypes.func,
    perPage: PropTypes.number,
    onPerPageChange: PropTypes.func,
};

export default Search;
