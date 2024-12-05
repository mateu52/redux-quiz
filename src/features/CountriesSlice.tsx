import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCountries = createAsyncThunk<Country[]>(
    'country/fetchCountries',
    async () => {
        const countriesResponse = await fetch('./data/data.json');
        if(!countriesResponse.ok){
            throw new Error('Failed to fetch data')
        }
        const countriesData = await countriesResponse.json();

        return countriesData.countries;
    }
)
interface Country {
    country: string;
    capital: string;
}

interface CountriesState {
    countries: Country[];
    loading: boolean;
    error: string | null;
    counter: number;
}

const initialState: CountriesState = {
    countries: [],
    loading: false,
    error: null,
    counter: 0,
};

const countriesSlice =  createSlice({
    name:'quiz',
    initialState,
    reducers:{
        incremenCounter: (state) => {
            state.counter +=1;
        },
        decrementCounter: (state) => {
            state.counter -=1;
        },
        resetCounter: (state) => {
            state.counter = 0;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.countries = action.payload;
                state.loading = false;
            })
            .addCase(fetchCountries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch countries';
            });
    }

})
export const { incremenCounter, decrementCounter, resetCounter } = countriesSlice.actions;
export default countriesSlice.reducer;