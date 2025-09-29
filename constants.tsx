import React from 'react';
import type { User, Workout, Alert, Measurement, ExerciseProgress, MuscleGroupVolume } from './types';

export const ICONS = {
    HOME: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
    ),
    WORKOUT: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15.63 13.5a4 4 0 1 0-5.26 5.26" /><path d="M18.5 10.5a4 4 0 1 0-5.26-5.26" /><path d="M10.5 18.5a4 4 0 1 0 5.26-5.26" /><path d="M5.5 13.5a4 4 0 1 0-5.26 5.26" /><circle cx="12" cy="12" r="2" /></svg>
    ),
    PROGRESS: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
    ),
    MEASUREMENTS: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L3 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0Z"></path><path d="m14.5 12.5 2-2"></path><path d="m11.5 9.5 2-2"></path><path d="m8.5 6.5 2-2"></path><path d="m17.5 15.5 2-2"></path></svg>
    ),
    ALERTS: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
    ),
    CHECK: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"></polyline></svg>
    ),
    PLUS: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
    ),
    CHEVRON_RIGHT: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="9 18 15 12 9 6"></polyline></svg>
    ),
    CHEVRON_LEFT: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="15 18 9 12 15 6"></polyline></svg>
    ),
    CHEVRON_UP: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="18 15 12 9 6 15"></polyline></svg>
    ),
    CHEVRON_DOWN: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="6 9 12 15 18 9"></polyline></svg>
    ),
    WARNING: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
    ),
    FIRE: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 4.5c.2-.8.5-1.5.9-2.2M17.5 12a5.5 5.5 0 1 1-5.5-5.5c.3.5.6 1 .9 1.5M12 15a6 6 0 0 1 6-6c0 3.3-2.7 6-6 6Z"></path><path d="M8.8 17.5c-1.2 0-2.3-.4-3.3-1.2"></path><path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Z"></path><path d="M22 12a10 10 0 0 0-20 0h20Z"></path></svg>
    ),
    SKIP: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19"></line></svg>
    ),
    TRASH: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
    ),
    EDIT: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
    ),
    SETTINGS: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.12l-.15.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1 0 2.12l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
    ),
    HISTORY: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M12 7v5l4 2"></path></svg>
    ),
    MORE_VERTICAL: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
    ),
    ARCHIVE: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8"></path><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
    ),
    UNARCHIVE: (props: React.SVGProps<SVGSVGElement>) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8"></path><rect x="1" y="3" width="22" height="5"></rect><polyline points="10 12 12 10 14 12"></polyline><line x1="12" y1="10" x2="12" y2="16"></line></svg>
    ),
};

export const MOCK_USER: User = {
    name: "Alex Silva",
    avatarUrl: "https://picsum.photos/id/237/100"
};

export const MOCK_WORKOUT_A: Workout = {
    id: "workout1",
    name: "Treino A",
    description: "Peito & Tríceps",
    exercises: [
        { id: "ex1", name: "Supino Reto", lastLoad: 80, muscleGroup: "Peito", sets: [{id:1, weight: 80, reps: '8', isDone: false}, {id:2, weight: 80, reps: '8', isDone: false}, {id:3, weight: 80, reps: '6', isDone: false}, {id:4, weight: 75, reps: '10', isDone: false}], suggestion: { text: "Tente 82.5kg", visible: true }, restTime: 90 },
        { id: "ex2", name: "Supino Inclinado c/ Halteres", lastLoad: 30, muscleGroup: "Peito", sets: [{id:1, weight: 30, reps: '10', isDone: false}, {id:2, weight: 30, reps: '10', isDone: false}, {id:3, weight: 28, reps: '12', isDone: false}] },
        { id: "ex3", name: "Tríceps Pulley", lastLoad: 40, muscleGroup: "Tríceps", sets: [{id:1, weight: 40, reps: '12', isDone: false}, {id:2, weight: 40, reps: '12', isDone: false}, {id:3, weight: 35, reps: '15', isDone: false}] },
        { id: "ex4", name: "Flexão de Braço", lastLoad: 0, muscleGroup: "Peito", sets: [{id:1, weight: 0, reps: '15', isDone: false}, {id:2, weight: 0, reps: '15', isDone: false}, {id:3, weight: 0, reps: '12', isDone: false}]},
    ]
};

