import React, {Component} from 'react';
import gifsAPI from "../gifsAPI";

class SingleView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gifUrl: "",
            title: ""
        };
        this.backEvent = this.backEvent.bind(this);
        this.share = this.share.bind(this);
    }

    backEvent() {
        window.history.back();
    }

    share() {

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
            <div id={"single-view"}>
                <div className="vertical-center">
                    <div className="container" id={"search-container"}>
                        <button className={"row btn btn-outline-secondary"}
                                onClick={this.backEvent}>
                            Back
                        </button>
                        <div className="row justify-content-md-center">
                            <img src={this.state.gifUrl} alt={this.state.title}/>
                        </div>
                        <button className={"row btn btn-primary"} onClick={this.share}>Share
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleView;
