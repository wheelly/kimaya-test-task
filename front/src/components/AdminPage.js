import React, {Component} from 'react';
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom'

import {getStats} from "../actions/admingrid";
import {adminGridConstants} from "../constants";
import PropTypes from 'prop-types'
import MaterialTable from "material-table";

class Grid extends Component {
    static propTypes = {
        columnDefs: PropTypes.array.isRequired,
        rowData: PropTypes.array,
    }

    constructor(props) {
        super(props)
        this.state = { fetched: false }
    }

    loadStats = async () => {
        try {
            const action = await this.props.getStats()
            if (action.type === adminGridConstants.STATS_GRID_SUCCESS)
                this.setState({'fetched': true})

        } catch (e) {
            console.log(`Error=${e}`)
        }
    }

    componentDidMount() {
        this.loadStats()
    }

    render() {
        const { columnDefs, rowData } = this.props
        let columns = []

        /*
        columns = [{headerName: name, field: name}]
        rows = [
            { <field:name>: rowData[<N>][<i>] }
        ]
         */
        if ( this.state.fetched ) {
            columns = columnDefs.map(name => ({title: name, field: name}))
            //rows = rowData.map( row => columnDefs.reduce((acc, item, i) => Object.assign(acc, {[item]: row[i]}), {} ) )
        }

        return (
            <MaterialTable
                title='User Stats'
                columns={columns}
                data={
                    rowData && rowData.map(row => {
                        const {name, email, searchString, videoId, thumbUrl} = row
                        let date = new Date(row.date);
                        return (
                            {
                                date: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
                                name, email, searchString,
                                videoId: <img /*className={classes.img}*/ alt={videoId} src={thumbUrl}/>
                            }
                        )
                    })
                }
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
    columnDefs: state.getStats.columnDefs,
    rowData: state.getStats.rowData,
})

export default withRouter(connect(mapStateToProps, {
    getStats: getStats
})(Grid))
