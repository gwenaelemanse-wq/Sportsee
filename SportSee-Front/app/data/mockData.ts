export const mockUsers = [
  {
    id: "user123",
    weeklyGoal: 2,
    firstName: "Sophie",
    lastName: "Martin",
    height: 165,
    weight: 60,
    age: 32,
    gender: "female",
    profilePicture: "http://localhost:8000/images/sophie.jpg",
    createdAt: "2025-01-01",
  },
  {
    id: "user789",
    weeklyGoal: 3,
    firstName: "Emma",
    lastName: "Leroy",
    age: 28,
    gender: "female",
    height: 170,
    weight: 62,
    profilePicture: "http://localhost:8000/images/emma.jpg",
    createdAt: "2025-01-01",
  },
];

export const mockActivities = [
  {
    userId: "user123",
    runningData: [
      {
        date: "2025-01-04",
        distance: 5.8,
        duration: 38,
        heartRate: {
          min: 140,
          max: 178,
          average: 163,
        },
        caloriesBurned: 422,
      },
      {
        date: "2025-01-05",
        distance: 3.2,
        duration: 20,
        heartRate: {
          min: 150,
          max: 180,
          average: 171,
        },
        caloriesBurned: 248,
      },
      {
        date: "2025-01-09",
        distance: 6.4,
        duration: 42,
        heartRate: {
          min: 150,
          max: 180,
          average: 163,
        },
        caloriesBurned: 468,
      },
    ],
  },
  {
    userId: "user789",
    runningData: [
      {
        date: "2025-01-04",
        distance: 4.2,
        duration: 30,
        heartRate: {
          min: 150,
          max: 180,
          average: 163,
        },
        caloriesBurned: 310,
      },
    ],
  },
];
