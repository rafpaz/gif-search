import React, {Component} from 'react';
import Search from "./Search";
import Results from "./Results";
import gifsAPI from "../gifsAPI";

class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showResults: false,
            searchQuery: this.props.match.params.query,
            perPage: this.props.match.params.limit,
            currentPage: 1,
            nextPos: this.props.match.params.position,
            showNext: false,
            showPrev: false
        };

        this.onSearch = this.onSearch.bind(this);
    }

    componentWillReceiveProps(newProps){
        this.setState({
            searchQuery: newProps.match.params.query,
            perPage: newProps.match.params.limit,
            nextPos: newProps.match.params.position,
            },
            function(){
                this.onSearch();
            });
    }

    componentDidMount(){
        this.onSearch();
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

    onSearch() {
        this.setState({
            gifsData: {},
        });
        gifsAPI.setLimit(this.state.perPage);
        gifsAPI.search(this.state.searchQuery)
            .then(data => {
                this.setState({
                    gifsData: data,
                    showResults: true
                });
            });
    }

    render() {
        return (
            <div className="App">
                <Search
                    searchQuery={this.state.searchQuery}
                    onSearch={this.onSearch}
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

export default SearchPage;
