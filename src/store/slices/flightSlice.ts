import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable */
const url = 'https://course-api.com/react-useReducer-cart-project';


interface StateType {
    flightData: any[],
    isLoading: boolean,
}
const initialState: StateType = {
    flightData: [],
    isLoading: true,
};
/* eslint-disable no-param-reassign */
const flightSlice: any = createSlice({
    name: 'launches',
    initialState,
    reducers: {
        setLaunches: (state, action) => {
            state.flightData = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});
/* eslint-enable no-param-reassign */

// console.log(flightSlice);
export const { setLaunches, setIsLoading } = flightSlice.actions;

export default flightSlice.reducer;
