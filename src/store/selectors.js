// src/store/selectors.js

import { createSelector } from 'reselect'
import { selectTasks, selectTasksOrder } from './Tasks/selectors'

export const selectOrderedTasks = createSelector(
  selectTasks,
  selectTasksOrder, // an array of ordered task ids
  (tasks, order) => {
    const tasksWithOrder = tasks.map((task, index) => {
      if(task) {
        const taskOrder = order.indexOf(task._id)
        console.log('taskOrder:', taskOrder, 'for task with id:', task._id)
        if(taskOrder > -1)
          task.order = taskOrder;
        else {
          task.order = 0;
          console.log('task order was -1')
        }
        console.log('task:', task.title, 'with order:', task.order)
      }
      else console.log('task at index:', index, 'is undefined')
      return task;
    })

    const sortedTasks = tasksWithOrder.sort((a, b) => a.order - b.order);

    return sortedTasks;
  }
)

export const selectDots = createSelector(
  selectOrderedTasks,
  (orderedTasks) => {
    return orderedTasks.map(task => {
      return {
        _id: task._id,
        priority: task.priority,
      }
    })
  }
)

// sort tasks in ascending order by index
// export const selectOrderedTasksOld = createSelector(
//   selectTasks,
//   selectTasksOrder,
//   (tasks, tasksOrder) => {
//     const fullTasks = tasks.map((task, index) => {
//       const order = tasksOrder.indexOf(task._id)
//       if(order < 0)
//         console.log('error: task with id:', task._id, 'not found, so cannot be ordered')
      
//       task.order = order;
//       return task;
//     })

//     const sortedTasks = fullTasks.sort((a, b) => a.order - b.order);

//     console.log('sorted tasks:', sortedTasks);
//     return sortedTasks;
//   }
// )
    // first sort the tasksOrder
    // const myTasksOrder = tasksOrder.sort((a, b) => a - b)

    // console.log('sorted tasks order:', myTasksOrder)

    // then render it in the same order...
    // const myOrderedTaskIds = Object.keys(myTasksOrder);

    // map through tasksOrder, get index and order for reach iteration
    // const myTasks = myOrderedTaskIds.map((id, index) => { // where index is the order, since it's already ordered
    //   const currentTask = tasks.find(task => task._id === id)
    //   currentTask.order = index;
    //   return currentTask;
    // })

    // const tasksIteration = tasks.map((task, index) => {
    //   const taskOrder = tasksOrder.find(id => task._id === id)
    // })

    // const myOrderedTasks = myTasks.sort((a, b) => a.order - b.order)
    // console.log('sorted tasks:', myOrderedTasks)
    // return myOrderedTasks;
//   }
// )

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