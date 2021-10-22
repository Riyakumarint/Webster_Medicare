import { GLOBALTYPES } from '../actions/globalTypes'

const initialState = {}

const alertReducer = (state = initialState, action) => {
    switch (action.type){
        case GLOBALTYPES.ALERT:
            return action.payload;
        default:
            return state;
    }
}


export default alertReducer













// import { TYPES } from '../actions/notifyAction'

// const initialState = {}

// const notifyReducer = (state = initialState, action) => {
//     switch (action.type){
//         case TYPES.NOTIFY:
//             return action.payload;
//         default:
//             return state;
//     }
// }


// export default notifyReducer

