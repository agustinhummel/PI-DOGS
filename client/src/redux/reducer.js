import { GET_DOGS, GET_NAME, POST_DOG, GET_TEMP, GET_DETAIL, ALPHABETICAL_SORT, WEIGHT_SORT, TEMP_FILTER, CREATED_FILTER } from "./comunes/utils";

const initialState = {
    dogs: [],
    allDogs: [],
    temperament: [],
    dogDetail: [],
    apiDogs: [],
    dbDogs: []
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
                apiDogs: action.payload.filter((d) => !d.createdInDb),
                dbDogs: action.payload.filter((d) => d.createdInDb)
            }

        case GET_NAME:
            const filterByName = state.allDogs.filter((e) => e.name.toLowerCase().includes(action.payload.toLowerCase()))
            return {
                ...state,
                dogs: filterByName
            }

        case POST_DOG:
            return {
                ...state
            }
        case GET_TEMP:
            return {
                ...state,
                temperament: action.payload
            }
        case GET_DETAIL:
            return {
                ...state,
                dogDetail: action.payload
            }
        case ALPHABETICAL_SORT:
            let orderByAlphabetical = action.payload === 'asc'
                ? state.dogs.sort((a, b) => {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return -1;
                    }
                    return 0
                })
                : state.dogs.sort((a, b) => {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {
                        return 1;
                    }
                    return 0
                });
            return {
                ...state,
                dogs: orderByAlphabetical
            };
        case WEIGHT_SORT:
            let sorted = action.payload === 'best'
                ? state.dogs.sort((a, b) => a.weight_Min - b.weight_Min)
                : state.dogs.sort((a, b) => b.weight_Min - a.weight_Min)
            return {
                ...state,
                dogs: sorted
            }
        case TEMP_FILTER:
            let dog = state.allDogs;
            let tempFilter = action.payload === 'All'
                ? dog
                : dog.filter((d) => d.temperament?.includes(action.payload));
            return {
                ...state,
                dogs: tempFilter
            }



        case CREATED_FILTER:
            let createdFilter1 = state.apiDogs;
            let createdFilter2 = state.dbDogs;
            let filtrado = action.payload === 'Api'
                ? createdFilter1.filter(e => !e.createdInDb)
                : createdFilter2.filter(e => e.createdInDb === true)
            return {
                ...state,
                dogs: filtrado
            }



        default:
            return state;
    }
}
