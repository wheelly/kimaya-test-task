import {adminGridConstants} from "../constants";

export const getStats = (state = {}, action)  => {
    switch (action.type) {
        case adminGridConstants.STATS_GRID_REQUEST:
            return {}
        case adminGridConstants.STATS_GRID_SUCCESS:
            return { columnDefs: ['date', 'name', 'email', 'searchString', 'videoId'], rowData: action.response }
        case adminGridConstants.STATS_GRID_FAILURE:
            return {};
        default:
            return state
    }
}