import { startingTasks, startingTasksOrder } from '../../data/tasks.data'

export const createTaskIdsFromTasks = (tasks, tasksOrder) => {
  const unorderedIds = taskData.map(task => {
    return task.id;
  })

  const orderedIds = unorderedIds;
}

const taskIds = createTaskIdsFromTasks(startingTasks, startingTasksOrder)

console.log('ordered task ids:', taskIds)