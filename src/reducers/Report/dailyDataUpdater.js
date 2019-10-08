import {
    DAILY_RESULT_UPDATE,
    DAILY_STATUS_UPDATE,
    RESET_DAILY_DATAS,
} from 'actions';

const _dailyDataInitialState = {
    DailyResultData: undefined,
    DailyResultStatus: undefined,
};

export const dailyDataUpdater = (state = _dailyDataInitialState, action) => {
    switch (action.type) {
        case DAILY_RESULT_UPDATE:
            return Object.assign({}, state, {
                DailyResultData: action.dailyResult
            });

        case DAILY_STATUS_UPDATE:
            return Object.assign({}, state, {
                DailyResultStatus: action.dailyStatus
            });

        case RESET_DAILY_DATAS:
            return Object.assign({}, state, {
                DailyResultData: undefined,
                DailyResultStatus: undefined
            });
        default:
            return state;
    }
};

