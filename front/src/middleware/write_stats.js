import { callApi } from './callapi'
import { userConstants } from '../constants/user'
import {endPoints} from "../constants";

export default store => next => async action => {
    switch ( action.type ) {
        case userConstants.PLAY_BUTTON_CLICKED:
            break;
        default:
            return next(action)
    }

    const token = sessionStorage.getItem('x-auth-token')

    if ( !token || token === 'undefined') {
        return next({
            type: userConstants.STATS_WRITE_FAILURE,
            error: 'x-auth-token token is missing'
        })
    }

    const { searchString, videoId, videoDuration, thumbUrl } = action

    const statsReq = { searchString, videoId, thumbUrl, videoDuration: (videoDuration || 0), 'x-auth-token': token }

    console.log(`Writing to stats ${JSON.stringify(statsReq)}`)

    await writeStats(next, action, {
        endpoint: endPoints.STATS_WRITE,
        method: 'POST',
        fields: statsReq
    })
}

const writeStats = async (next, action, statAction) => {
    try {
        await callApi(statAction)
        return next(action)
    } catch (e) {
        return next({
            type: userConstants.STATS_WRITE_FAILURE,
            error: e.message || 'Something bad happened'
        })
    }
}