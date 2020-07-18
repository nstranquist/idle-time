// import { createSelector } from 'reselect'

export const selectTasks = state => state.tasks.tasks;

export const selectTasksOrder = state => state.tasks.order;

export const selectTasksLoading = state => state.tasks.loading;

export const selectTasksErrors = state => state.tasks.errors;
