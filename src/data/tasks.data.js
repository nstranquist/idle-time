// priority: 4 - Blue/mild, 3 - Green/regular, 2 - Yellow/pressing, 1 - Red/high

export const startingTasks = [
  {
    id: 'a', 
    title: "A Note",
    // desc: "Remember this note",
    duration: 85,
    startTime: new Date().toISOString(),
    priority: 1,
  },
  {
    id: 'b',
    title: "Chores",
    desc: "Do your chores like laundry and dishes",
    duration: 40,
    startTime: new Date().toISOString(),
    priority: 2,
  },
  {
    id: 'c',
    title: "Coding - Session 1",
    desc: "Work on Portfolio and IdleTime with React.js",
    duration: 60,
    startTime: new Date().toISOString(),
    priority: 3,
  },
  {
    id: 'd',
    title: "Break - Lunch",
    desc: "Eat peas and rice or else...",
    duration: 10,
    startTime: new Date().toISOString(),
    priority: 1,
  },
  {
    id: 'e',
    title: "Coding - Session 2",
    desc: "Freelance work - Micah's app",
    duration: 25,
    startTime: new Date().toISOString(),
    priority: 4,
  },
  {
    id: 'f',
    title: "Dinner",
    duration: 60,
    startTime: new Date().toISOString(),
    priority: 3,
  },
]