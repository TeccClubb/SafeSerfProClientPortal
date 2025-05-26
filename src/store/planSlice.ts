import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Plan } from '@/lib/hooks/usePlans';

interface PlanState {
  plans: Plan[];
  selectedPlan: Plan | null;
}

const initialState: PlanState = {
  plans: [],
  selectedPlan: null,
};

const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    setPlanss: (state, action: PayloadAction<Plan[]>) => {
      state.plans = action.payload;
    },
    setSelectedPlan: (state, action: PayloadAction<Plan>) => {
      state.selectedPlan = action.payload;
    },
  },
});

export const { setPlanss, setSelectedPlan } = planSlice.actions;
export default planSlice.reducer;
