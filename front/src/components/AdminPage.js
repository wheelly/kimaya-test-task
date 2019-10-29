import React, {Component} from 'react';
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom'

import {getStats} from "../actions/grid";
import {gridConstants} from "../constants";
import PropTypes from 'prop-types'
import MaterialTable from "material-table";

class Grid extends Component {
    static propTypes = {
        columnDefs: PropTypes.array.isRequired,
        rowData: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props)
        this.state = { fetched: false }
    }

    componentDidMount() {
        //const user = loadUserSession()


        /*
        if (user) {

            this.props.getDomains(user)
                .then(
                    (action) => {
                        if ( action.type === gridConstants.DOMAIN_GRID_SUCCESS) {
                            this.setState({'fetched': true})
                        }
                    },
                    (error) => console.log('REJECTED PROMISE', error)
                )
        }

         */
    }

    render() {
        const { columnDefs, rowData } = this.props
        let columns = []
        let rows = []
        /*
        This is a special presentation for https://www.ag-grid.com/
        columns = [{headerName: name, field: name}]
        rows = [
            { <field:name>: rowData[<N>][<i>] }
        ]
         */
        if ( this.state.fetched ) {
            columns = columnDefs.map(name => ({title: name, field: name}))
            rows = rowData.map( row => columnDefs.reduce((acc, item, i) => Object.assign(acc, {[item]: row[i]}), {} ) )
        }
        return (
            <MaterialTable
                refs='listGrid'
                title={this.props.title}
                columns={columns}
                data={rows}
                onRowClick={((evt, hoveredRow) => this.setState({ hoveredRow }))}
                options={{
                    sorting: true,
                    pageSize: 10,
                    rowStyle: rowData => ({
                        backgroundColor: (this.state.hoveredRow && this.state.hoveredRow.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
                    })
                }}

            />
        )
    }
}

const mapStateToProps = state => ({
    columnDefs: state.getDomains.columnDefs,
    rowData: state.getDomains.rowData,
})

export default withRouter(connect(mapStateToProps, {
    getStats: getStats
})(Grid))
