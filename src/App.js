import React, {Component} from 'react';
import './App.css';
import Search from "./components/Search";
import Table from "./components/Table";

class App extends Component {
    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onPerPageChange = this.onPerPageChange.bind(this);
        this.onPaginationPress = this.onPaginationPress.bind(this);
        this.state = {
            showTable: false,
            tableData: {},
            userName: "css-modules",
            repoName: "css-modules",
            perPage: 10,
            currentPage: 1,
            nextRequest: "",
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
        let fetchUrl = 'https://api.github.com/repos/' + this.state.userName + '/' + this.state.repoName + '/issues';
        fetchUrl += "?page=" + this.state.currentPage + "&per_page=" + this.state.perPage;
        fetchUrl += "&client_id=01a55b5624eff023849f&client_secret=07cf864443d7e80c38273c7253074a9df1adcd5b";
        return fetchUrl;
    }

    onSearch() {
        let fetchUrl = this.getSearchLink();
        fetch(fetchUrl).then(result => {
            let linkValue = result.headers.get('Link');
            this.setState({
                showNext: linkValue.indexOf('next') >= 0,
                showPrev: linkValue.indexOf('prev') >= 0
            });
            return result.json();
        }).then(data => {
            this.setState({
                tableData: data,
                showTable: true
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
                    onSubmit={this.onSearch}
                    onInputChange={this.onInputChange}
                    onPerPageChange={this.onPerPageChange}
                    userName={this.state.userName}
                    userRepo={this.state.repoName}
                    perPage={this.state.perPage}
                />
                {this.state.showTable &&
                <Table
                    showTable={this.state.showTable}
                    tableData={this.state.tableData}
                    userName={this.state.userName}
                    repoName={this.state.repoName}
                    nextRequest={this.state.nextRequest}
                    onSubmit={this.onSearch}
                    showNext={this.state.showNext}
                    showPrev={this.state.showPrev}
                    onPagination={this.onPaginationPress}
                />
                }
            </div>
        );
    }
}

export default App;