export const MOCK_WORKOUT_B: Workout = {
    id: "workout2",
    name: "Treino B",
    description: "Costas & Bíceps",
    exercises: [
        { id: "ex5", name: "Barra Fixa", lastLoad: 0, muscleGroup: "Costas", sets: [{id:1, weight: 0, reps: '8', isDone: false}, {id:2, weight: 0, reps: '8', isDone: false}, {id:3, weight: 0, reps: '6', isDone: false}] },
        { id: "ex6", name: "Remada Curvada", lastLoad: 60, muscleGroup: "Costas", sets: [{id:1, weight: 60, reps: '10', isDone: false}, {id:2, weight: 60, reps: '10', isDone: false}, {id:3, weight: 60, reps: '10', isDone: false}] },
        { id: "ex7", name: "Rosca Direta", lastLoad: 14, muscleGroup: "Bíceps", sets: [{id:1, weight: 14, reps: '12', isDone: false}, {id:2, weight: 14, reps: '12', isDone: false}, {id:3, weight: 12, reps: '15', isDone: false}] },
    ]
};

export const MOCK_WORKOUT_C: Workout = {
    id: "workout3",
    name: "Treino C",
    description: "Pernas & Ombros",
    exercises: [
        { id: "ex8", name: "Agachamento Livre", lastLoad: 100, muscleGroup: "Pernas", sets: [{id:1, weight: 100, reps: '5', isDone: false}, {id:2, weight: 100, reps: '5', isDone: false}, {id:3, weight: 100, reps: '5', isDone: false}], restTime: 120 },
        { id: "ex9", name: "Leg Press", lastLoad: 180, muscleGroup: "Pernas", sets: [{id:1, weight: 180, reps: '10', isDone: false}, {id:2, weight: 180, reps: '10', isDone: false}, {id:3, weight: 180, reps: '10', isDone: false}] },
        { id: "ex10", name: "Desenvolvimento c/ Halteres", lastLoad: 20, muscleGroup: "Ombros", sets: [{id:1, weight: 20, reps: '12', isDone: false}, {id:2, weight: 20, reps: '10', isDone: false}, {id:3, weight: 18, reps: '12', isDone: false}] },
    ]
};

export const MOCK_WORKOUT_LEGS_USER: Workout = {
    id: "workout4",
    name: "Treino de Perna (Usuário)",
    description: "Hipertrofia intermediário",
    exercises: [
        {
            id: "ex11", name: "Esteira", lastLoad: 0, muscleGroup: "Cardio", sets: [
                { id: 1, weight: 0, reps: '10', isDone: false }
            ], restTime: 60
        },
        {
            id: "ex12", name: "Leg Press", lastLoad: 150, muscleGroup: "Pernas", sets: [
                { id: 1, weight: 150, reps: '8', isDone: false },
                { id: 2, weight: 150, reps: '10', isDone: false },
                { id: 3, weight: 150, reps: '12', isDone: false }
            ], restTime: 60
        },
        {
            id: "ex13", name: "Agachamento Smith", lastLoad: 28, muscleGroup: "Pernas", sets: [
                { id: 1, weight: 28, reps: '8', isDone: false },
                { id: 2, weight: 25, reps: '10', isDone: false },
                { id: 3, weight: 20, reps: '12', isDone: false }
            ], restTime: 60
        },
        {
            id: "ex14", name: "Afundo", lastLoad: 0, muscleGroup: "Pernas", sets: [
                { id: 1, weight: 0, reps: '8', isDone: false },
                { id: 2, weight: 0, reps: '10', isDone: false },
                { id: 3, weight: 0, reps: '12', isDone: false }
            ], restTime: 60
        },
        {
            id: "ex15", name: "Cadeira Extensora", lastLoad: 50, muscleGroup: "Pernas", sets: [
                { id: 1, weight: 50, reps: '8', isDone: false },
                { id: 2, weight: 45, reps: '10', isDone: false },
                { id: 3, weight: 40, reps: '12', isDone: false }
            ], restTime: 60
        },
        {
            id: "ex16", name: "Cadeira Flexora", lastLoad: 45, muscleGroup: "Pernas", sets: [
                { id: 1, weight: 45, reps: '8', isDone: false },
                { id: 2, weight: 40, reps: '10', isDone: false },
                { id: 3, weight: 35, reps: '12', isDone: false }
            ], restTime: 60
        },
        {
            id: "ex17", name: "Panturrilha Leg Press", lastLoad: 75, muscleGroup: "Pernas", sets: [
                { id: 1, weight: 75, reps: '10', isDone: false },
                { id: 2, weight: 75, reps: '12', isDone: false },
                { id: 3, weight: 75, reps: '14', isDone: false }
            ], restTime: 60
        }
    ]
};

