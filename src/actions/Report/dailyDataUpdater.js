export const DAILY_RESULT_UPDATE = 'DAILY_RESULT_UPDATE';
export const DAILY_STATUS_UPDATE = 'DAILY_STATUS_UPDATE';
export const RESET_DAILY_DATAS = 'RESET_DAILY_DATAS';

export function updateDailyResult(dailyResult) {
  return {
    type: DAILY_RESULT_UPDATE,
    dailyResult
  };
}

export function updateDailyStatus(dailyStatus) {
  return {
    type: DAILY_STATUS_UPDATE,
    dailyStatus
  };
}

export function resetDailyDatas() {
  return {
    type: RESET_DAILY_DATAS
  };
}