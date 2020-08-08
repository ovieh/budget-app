/* eslint-disable indent */
import { createContext, Dispatch } from 'react';

type Action = { type: 'updateActiveDate'; payload: { year: number; month: number } };

type State = {
    activeDate: { year: number | null; month: number | null };
};

export const initialState = {
    activeDate: { year: null, month: null },
};

export const updateActiveDate = 'updateActiveDate';

export function reducer(state: State, action: Action) {
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

export const ActiveDateContext = createContext<{
    store: State;
    dispatch: Dispatch<Action>;
}>({ store: initialState, dispatch: () => null });
