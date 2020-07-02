// src/store/selectors.js

import { createSelector } from 'reselect'


export const selectTasks = state => state.tasks.tasks;

export const selectSidebarOpen = state => state.ui.sidebarOpen;

export const selectDots = createSelector(
  selectTasks,
  (tasks) => {
    return tasks.map(task => {
      return {
        id: task.id,
        priority: task.priority,
      }
    })
  }
)

// sort tasks in ascending order by index
export const selectOrderedTasks = createSelector(
  selectTasks,
  (tasks) => {
    const myTasks = tasks.sort((a, b) => a.index - b.index)
    console.log('sorted tasks:', myTasks)
    return myTasks;
  }
)

export const selectActiveItem = state => {
  // find item in state.example.items, using the 'activeId' in state.example.activeId
  // const activeId = state.example.activeId;
  // if(activeId) {
  //   const activeItem = state.example.items.find(item => item.id === activeId)
  //   if(activeItem) {
  //     console.log('found activeItem:', activeItem)
  //     return activeItem
  //   }
  //   else {
  //     console.log('no item was found matching the activeId')
  //     return undefined;
  //   }
  // }
  // else {
  //   console.log('no activeId was found, so no item could be matched')
  //   return undefined
  // }

  return state.tasks.tasks[0]
}

export const selectUpcomingTasks = state => {
  // return an array of the tasks which are upcoming (or present), not past
  // todo: ...
  
  return state.tasks.tasks;
}