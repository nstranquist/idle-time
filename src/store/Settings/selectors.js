import { createSelector } from 'reselect'

export const selectWorkSettings = (state) => state.settings.work;

export const selectGeneralSettings = (state) => state.settings.general;

export const selectUISettings = (state) => state.settings.ui;

export const selectTimetrackingSettings = (state) => state.settings.timetracking;

export const selectTimeshiftSettings = (state) => state.settings.timeshift;

// Specific Settings
export const selectSidebarOpen = state => state.settings.ui ? state.settings.ui.sidebarOpen : undefined

export const selectTimeframe = state => state.settings.general ? state.settings.general.dayOrWeekView : undefined; // "W" or "D"


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