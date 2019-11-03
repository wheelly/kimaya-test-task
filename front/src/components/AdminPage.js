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

        } catch (err) {
            console.log('PROMISE ERROR')
        }
    }


    componentDidMount() {
        this.loadStats()
    }

    render() {
        const { columnDefs, rowData } = this.props
        const columns = ['date', 'name', 'email', 'searchString', 'videoId'].map(name => ({title: name, field: name}))

        return (
            <MaterialTable
                title='User Stats'
                columns={columns}
                data = {
                    this.state.fetched ? Object.keys(rowData).map(key => {
                        const {name, email, searchString, videoId, thumbUrl} = rowData[key]
                        let date = new Date(rowData[key].date);
                        return ({
                                date: date.toLocaleDateString() + ' ' + date.toLocaleTimeString(),
                                name, email, searchString,
                                videoId: <img /*className={classes.img}*/ alt={videoId} src={thumbUrl}/>
                            })
                        }
                    )
                        : undefined
                }

                onRowClick={((evt, hoveredRow) => this.setState({ hoveredRow }))}
                options={{
                    sorting: true,
                    pageSize: 50,
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
