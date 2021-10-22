import { GLOBALTYPES } from '../actions/globalTypes'

const initialState = {
    user: [],
    isLogged: false,
    isAdmin: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type){
        case GLOBALTYPES.AUTH:
            return action.payload;
        default:
            return state;
    }
}


export default authReducer














// import { TYPES } from '../actions/authAction'

// const initialState = {}

// const authReducer = (state = initialState, action) => {
//     switch (action.type){
//         case TYPES.AUTH:
//             return action.payload;
//         default:
//             return state;
//     }
// }


// export default authReducer

