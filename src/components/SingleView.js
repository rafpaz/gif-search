import React, {Component} from 'react';
import gifsAPI from "../gifsAPI";
import CopyToClipboard from 'react-copy-to-clipboard';

class SingleView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gifUrl: "",
            title: "",
            copied: false
        };
        this.backEvent = this.backEvent.bind(this);
        this.onCopy = this.onCopy.bind(this);
    }

    backEvent() {
        window.history.back();
    }

    onCopy = () => {
        this.setState({copied: true});
    };

    componentDidMount() {
        gifsAPI.gif(this.props.match.params.id)
            .then(gifData => {
                this.setState({
                    gifUrl: gifData.results[0].media[0].gif.url,
                    title: gifData.title,
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
                        <CopyToClipboard onCopy={this.onCopy} text={window.location.href.replace("single","gif")}>
                            <button className={"row btn btn-primary"}>Share</button>
                        </CopyToClipboard>
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleView;
