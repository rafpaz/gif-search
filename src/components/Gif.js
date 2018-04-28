import React, {Component} from 'react';
import gifsAPI from "../gifsAPI";

class GifView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gifUrl: "",
            title: ""
        };
    }

    componentDidMount() {
        gifsAPI.gif(this.props.match.params.id)
            .then(gifData => {
                this.setState({
                    gifUrl: gifData.results[0].media[0].gif.url,
                    title: gifData.title
                });
            });
    }

    render() {
        return (
            <div id={"gif-view"}>
                <img src={this.state.gifUrl} alt={this.state.title}/>
            </div>
        );
    }
}

export default GifView;
