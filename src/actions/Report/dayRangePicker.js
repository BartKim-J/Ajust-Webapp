export const WEEK_UPDATE_DATE  = 'WEEK_UPDATE_DATE';
export const MONTH_UPDATE_DATE = 'MONTH_UPDATE_DATE';
export const RESET_DATE        = 'RESET_DATE';

export function updateWeekRange(dateRange) {
  return {
    type: WEEK_UPDATE_DATE,
    dateRange: dateRange
  };
}

export function updateMonthRange(dateRange) {
  return {
    type: MONTH_UPDATE_DATE,
    dateRange: dateRange
  };
}

export function resetDateRange() {
  return {
    type: RESET_DATE
  };
}
