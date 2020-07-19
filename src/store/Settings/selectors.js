import { createSelector } from 'reselect'

export const selectWorkSettings = (state) => state.settings.work;

export const selectGeneralSettings = (state) => state.settings.general;

export const selectUISettings = (state) => state.settings.ui;

export const selectTimetrackingSettings = (state) => state.settings.timetracking;

export const selectTimeshiftSettings = (state) => state.settings.timeshift;


// export const selectSettingsReady = createSelector(
//   selectWorkSettings,
//   selectGeneralSettings,
//   selectUISettings,
//   selectTimeshiftSettings,
//   selectTimetrackingSettings,
//   (work, general, ui, timeshift, timetracking) => {
//     if(work && general && ui && timeshift && timetracking)
//       return true;
//     else
//       return false;
//   }
// )