export const MOCK_WORKOUTS: Workout[] = [MOCK_WORKOUT_A, MOCK_WORKOUT_B, MOCK_WORKOUT_C, MOCK_WORKOUT_LEGS_USER];

export const MOCK_ALERTS: Alert[] = [
    { id: "alert1", title: "Estagnação no Supino Reto", description: "Você está há 2 semanas com a mesma carga (80kg) no supino reto.", suggestion: "Tente aumentar para 82.5kg na próxima sessão ou diminuir uma repetição para focar na técnica.", severity: 'medium', date: '2023-10-26' },
    { id: "alert2", title: "Volume de pernas baixo", description: "Seu volume de treino para pernas está 20% abaixo da média das últimas 4 semanas.", suggestion: "Considere adicionar mais uma série nos principais exercícios de perna ou aumentar a frequência.", severity: 'low', date: '2023-10-25' },
    { id: "alert3", title: "Risco de overtraining", description: "Você treinou 6 dias seguidos sem descanso. O descanso é crucial para a recuperação e crescimento.", suggestion: "Tire um dia de descanso ou faça um treino de recuperação ativa, como uma caminhada leve.", severity: 'high', date: '2023-10-24' },
];

export const MOCK_MEASUREMENTS: Measurement[] = [
    { date: "2023-07-01", weight: 85.0, bodyFat: 15.2, leanMass: 72.1 },
    { date: "2023-08-01", weight: 84.5, bodyFat: 14.5, leanMass: 72.2 },
    { date: "2023-09-01", weight: 84.0, bodyFat: 13.8, leanMass: 72.4 },
    { date: "2023-10-01", weight: 83.0, bodyFat: 13.1, leanMass: 72.1 },
    { date: "2023-10-25", weight: 82.5, bodyFat: 12.8, leanMass: 71.9 },
];

export const MOCK_PROGRESS_SUPINO: ExerciseProgress = {
    exerciseId: "ex1",
    exerciseName: "Supino Reto",
    isPR: true,
    data: [
        { date: "2023-09-15", weight: 75, reps: 8, volume: 1800 },
        { date: "2023-09-22", weight: 77.5, reps: 8, volume: 1860 },
        { date: "2023-09-29", weight: 80, reps: 6, volume: 1920 },
        { date: "2023-10-06", weight: 80, reps: 8, volume: 1920 },
        { date: "2023-10-13", weight: 80, reps: 8, volume: 1920 },
        { date: "2023-10-20", weight: 82.5, reps: 6, volume: 1980 },
    ]
};
export const MOCK_PROGRESS_AGACHAMENTO: ExerciseProgress = {
    exerciseId: "ex8",
    exerciseName: "Agachamento Livre",
    isPR: false,
    data: [
        { date: "2023-09-15", weight: 100, reps: 5, volume: 1500 },
        { date: "2023-09-29", weight: 105, reps: 5, volume: 1575 },
        { date: "2023-10-13", weight: 110, reps: 4, volume: 1760 },
    ]
};

export const MOCK_MUSCLE_GROUP_VOLUME: MuscleGroupVolume[] = [
    { name: "Peito", volume: 4500, fill: '#0ea5e9' }, // sky-500
    { name: "Costas", volume: 4200, fill: '#14b8a6' }, // teal-500
    { name: "Pernas", volume: 5500, fill: '#22d3ee' }, // cyan-400
    { name: "Ombros", volume: 3000, fill: '#6366f1' }, // indigo-500
    { name: "Bíceps", volume: 2200, fill: '#38bdf8' }, // sky-400
    { name: "Tríceps", volume: 2500, fill: '#06b6d4' }, // cyan-500
];