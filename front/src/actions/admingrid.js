import {adminGridConstants, endPoints} from "../constants";

const getStatsImpl = (userId, userToken) => ({
    types: [adminGridConstants.STATS_GRID_REQUEST, adminGridConstants.STATS_GRID_SUCCESS, adminGridConstants.STATS_GRID_FAILURE],
    endpoint: endPoints.USER_STATS,
    method: 'GET',
})

export const getStats = (user) => (dispatch, getState) => (
    dispatch(getStatsImpl())
)