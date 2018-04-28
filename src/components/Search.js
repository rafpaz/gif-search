import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Search extends Component {
    render() {
        return (
            <div id="search-container">
                <input id="userName"
                        name={"userName"}
                        type="text"
                        placeholder={"User Name"}
                        value={this.props.userName}
                        onChange={this.props.onInputChange}
                />
                <input id="repoName"
                        name={"repoName"}
                        type="text"
                        placeholder={"User Repo"}
                        value={this.props.repoName}
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
    onSubmit: PropTypes.func,
    onInputChange: PropTypes.func,
    onPerPageChange: PropTypes.func,
    userName: PropTypes.string,
    repoName: PropTypes.string,
    perPage: PropTypes.number,
};

export default Search;
