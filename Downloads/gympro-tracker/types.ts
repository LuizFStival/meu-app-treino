export enum Screen {
  HOME,
  WORKOUTS,
  WORKOUT,
  PROGRESS,
  MEASUREMENTS,
  ALERTS,
  EDIT_WORKOUT,
  SETTINGS,
  HISTORY
}

export interface User {
  name: string;
  avatarUrl: string;
}

export interface ExerciseSet {
  id: number;
  weight: number;
  reps: string;
  isDone: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  lastLoad: number;
  sets: ExerciseSet[];
  muscleGroup: string;
  restTime?: number;
  suggestion?: {
    text: string;
    visible: boolean;
  };
}

export interface Workout {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  isArchived?: boolean;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  suggestion: string;
  severity: 'low' | 'medium' | 'high';
  date: string;
}

export interface Measurement {
  date: string;
  weight: number;
  bodyFat: number;
  leanMass: number;
}

export interface ProgressDataPoint {
  date: string;
  weight: number;
  reps: number;
  volume: number;
}

export interface ExerciseProgress {
  exerciseId: string;
  exerciseName: string;
  isPR: boolean;
  data: ProgressDataPoint[];
}

export interface MuscleGroupVolume {
  name: string;
  volume: number;
  fill: string;
}

export interface CompletedWorkout {
  id: string;
  name: string;
  date: string;
  durationInSeconds: number;
  totalVolume: number;
  caloriesBurned?: number;
  exercises: Exercise[];
}