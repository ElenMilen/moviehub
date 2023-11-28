import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchFilm, searchFilm } from './filmAPI';

const initialState = {
  filmList: [],
  filmListFiltered: [],
  status: 'idle',
  filmId: -1,
};

export const getFilms = createAsyncThunk(
  'film/fetchFilm',
  async (data) => {
    const response = await fetchFilm(data);
    return response;
  }
);

export const searchFilms = createAsyncThunk(
  'film/searchFilm',
  async (data) => {
    const response = await searchFilm(data);
    return response;
  }
);

export const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    chooseFilm: (state, action) => {
      state.filmId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFilms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getFilms.fulfilled, (state, action) => {
        state.status = 'idle';
        state.filmList = action.payload.results;
        state.filmListFiltered = action.payload.results;
        state.totalCount = action.payload.total_pages;
      })
      .addCase(getFilms.rejected, (state, action) => {
        state.status = 'rejected';
      })
      .addCase(searchFilms.fulfilled, (state, action) => {
        state.status = 'idle';
        state.filmList = action.payload.results;
        state.filmListFiltered = action.payload.results;
        state.totalCount = action.payload.total_pages;
      })
  },
});

export const { chooseFilm } = filmSlice.actions;

export const selectFilms = (state) => state.film.filmListFiltered;
export const selectFilm = (state) => state.film.filmListFiltered.filter((film)=>{
  return film.id === +state.film.filmId;
})
export const selectPageCount = (state) => state.film.totalCount;

// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default filmSlice.reducer;




//no result , meke push to github