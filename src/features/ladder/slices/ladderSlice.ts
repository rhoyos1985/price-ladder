import { createSlice } from '@reduxjs/toolkit';
import { LadderState } from '../types/LadderTipes';

const initialState: LadderState = {
  levels: [],
};

export const ladderSlice = createSlice({
  name: 'ladder',
  initialState,
  reducers: {
    setLevels(state, action) {
      state.levels = action.payload;
    },
    updateLevel(state, action) {
      const idx = state.levels.findIndex(l => l.price === action.payload.price);
      if (idx !== -1) {
        state.levels[idx] = {
          ...state.levels[idx],
          ...action.payload,
        };
      }
    },
  },
});

export const { setLevels, updateLevel } = ladderSlice.actions;
export default ladderSlice.reducer;
