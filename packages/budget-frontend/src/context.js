import { createContext } from 'react';

export const initialState = {
    activeDate: null,
};

export const updateActiveDate = 'updateActiveDate';

export function reducer(state, action) {
    switch (action.type) {
        case updateActiveDate:
            return {
                ...state,
                activeDate: action.payload,
            };
        default:
            return {
                ...state,
            };
    }
}

export const ActiveDateContext = createContext();
