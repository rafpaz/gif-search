import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow';

class Table extends Component {
    render() {
        const rows = this.props.tableData.map((issue, i) => <TableRow key={i } data={issue} i={i}/>);
        return (
            <div className="table">
                <div className="header">
                    <div>Number</div>
                    <div>Title</div>
                    <div>Creation Date</div>
                </div>
                <div className="body">
                    {rows}
                </div>
                <div id="btn-container">
                    {this.props.showPrev && <button onClick={this.props.onPagination}> Prev </button>}
                    {this.props.showNext && <button onClick={this.props.onPagination}> Next </button>}
                </div>
            </div>
        );
    }
}

Table.propTypes = {
    showTable: PropTypes.bool,
    tableData: PropTypes.array,
    nextRequest: PropTypes.string,
    onPagination: PropTypes.func,
    onSubmit: PropTypes.func,
    showNext: PropTypes.bool,
    showPrev: PropTypes.bool
};

export default Table;
