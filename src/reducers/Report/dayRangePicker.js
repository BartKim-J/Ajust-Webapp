import { WEEK_UPDATE_DATE, MONTH_UPDATE_DATE, RESET_DATE } from 'actions';

const dayRange = {
  startDate: new Date(),
  endDate: new Date(),
};

const dayRangePickerInitialState = {
  weekRange: dayRange,
  monthRange: dayRange,
};

export const dayRangePicker = (state = dayRangePickerInitialState, action) => {
  switch (action.type) {
    case WEEK_UPDATE_DATE:
      return {
        ...state,
        weekRange: action.dateRange,
      };

    case MONTH_UPDATE_DATE:
      return {
        ...state,
        monthRange: action.dateRange,
      };

    case RESET_DATE:
      return {
        ...state,
        weekRange: dayRange,
        monthRange: dayRange,
      };
    default:
      return state;
  }
};

export default dayRangePicker;
