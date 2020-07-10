// priority: 4 - Blue/mild, 3 - Green/regular, 2 - Yellow/pressing, 1 - Red/high

// export const startingTasksOrder = {
//   0: 'a',
//   1: 'b',
//   2: 'c',
//   3: 'd',
//   4: 'e',
//   5: 'f',
// }
export const startingTasksOrder = ['c', 'b', 'a', 'f', 'd', 'e']

export const startingTasks = [
  {
    id: 'a',
    order: 0,
    title: "A Note",
    // desc: "Remember this note",
    duration: 85,
    startTime: new Date().toISOString(),
    priority: 1,
  },
  {
    id: 'b',
    order: 1,
    title: "Chores",
    desc: "Do your chores like laundry and dishes",
    duration: 40,
    startTime: new Date().toISOString(),
    priority: 2,
  },
  {
    id: 'c',
    order: 2,
    title: "Coding - Session 1",
    desc: "Work on Portfolio and IdleTime with React.js",
    duration: 60,
    startTime: new Date().toISOString(),
    priority: 3,
  },
  {
    id: 'd',
    order: 3,
    title: "Break - Lunch",
    desc: "Eat peas and rice or else...",
    duration: 10,
    startTime: new Date().toISOString(),
    priority: 1,
  },
  {
    id: 'e',
    order: 4,
    title: "Coding - Session 2",
    desc: "Freelance work - Micah's app",
    duration: 25,
    startTime: new Date().toISOString(),
    priority: 4,
  },
  {
    id: 'f',
    order: 5,
    title: "Dinner",
    duration: 60,
    startTime: new Date().toISOString(),
    priority: 3,
  },
]