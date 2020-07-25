import { createSelector } from 'reselect'

export const selectPresets = state => state.presets.presets;

export const selectPresetTaskIds = createSelector(
  selectPresets,
  (presets) => {
    console.log('selecting presets')
    return presets
      .filter(preset => preset.taskData ? preset.taskData._id ? true : false : false)
      .map(preset => preset.taskData._id)
  }
)

export const selectPresetTasks = createSelector(
  selectPresets,
  (presets) => {
    return presets.filter(preset => preset.category === 'task')
  }
)

export const selectPresetTimeshift = createSelector(
  selectPresets,
  (presets) => {
    return presets.filter(preset => preset.category === 'timeshift')
  }
)

export const selectPresetSchedule = createSelector(
  selectPresets,
  (presets) => {
    return presets.filter(preset => preset.category === 'schedule')
  }
)

export const selectPresetErrors = state => state.presets.errors;

export const selectPresetLoading = state => state.presets.loading;
