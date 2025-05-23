import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Plan } from '@/lib/hooks/usePlans';

interface PlanState {
  plans: Plan[];
}

const initialState: PlanState = {
  plans: [],
};

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    setPlanss: (state, action: PayloadAction<Plan[]>) => {
      state.plans = action.payload;
    },
  },
});

export const { setPlanss } = planSlice.actions;
export default planSlice.reducer;
