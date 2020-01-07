const initialState = {
    name: 'relationships'
}

const bookReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'CHANGE_BOOK':
            return {...state,
                 name: action.payload
                }
        default:
            return state
    }
}

export default bookReducer;  