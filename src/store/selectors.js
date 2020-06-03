// src/store/selectors.js



export const selectActiveItem = state => {
  // find item in state.example.items, using the 'activeId' in state.example.activeId
  const activeId = state.example.activeId;
  if(activeId) {
    const activeItem = state.example.items.find(item => item.id === activeId)
    if(activeItem) {
      console.log('found activeItem:', activeItem)
      return activeItem
    }
    else {
      console.log('no item was found matching the activeId')
      return undefined;
    }
  }
  else {
    console.log('no activeId was found, so no item could be matched')
    return undefined
  }
}

export const selectUpcomingTasks = state => {
  // return an array of the tasks which are upcoming (or present), not past
  // todo: ...
  
  return state.tasks.tasks;
}