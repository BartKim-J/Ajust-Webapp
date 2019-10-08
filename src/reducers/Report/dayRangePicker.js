import { 
  WEEK_UPDATE_DATE, 
  MONTH_UPDATE_DATE, 
  RESET_DATE 
} from 'actions';

const _dayRange = {
  startDate: new Date(),
  endDate: new Date()
};

const _dayRangePickerInitialState = {
  weekRange: _dayRange,
  monthRange: _dayRange
};


export const dayRangePicker = (state = _dayRangePickerInitialState, action) => {
  switch(action.type) {
    case WEEK_UPDATE_DATE:
      return Object.assign({}, state, {
        weekRange: action.dateRange
      });

    case MONTH_UPDATE_DATE:
      return Object.assign({}, state, {
        monthRange: action.dateRange
      });

    case RESET_DATE:
      return Object.assign({}, state, {
        weekRange: _dayRange,
        monthRange: _dayRange
      });
    default:
      return state;
  }
};

