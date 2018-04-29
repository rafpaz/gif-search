import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';
import {Link} from 'react-router-dom';


const masonryOptions = {
    transitionDuration: 0,
    gutter: 10
};

class Results extends Component {
    render() {
        let childElements, showResults = false;
        if (this.props.resultData.results) {
            showResults = true;
            childElements = this.props.resultData.results.map(function (gif, i) {
                return (
                    <li key={"gif-" + i} className="gif-result">
                        <Link to={"/single/" + gif.id}>
                            <img src={gif.media[0].tinygif.url} alt={gif.title}/>
                        </Link>
                    </li>
                );
            });
        }
        return (
            <div>
                {showResults &&
                <div>
                    <Masonry
                        className={'results'}
                        elementType={'ul'}
                        options={masonryOptions}
                        disableImagesLoaded={false}
                        updateOnEachImageLoad={true}
                    >
                        {childElements}
                    </Masonry>
                    <div id={"navigation-btns"}>
                        {this.props.prevPos !== -1 &&
                            <Link to={"/search/" + this.props.searchQuery + "/" + this.props.limit + "/" + this.props.prevPos}>
                                <button type="button" className="btn btn-secondary"><i
                                    className="material-icons">navigate_before</i>
                                </button>
                            </Link>
                        }
                        {this.props.nextPos !== -1 &&
                        <Link to={"/search/" + this.props.searchQuery + "/" + this.props.limit + "/" + this.props.nextPos}>
                            <button type="button" className="btn btn-secondary"><i
                                className="material-icons">navigate_next</i>
                            </button>
                        </Link>
                        }
                    </div>
                </div>
                }

            </div>
        );
    }
}

Results.propTypes = {
    resultData: PropTypes.object,
    nextPos: PropTypes.number,
    prevPos: PropTypes.number,
    searchQuery: PropTypes.string,
    limit: PropTypes.number
};

export default Results;
