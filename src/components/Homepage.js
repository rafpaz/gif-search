import React, {Component} from 'react';
import Search from "./Search";
import Results from "./Results";
import gifsAPI from "../gifsAPI";

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onPerPageChange = this.onPerPageChange.bind(this);
        this.onPaginationPress = this.onPaginationPress.bind(this);
        this.state = {
            showResults: false,
            searchInput: "happy",
            perPage: 10,
            currentPage: 1,
            nextPos: "",
            showNext: false,
            showPrev: false
        }
    }

    onInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onPaginationPress(type) {
        let pageVal = (type.target.textContent.indexOf("Next") >= 0) ? this.state.currentPage + 1 : this.state.currentPage - 1;
        this.setState({
            currentPage: pageVal
        });
        this.onSearch();
    }

    getSearchLink() {
        let key = "WQLV7FQBFVAB";
        let fetchUrl = 'https://api.tenor.com/v1/search?key=' + key + "&q=" + this.state.searchInput;
        return fetchUrl;
    }

    onSearch() {
        this.setState({
            gifsData: {}
        });
        gifsAPI.search(this.state.searchInput)
            .then(data => {
                this.setState({
                    gifsData: data,
                    showResults: true
                });
            });
    }

    onPerPageChange(e) {
        this.setState({
            perPage: e.target.value
        });
        this.onSearch();
    }

    render() {
        return (
            <div className="App">
                <Search
                    searchInput={this.state.searchInput}
                    onSubmit={this.onSearch}
                    onPerPageChange={this.onPerPageChange}
                    perPage={this.state.perPage}
                    onInputChange={this.onInputChange}
                />
                {this.state.showResults &&
                <Results
                    resultData={this.state.gifsData}
                />
                }
            </div>
        );
    }
}

export default Homepage;
