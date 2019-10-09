import { DAILY_RESULT_UPDATE, DAILY_STATUS_UPDATE, RESET_DAILY_DATAS } from 'actions';

const dailyDataInitialState = {
  DailyResultData: undefined,
  DailyResultStatus: undefined,
};

export const dailyDataUpdater = (state = dailyDataInitialState, action) => {
  switch (action.type) {
    case DAILY_RESULT_UPDATE:
      return { ...state, DailyResultData: action.dailyResult,};

    case DAILY_STATUS_UPDATE:
      return { ...state, DailyResultStatus: action.dailyStatus,};

    case RESET_DAILY_DATAS:
      return { ...state, DailyResultData: undefined,
        DailyResultStatus: undefined,};
    default:
      return state;
  }
};

export default dailyDataUpdater;