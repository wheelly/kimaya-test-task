import {adminGridConstants} from "../constants";

export const getStats = (state = {}, action)  => {

    switch (action.type) {
        case adminGridConstants.STATS_GRID_REQUEST:
        case adminGridConstants.STATS_GRID_FAILURE:
            return { rowData: {} }
        case adminGridConstants.STATS_GRID_SUCCESS:
            return { rowData: action.response }
        default:
            return state
    }
}