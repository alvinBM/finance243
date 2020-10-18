// Store/Reducers/accountReducer.js

const initialState = { 
    user_data: {},
    user_connected : false
}

function account(state = initialState, action) {
    let nextState
    switch (action.type) {

        case 'SET_CONNECTION':

            //Modifier le state account data
            nextState = {
                ...state,
                user_connected: action.value
            }
            
            return nextState || state //Renvoie state si nextState est undefined

        
        case 'SET_USER_DATA':

                //Modifier le state account data
                nextState = {
                    ...state,
                    user_data: action.value
                }
                
                return nextState || state //Renvoie state si nextState est undefined

        default:
            return state
    }
}

export default account