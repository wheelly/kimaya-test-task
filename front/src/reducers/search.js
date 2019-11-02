import {userConstants} from "../constants";

export const searchCore = (state = {}, action)  => {

    const noItems = {items: []}

    switch (action.type) {
        case userConstants.SEARCH_REQUEST:
            return { ...state, noItems }
        case userConstants.SEARCH_SUCCESS:
            const r = action.response
            return { ...r.body }
        case userConstants.SEARCH_FAILURE:
            return { ...state, noItems };
        default:
            return { ...state, noItems }
    }

}


export const playVideo = (state = {}, action)  => {
    if ( action.type === userConstants.PLAY_BUTTON_CLICKED )
        return { videoId: action.videoId }
    return { videoId: userConstants.DEFAULT_VIDEO }
}

