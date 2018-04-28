import React, {Component} from 'react';
import Search from "./Search";

class Homepage extends Component {
    render() {
        return (
            <div className="App">
                <h1 id={"logo"}>Gif Search</h1>
                <Search
                    searchQuery={""}
                />
            </div>
        );
    }
}

export default Homepage;
