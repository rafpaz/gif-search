import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: this.props.searchQuery,
            limit: 20
        };

        this.onValueChange = this.onValueChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentWillReceiveProps(newProps) {
        let newLimit = newProps.limit ? newProps.limit : 20;
        this.setState({
            limit: newLimit
        });
    }

    onValueChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleKeyPress(target) {
        if(target.charCode === 13){
            this.props.history.push("/search/" + this.state.searchQuery + "/" + this.state.limit + "/" + 0);   
        }
    }

    render() {
        return (
            <div className="container" id={"search-container"}>
                <div className="row justify-content-md-center">
                    <div className="input-group mb-3 mt-3 col-5">
                        <input type="text"
                               className="form-control"
                               placeholder="Search for gifs"
                               aria-label="Search for gifs"
                               aria-describedby="gif-search"
                               id="searchInput"
                               name={"searchQuery"}
                               value={this.state.searchQuery}
                               onChange={this.onValueChange}
                               onKeyPress={this.handleKeyPress}
                        />
                        <div className="input-group-append">
                            <Link to={"/search/" + this.state.searchQuery + "/" + this.state.limit + "/" + 0}>
                                <button id={"search-btn"}
                                        className="btn btn-outline-secondary"
                                        type="button"
                                >
                                    <i className="material-icons">search</i>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="input-group col-3 mt-3">
                        <div className="input-group-prepend ml-3">
                            <label className="input-group-text" htmlFor="per-page">Per Page</label>
                        </div>
                        <select id="limit-select"
                                className="custom-select col-3"
                                value={this.state.limit}
                                onChange={this.onValueChange}
                                name={"limit"}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    searchQuery: PropTypes.string
};

export default withRouter(Search);
