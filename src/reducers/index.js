import { dayRangePicker } from 'reducers/Report/dayRangePicker';
import { dailyDataUpdater } from 'reducers/Report/dailyDataUpdater';

import { combineReducers } from 'redux';

const extra = (state = { value: 'this_is_extra_reducer' }, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

const ajustApp = combineReducers({
  dayRangePicker,
  dailyDataUpdater,
  extra
});

export default ajustApp;