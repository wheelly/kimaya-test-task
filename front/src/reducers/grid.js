import {gridConstants} from "../constants";

export const getUserStats = (state = {}, action)  => {
    switch (action.type) {
        case gridConstants.DOMAIN_GRID_REQUEST:
            return {}
        case gridConstants.DOMAIN_GRID_SUCCESS:
            return { columnDefs: ['id', 'email', 'fullname'], rowData: action.response }
        case gridConstants.DOMAIN_GRID_FAILURE:
            return {};
        default:
            return state
    }
}