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
            limit: this.props.match.params.limit,
            currPos: this.props.match.params.position,
            showNext: false,
        };

        this.onSearch = this.onSearch.bind(this);
    }

    componentWillReceiveProps(newProps){
        this.setState({
            searchQuery: newProps.match.params.query,
            limit: newProps.match.params.limit,
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
        gifsAPI.setLimit(this.state.limit);
        gifsAPI.setPosition(this.state.currPos);
        gifsAPI.search(this.state.searchQuery)
            .then(data => {
                this.setState({
                    gifsData: data,
                    showResults: true
                });
            });
    }

    render() {
        const nextPos = this.state.showNext ? this.state.currPos + this.state.limit : -1;
        const prevPos = this.state.currPos > 0 ? this.state.currPos - this.state.limit : -1;
        return (
            <div className="App">
                <Search
                    searchQuery={this.state.searchQuery}
                    limit={this.props.match.params.limit}
                />
                {this.state.showResults &&
                <Results
                    resultData={this.state.gifsData}
                    searchQuery={this.state.searchQuery}
                    limit={this.state.limit}
                    nextPos={nextPos}
                    prevPos={prevPos}
                />
                }
            </div>
        );
    }
}

export default SearchPage;
