

import React, { useState, useEffect, useRef } from 'react';
import { Screen, User, Workout, Alert, Measurement, Exercise, ExerciseSet, ExerciseProgress, MuscleGroupVolume, ProgressDataPoint, CompletedWorkout } from './types';
import { MOCK_USER, MOCK_WORKOUTS, MOCK_ALERTS, MOCK_MEASUREMENTS, MOCK_PROGRESS_SUPINO, MOCK_PROGRESS_AGACHAMENTO, MOCK_MUSCLE_GROUP_VOLUME, ICONS } from './constants';

const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const Header = ({ user }: { user: User }) => (
    <header className="flex items-center p-4 text-white">
        <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full mr-4 border-2 border-cyan-500 object-cover" />
        <div>
            <p className="text-slate-400 text-sm">Bem-vindo(a) de volta,</p>
            <h1 className="text-xl font-bold text-slate-100">{user.name}</h1>
        </div>
    </header>
);

const HomeScreen = ({ user, workout, alerts, onStartWorkout, onNavigate }: { user: User, workout: Workout, alerts: Alert[], onStartWorkout: () => void, onNavigate: (screen: Screen) => void }) => {
    const latestAlert = alerts[0];
    return (
        <div className="p-4 text-white flex flex-col h-full space-y-6">
            <Header user={user} />
            <div className="flex-grow flex flex-col justify-around">
                <div className="bg-slate-900/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-lg transform hover:scale-105 transition-transform duration-300 border border-slate-700">
                    <p className="text-slate-300">Seu próximo treino</p>
                    <h2 className="text-3xl font-bold text-cyan-400 my-2">{workout.name}</h2>
                    <p className="text-slate-400 mb-6">{workout.description}</p>
                    <button onClick={onStartWorkout} className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl transition-all duration-300 shadow-lg shadow-cyan-900/50">
                        Iniciar Treino
                    </button>
                </div>
                
                {latestAlert && (
                    <div onClick={() => onNavigate(Screen.ALERTS)} className="bg-yellow-500/20 border border-yellow-400 rounded-2xl p-4 flex items-center space-x-4 cursor-pointer hover:bg-yellow-500/30 transition-colors">
                        <ICONS.WARNING className="w-8 h-8 text-yellow-400 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold text-yellow-300">{latestAlert.title}</h3>
                            <p className="text-sm text-slate-300">{latestAlert.description}</p>
                        </div>
                        <ICONS.CHEVRON_RIGHT className="w-6 h-6 ml-auto flex-shrink-0" />
                    </div>
                )}
                
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div onClick={() => onNavigate(Screen.WORKOUTS)} className="bg-slate-900/70 p-4 rounded-xl cursor-pointer hover:bg-slate-800/80 transition-colors border border-slate-700">
                        <p>Treinos</p>
                    </div>
                    <div onClick={() => onNavigate(Screen.PROGRESS)} className="bg-slate-900/70 p-4 rounded-xl cursor-pointer hover:bg-slate-800/80 transition-colors border border-slate-700">
                        <p>Progresso</p>
                    </div>
                    <div onClick={() => onNavigate(Screen.MEASUREMENTS)} className="bg-slate-900/70 p-4 rounded-xl cursor-pointer hover:bg-slate-800/80 transition-colors border border-slate-700">
                        <p>Medidas</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const WorkoutsListScreen = ({ workouts, onStartWorkout, onAddNewWorkout, onEditWorkout }: { workouts: Workout[], onStartWorkout: (w: Workout) => void, onAddNewWorkout: () => void, onEditWorkout: (w: Workout) => void }) => (
    <div className="p-4 text-white flex flex-col h-full">
        <h1 className="text-3xl font-bold mb-4">Meus Treinos</h1>
        <div className="flex-grow overflow-y-auto space-y-4 pr-2">
            {workouts.map(w => (
                <div key={w.id} className="bg-slate-900/70 border border-slate-700 p-4 rounded-xl flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-lg text-slate-100">{w.name}</h3>
                        <p className="text-sm text-slate-400">{w.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => onEditWorkout(w)} className="text-slate-400 hover:text-cyan-400 p-2 rounded-lg">
                            <ICONS.EDIT className="w-5 h-5" />
                        </button>
                        <button onClick={() => onStartWorkout(w)} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg">
                            Iniciar
                        </button>
                    </div>
                </div>
            ))}
        </div>
        <button onClick={onAddNewWorkout} className="w-full bg-slate-800 hover:bg-slate-700 font-bold py-3 mt-4 rounded-xl transition-all duration-300 flex items-center justify-center border border-slate-600">
            <ICONS.PLUS className="w-5 h-5 mr-2" /> Criar Novo Treino
        </button>
    </div>
);

const EditWorkoutScreen = ({ workout, onSave, onCancel }: { workout: Workout, onSave: (w: Workout) => void, onCancel: () => void }) => {
    const [editedWorkout, setEditedWorkout] = useState(workout);

    const handleFieldChange = (field: 'name' | 'description', value: string) => {
        setEditedWorkout(prev => ({...prev, [field]: value }));
    };

    const handleExerciseFieldChange = (exerciseId: string, field: 'name' | 'restTime', value: string | number) => {
        setEditedWorkout(prev => ({
            ...prev,
            exercises: prev.exercises.map(ex => 
                ex.id === exerciseId ? { ...ex, [field]: value } : ex
            )
        }));
    };
    
    const handleDeleteExercise = (exerciseId: string) => {
        setEditedWorkout(prev => ({
            ...prev,
            exercises: prev.exercises.filter(ex => ex.id !== exerciseId)
        }));
    };

    const handleAddExercise = () => {
        const newExercise: Exercise = { id: `ex${Date.now()}`, name: "Novo Exercício", lastLoad: 0, muscleGroup: "N/A", sets: [{id: 1, weight: 0, reps: 10, isDone: false}] };
        setEditedWorkout(prev => ({
            ...prev,
            exercises: [...prev.exercises, newExercise]
        }));
    };

    const handleSetChange = (exerciseId: string, setId: number, field: 'weight' | 'reps', value: string) => {
        const numericValue = parseInt(value, 10) || 0;
        setEditedWorkout(prev => ({
            ...prev,
            exercises: prev.exercises.map(ex =>
                ex.id === exerciseId
                    ? { ...ex, sets: ex.sets.map(s => s.id === setId ? { ...s, [field]: numericValue } : s) }
                    : ex
            )
        }));
    };

    const handleAddSet = (exerciseId: string) => {
        setEditedWorkout(prev => ({
            ...prev,
            exercises: prev.exercises.map(ex => {
                if (ex.id !== exerciseId) return ex;
                const lastSet = ex.sets[ex.sets.length - 1] || { id: 0, weight: 0, reps: 0, isDone: false };
                const newSet: ExerciseSet = { ...lastSet, id: Date.now(), isDone: false };
                return { ...ex, sets: [...ex.sets, newSet] };
            })
        }));
    };

    const handleDeleteSet = (exerciseId: string, setId: number) => {
        setEditedWorkout(prev => ({
            ...prev,
            exercises: prev.exercises.map(ex =>
                ex.id === exerciseId
                    ? { ...ex, sets: ex.sets.filter(s => s.id !== setId) }
                    : ex
            )
        }));
    };


    return (
        <div className="p-4 text-white flex flex-col h-full">
            <div className="flex items-center mb-4">
                 <button onClick={onCancel} className="p-2 mr-2 -ml-2 text-slate-300 hover:text-cyan-400">
                    <ICONS.CHEVRON_LEFT className="w-6 h-6" />
                </button>
                <h1 className="text-3xl font-bold">Editar Treino</h1>
            </div>
            <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-700">
                    <label className="text-sm text-slate-400">Nome do Treino</label>
                    <input type="text" value={editedWorkout.name} onChange={e => handleFieldChange('name', e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded p-2 mt-1 text-slate-100" />
                    <label className="text-sm text-slate-400 mt-3 block">Descrição</label>
                    <input type="text" value={editedWorkout.description} onChange={e => handleFieldChange('description', e.target.value)} className="w-full bg-slate-800 border border-slate-600 rounded p-2 mt-1 text-slate-100" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Exercícios</h2>
                    <div className="space-y-3">
                         {editedWorkout.exercises.map(ex => (
                            <div key={ex.id} className="bg-slate-900/70 p-3 rounded-lg border border-slate-700">
                                <div className="flex items-center justify-between">
                                    <input 
                                        type="text" 
                                        value={ex.name}
                                        onChange={e => handleExerciseFieldChange(ex.id, 'name', e.target.value)}
                                        className="bg-transparent font-semibold text-slate-200 w-full focus:outline-none focus:text-cyan-400" 
                                    />
                                    <button onClick={() => handleDeleteExercise(ex.id)} className="text-slate-500 hover:text-red-500 ml-2 p-1">
                                        <ICONS.TRASH className="w-5 h-5" />
                                    </button>
                                </div>
                                
                                <div className="mt-4 space-y-2">
                                     <div className="grid grid-cols-12 gap-2 text-center text-xs font-semibold text-slate-400 px-1">
                                        <span className="col-span-2">Série</span>
                                        <span className="col-span-4">Peso (kg)</span>
                                        <span className="col-span-4">Reps</span>
                                        <span className="col-span-2"></span>
                                    </div>
                                    {ex.sets.map((set, setIndex) => (
                                        <div key={set.id} className="grid grid-cols-12 gap-2 items-center text-center">
                                            <span className="font-bold col-span-2 text-sm">{setIndex + 1}</span>
                                            <div className="col-span-4">
                                                <input type="number" value={set.weight || ''} onChange={e => handleSetChange(ex.id, set.id, 'weight', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-1 text-center" />
                                            </div>
                                            <div className="col-span-4">
                                                <input type="number" value={set.reps || ''} onChange={e => handleSetChange(ex.id, set.id, 'reps', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-1 text-center" />
                                            </div>
                                            <div className="col-span-2 flex justify-center">
                                                <button onClick={() => handleDeleteSet(ex.id, set.id)} className="text-slate-500 hover:text-red-500 p-1">
                                                    <ICONS.TRASH className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={() => handleAddSet(ex.id)} className="w-full text-cyan-400 text-sm font-semibold pt-2">+ Adicionar Série</button>
                                </div>

                                <div className="mt-3">
                                    <label className="text-xs text-slate-400">Descanso (s)</label>
                                    <input 
                                        type="number" 
                                        placeholder="Padrão"
                                        value={ex.restTime || ''}
                                        onChange={e => handleExerciseFieldChange(ex.id, 'restTime', parseInt(e.target.value) || undefined)}
                                        className="w-full bg-slate-800 border border-slate-600 rounded p-1 mt-1 text-slate-100 text-sm"
                                    />
                                </div>
                            </div>
                         ))}
                    </div>
                     <button onClick={handleAddExercise} className="w-full text-cyan-400 font-semibold py-3 mt-4 rounded-xl transition-all duration-300 flex items-center justify-center bg-slate-800 hover:bg-slate-700 border border-slate-700">
                        <ICONS.PLUS className="w-5 h-5 mr-2" /> Adicionar Exercício
                    </button>
                </div>
            </div>
            <button onClick={() => onSave(editedWorkout)} className="w-full bg-cyan-600 hover:bg-cyan-700 font-bold py-3 mt-4 rounded-xl transition-all duration-300">
                Salvar Alterações
            </button>
        </div>
    );
};


const WorkoutScreen = ({ workout, setWorkout, onFinishWorkout, globalSettings, workoutStartTime }: { workout: Workout, setWorkout: (w: Workout) => void, onFinishWorkout: () => void, globalSettings: { defaultRestTime: number }, workoutStartTime: number | null }) => {
    const [timer, setTimer] = useState<number | null>(null);
    const [restingExercise, setRestingExercise] = useState<string | null>(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [showInactivityAlert, setShowInactivityAlert] = useState(false);

    useEffect(() => {
        if (!workoutStartTime) return;
        const interval = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - workoutStartTime) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, [workoutStartTime]);

    // Cleanup inactivity timer on component unmount
    useEffect(() => {
        return () => {
            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (timer === null) {
            if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
            return;
        }

        if (timer <= 0) {
            setRestingExercise(null);
            if (timer !== null) setTimer(null);
            
            // Start inactivity timer when rest is over
            inactivityTimerRef.current = setTimeout(() => {
                if (navigator.vibrate) {
                    navigator.vibrate([200, 100, 200, 100, 200]);
                }
                setShowInactivityAlert(true);
            }, 120000); // 2 minutes

            return;
        }

        const interval = setInterval(() => setTimer(t => t! - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleUpdateExercise = (updatedExercise: Exercise) => {
        setWorkout({
            ...workout,
            exercises: workout.exercises.map(ex => ex.id === updatedExercise.id ? updatedExercise : ex)
        });
    };
    
    const handleSetFieldChange = (exerciseId: string, setId: number, field: 'weight' | 'reps' | 'rpe', value: string) => {
        const exercise = workout.exercises.find(ex => ex.id === exerciseId);
        if (!exercise) return;

        const updatedSets = exercise.sets.map(s => {
            if (s.id === setId) {
                const numericValue = parseFloat(value);
                if (field === 'rpe') {
                     const intValue = parseInt(value, 10);
                    return { ...s, rpe: isNaN(intValue) ? undefined : intValue };
                }
                return { ...s, [field]: isNaN(numericValue) ? 0 : numericValue };
            }
            return s;
        });
        handleUpdateExercise({ ...exercise, sets: updatedSets });
    };

    const handleSetDone = (exerciseId: string, setId: number) => {
        // Clear any pending inactivity timer
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
        }
        setShowInactivityAlert(false);

        const exercise = workout.exercises.find(ex => ex.id === exerciseId)!;
        const newSets = exercise.sets.map(s => s.id === setId ? { ...s, isDone: !s.isDone } : s);
        handleUpdateExercise({ ...exercise, sets: newSets });
        const restTime = exercise.restTime ?? globalSettings.defaultRestTime;
        setTimer(restTime);
        setRestingExercise(exercise.name);
    };

    const handleAddSet = (exerciseId: string) => {
        const exercise = workout.exercises.find(ex => ex.id === exerciseId)!;
        const lastSet = exercise.sets[exercise.sets.length - 1] || { id: 0, weight: 0, reps: 0, isDone: false };
        const newSet: ExerciseSet = { ...lastSet, id: Date.now(), isDone: false };
        handleUpdateExercise({ ...exercise, sets: [...exercise.sets, newSet] });
    };
    
    const handleDismissSuggestion = (exerciseId: string) => {
        const exercise = workout.exercises.find(ex => ex.id === exerciseId)!;
        if (exercise.suggestion) {
            handleUpdateExercise({ ...exercise, suggestion: { ...exercise.suggestion, visible: false } });
        }
    };
    
    const totalSets = workout.exercises.reduce((acc, ex) => acc + ex.sets.length, 0);
    const completedSets = workout.exercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.isDone).length, 0);

    return (
        <div className="p-4 text-white flex flex-col h-full">
            {showInactivityAlert && (
                <div className="absolute top-4 left-4 right-4 bg-yellow-500/20 border border-yellow-400 rounded-xl p-3 flex items-center justify-between z-30">
                    <div className="flex items-center space-x-3">
                        <ICONS.WARNING className="w-6 h-6 text-yellow-300" />
                        <p className="text-yellow-200 text-sm font-semibold">Hora de voltar ao treino!</p>
                    </div>
                    <button onClick={() => setShowInactivityAlert(false)} className="text-slate-300 hover:text-white text-lg px-2 -my-1">&times;</button>
                </div>
            )}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold mb-1">{workout.name}</h1>
                    <p className="text-slate-400 mb-4">{workout.description}</p>
                </div>
                <div className="bg-slate-800/80 text-cyan-400 font-mono font-bold text-lg py-1 px-3 rounded-lg border border-slate-700">
                    {formatTime(elapsedTime)}
                </div>
            </div>
            <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                {workout.exercises.map((ex) => (
                    <div key={ex.id} className="bg-slate-900/70 border border-slate-700 p-4 rounded-xl">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-lg text-slate-100">{ex.name}</h3>
                            <p className="text-sm text-slate-400">Última: {ex.lastLoad} kg</p>
                        </div>
                        <div className="grid grid-cols-12 gap-2 text-center text-sm font-semibold text-slate-400 mb-2 px-2">
                            <span className="col-span-1">S</span>
                            <span className="col-span-4">Peso (kg)</span>
                            <span className="col-span-3">Reps</span>
                            <span className="col-span-2">RPE</span>
                            <span className="col-span-2"></span>
                        </div>
                        {ex.sets.map((set, setIndex) => (
                            <div key={set.id} className={`grid grid-cols-12 gap-2 items-center text-center p-2 rounded-lg ${set.isDone ? 'bg-green-500/10' : ''}`}>
                                <span className="font-bold col-span-1">{setIndex + 1}</span>
                                <div className="col-span-4">
                                <input type="number" value={set.weight || ''} onChange={e => handleSetFieldChange(ex.id, set.id, 'weight', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-1 text-center" />
                                </div>
                                <input type="number" value={set.reps || ''} onChange={e => handleSetFieldChange(ex.id, set.id, 'reps', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-1 text-center col-span-3" />
                                <input type="number" placeholder="-" value={set.rpe ?? ''} onChange={e => handleSetFieldChange(ex.id, set.id, 'rpe', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-1 text-center col-span-2" />
                                <div className="col-span-2 flex items-center justify-center space-x-1">
                                    <button onClick={() => handleSetDone(ex.id, set.id)} className={`w-8 h-8 rounded-full flex items-center justify-center ${set.isDone ? 'bg-green-500' : 'border-2 border-cyan-500'}`}>
                                        {set.isDone && <ICONS.CHECK className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        ))}
                         <div className="text-center mt-3">
                            <button onClick={() => handleAddSet(ex.id)} className="text-cyan-400 text-sm font-semibold">+ Adicionar Série</button>
                        </div>
                        {ex.suggestion?.visible && (
                             <div className="mt-3 bg-cyan-900/50 border border-cyan-700 p-2 rounded-lg flex items-center justify-between text-sm">
                                <p className="text-cyan-300">Sugestão: {ex.suggestion.text}</p>
                                <button onClick={() => handleDismissSuggestion(ex.id)} className="text-slate-400 hover:text-white text-lg px-2 -my-1">&times;</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
             {timer !== null && timer > 0 && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-11/12 bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-lg z-20 flex flex-col items-center">
                    <p className="text-sm text-slate-400">Descanso ({restingExercise})</p>
                    <div className="flex items-center justify-center space-x-2 sm:space-x-4 my-2">
                        <button onClick={() => setTimer(t => Math.max(0, t! - 15))} className="w-14 h-12 rounded-lg bg-slate-800 text-lg flex-shrink-0">-15s</button>
                        <p className="text-4xl sm:text-5xl font-bold w-28 text-center text-cyan-400 tabular-nums">{Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</p>
                        <button onClick={() => setTimer(t => t! + 15)} className="w-14 h-12 rounded-lg bg-slate-800 text-lg flex-shrink-0">+15s</button>
                    </div>
                    <button onClick={() => setTimer(0)} className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-2 mt-1 rounded-lg text-sm flex items-center justify-center">
                        <ICONS.SKIP className="w-4 h-4 mr-2"/> Pular
                    </button>
                </div>
            )}
            <button onClick={onFinishWorkout} className="w-full bg-cyan-600 hover:bg-cyan-700 font-bold py-3 mt-4 rounded-xl transition-all duration-300">
                Finalizar Treino ({completedSets}/{totalSets})
            </button>
        </div>
    );
};

const SimpleLineChart = ({ data, color }: { data: { x: number, y: number }[], color: string }) => {
    if (data.length < 2) return <div className="text-center text-slate-400 h-[150px] flex items-center justify-center">Dados insuficientes para o gráfico</div>;
    const width = 300;
    const height = 150;
    const maxX = Math.max(...data.map(d => d.x));
    const minX = Math.min(...data.map(d => d.x));
    const maxY = Math.max(...data.map(d => d.y));
    const minY = Math.min(...data.map(d => d.y));

    const points = data.map(d => {
        const x = ((d.x - minX) / (maxX - minX || 1)) * width;
        const y = height - ((d.y - minY) / (maxY - minY || 1)) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
            <polyline fill="none" stroke={color} strokeWidth="2" points={points} />
        </svg>
    );
};

const PieChart = ({ data }: { data: MuscleGroupVolume[] }) => {
    const totalVolume = data.reduce((acc, curr) => acc + curr.volume, 0);
    let cumulativePercent = 0;
    const gradientParts = data.map(item => {
        const percent = (item.volume / totalVolume) * 100;
        const part = `${item.fill} ${cumulativePercent}% ${cumulativePercent + percent}%`;
        cumulativePercent += percent;
        return part;
    });
    const conicGradient = `conic-gradient(${gradientParts.join(', ')})`;
    
    return (
        <div className="flex flex-col items-center">
            <div className="w-48 h-48 rounded-full" style={{ background: conicGradient }}></div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
                {data.map(item => (
                    <div key={item.name} className="flex items-center text-sm">
                        <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: item.fill }}></div>
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


const ProgressScreen = ({ exerciseProgress, muscleGroupVolume, onNavigate }: { exerciseProgress: ExerciseProgress[], muscleGroupVolume: MuscleGroupVolume[], onNavigate: (s: Screen) => void }) => {
    const [period, setPeriod] = useState(30);
    const [tab, setTab] = useState<'exercises' | 'muscles'>('exercises');

    return (
        <div className="p-4 text-white flex flex-col h-full">
            <h1 className="text-3xl font-bold mb-4">Meu Progresso</h1>
            <div className="flex space-x-2 mb-4 bg-slate-900/70 p-1 rounded-lg border border-slate-700">
                <button onClick={() => setPeriod(7)} className={`flex-1 p-2 rounded-md text-sm ${period === 7 ? 'bg-cyan-600' : ''}`}>7D</button>
                <button onClick={() => setPeriod(30)} className={`flex-1 p-2 rounded-md text-sm ${period === 30 ? 'bg-cyan-600' : ''}`}>30D</button>
                <button onClick={() => setPeriod(90)} className={`flex-1 p-2 rounded-md text-sm ${period === 90 ? 'bg-cyan-600' : ''}`}>90D</button>
            </div>
            <div className="flex space-x-2 mb-4 bg-slate-900/70 p-1 rounded-lg border border-slate-700">
                <button onClick={() => setTab('exercises')} className={`flex-1 p-2 rounded-md ${tab === 'exercises' ? 'bg-cyan-600' : ''}`}>Exercícios</button>
                <button onClick={() => setTab('muscles')} className={`flex-1 p-2 rounded-md ${tab === 'muscles' ? 'bg-cyan-600' : ''}`}>Grupos Musculares</button>
            </div>
             <button onClick={() => onNavigate(Screen.HISTORY)} className="w-full bg-slate-800 hover:bg-slate-700 font-bold py-3 mb-4 rounded-xl transition-all duration-300 flex items-center justify-center border border-slate-600">
                <ICONS.HISTORY className="w-5 h-5 mr-2" /> Ver Histórico de Treinos
            </button>
            <div className="flex-grow overflow-y-auto pr-2">
                {tab === 'exercises' ? (
                    <div className="space-y-4">
                        {exerciseProgress.length > 0 ? exerciseProgress.map(prog => (
                            <div key={prog.exerciseId} className="bg-slate-900/70 border border-slate-700 p-4 rounded-xl">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold">{prog.exerciseName}</h3>
                                    {prog.isPR && <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center"><ICONS.FIRE className="w-4 h-4 mr-1"/> PR</span>}
                                </div>
                                <SimpleLineChart data={prog.data.map((d, i) => ({ x: i, y: d.weight }))} color="#22d3ee" />
                            </div>
                        )) : (
                           <div className="text-center text-slate-400 mt-8 p-4 bg-slate-900/70 border border-slate-700 rounded-xl">
                                <p className="font-semibold text-slate-200">Sem Dados de Progresso</p>
                                <p className="text-sm">Complete treinos para ver seus gráficos aqui!</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-slate-900/70 border border-slate-700 p-4 rounded-xl">
                        <h3 className="font-bold text-center mb-4">Volume por Grupo Muscular</h3>
                        {muscleGroupVolume.length > 0 ? (
                            <PieChart data={muscleGroupVolume} />
                        ) : (
                            <div className="text-center text-slate-400 mt-8 py-10">
                                 <p className="font-semibold text-slate-200">Sem Dados de Volume</p>
                                 <p className="text-sm">Nenhum volume de treino foi registrado ainda.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const HistoryScreen = ({ completedWorkouts, onBack }: { completedWorkouts: CompletedWorkout[], onBack: () => void }) => {
    return (
        <div className="p-4 text-white flex flex-col h-full">
            <div className="flex items-center mb-4">
                 <button onClick={onBack} className="p-2 mr-2 -ml-2 text-slate-300 hover:text-cyan-400">
                    <ICONS.CHEVRON_LEFT className="w-6 h-6" />
                </button>
                <h1 className="text-3xl font-bold">Histórico de Treinos</h1>
            </div>
            <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                {completedWorkouts.length > 0 ? completedWorkouts.slice().reverse().map(workout => (
                    <div key={workout.id} className="bg-slate-900/70 border border-slate-700 p-4 rounded-xl">
                        <div className="flex justify-between items-start">
                             <div>
                                <h3 className="font-bold text-lg text-slate-100">{workout.name}</h3>
                                <p className="text-sm text-slate-400">{new Date(workout.date).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <span className="text-sm text-cyan-400 font-mono">{formatTime(workout.durationInSeconds)}</span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-3 text-center">
                            <div>
                                <p className="font-bold text-lg">{workout.totalVolume.toLocaleString('pt-BR')}</p>
                                <p className="text-xs text-slate-400">Volume (kg)</p>
                            </div>
                             <div>
                                <p className="font-bold text-lg">{workout.caloriesBurned || '--'}</p>
                                <p className="text-xs text-slate-400">Calorias</p>
                            </div>
                             <div>
                                <p className="font-bold text-lg">{workout.exercises.reduce((acc, ex) => acc + ex.sets.filter(s => s.isDone).length, 0)}</p>
                                <p className="text-xs text-slate-400">Séries</p>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="text-center text-slate-400 mt-16 p-4 bg-slate-900/70 border border-slate-700 rounded-xl">
                        <p className="font-semibold text-slate-200">Nenhum Treino Concluído</p>
                        <p className="text-sm">Seu histórico de treinos aparecerá aqui.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

const MeasurementsScreen = () => {
    const data = MOCK_MEASUREMENTS;
    const chartData = data.map((d, i) => ({ x: i, y: d.weight }));

    return (
        <div className="p-4 text-white flex flex-col h-full">
            <h1 className="text-3xl font-bold mb-4">Medidas Corporais</h1>
            <div className="bg-slate-900/70 border border-slate-700 p-4 rounded-xl mb-4">
                <h3 className="font-bold mb-2">Evolução do Peso (kg)</h3>
                <SimpleLineChart data={chartData} color="#22c55e" />
            </div>
            <div className="flex-grow overflow-y-auto space-y-2 pr-2">
                 {data.slice().reverse().map(m => (
                    <div key={m.date} className="bg-slate-900 p-3 rounded-lg flex justify-between items-center">
                        <span className="font-bold">{new Date(m.date).toLocaleDateString('pt-BR')}</span>
                        <div className="text-right text-sm">
                            <p>{m.weight.toFixed(1)} kg</p>
                            <p className="text-slate-400">{m.bodyFat.toFixed(1)}% Gordura</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="w-full bg-cyan-600 hover:bg-cyan-700 font-bold py-3 mt-4 rounded-xl transition-all duration-300 flex items-center justify-center">
                <ICONS.PLUS className="w-5 h-5 mr-2" /> Adicionar Nova Medição
            </button>
        </div>
    );
};

const AlertsScreen = ({ alerts }: { alerts: Alert[] }) => {
    const severityStyles = {
        low: 'bg-sky-500/20 border-sky-400 text-sky-300',
        medium: 'bg-yellow-500/20 border-yellow-400 text-yellow-300',
        high: 'bg-red-500/20 border-red-400 text-red-300',
    };
    return (
        <div className="p-4 text-white flex flex-col h-full">
            <h1 className="text-3xl font-bold mb-4">Alertas e Sugestões</h1>
            <div className="flex-grow overflow-y-auto space-y-4 pr-2">
                {alerts.length > 0 ? alerts.map(alert => (
                    <div key={alert.id} className={`p-4 rounded-xl border ${severityStyles[alert.severity]}`}>
                        <div className="flex items-start space-x-3">
                            <ICONS.WARNING className="w-6 h-6 mt-1 flex-shrink-0" />
                            <div>
                                <h3 className="font-bold">{alert.title}</h3>
                                <p className="text-sm text-slate-300 mt-1">{alert.description}</p>
                                <p className="text-sm text-cyan-300 mt-2 pt-2 border-t border-white/10">Sugestão: {alert.suggestion}</p>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="text-center text-slate-400 mt-16">
                        <p className="font-semibold text-slate-200">Caixa de Entrada Limpa!</p>
                        <p className="text-sm">Nenhum alerta ou sugestão no momento.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const SettingsScreen = ({ user, onUserChange, settings, onSettingsChange, onSave, onResetData }: { user: User, onUserChange: (u: User) => void, settings: {defaultRestTime: number}, onSettingsChange: (s: {defaultRestTime: number}) => void, onSave: () => void, onResetData: () => void }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                onUserChange({ ...user, avatarUrl: e.target?.result as string });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    
    return (
        <div className="p-4 text-white flex flex-col h-full">
            <h1 className="text-3xl font-bold mb-6">Configurações</h1>
            <div className="flex-grow overflow-y-auto space-y-6 pr-2">
                <div>
                    <h2 className="text-xl font-semibold mb-3 text-cyan-400">Perfil</h2>
                    <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-700 space-y-4">
                        <div className="flex items-center space-x-4">
                             <div className="relative">
                                <input type="file" accept="image/*" ref={fileInputRef} onChange={handleAvatarSelect} className="hidden" />
                                <img src={user.avatarUrl} alt={user.name} className="w-20 h-20 rounded-full border-2 border-cyan-500 object-cover" />
                                <button 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-0 right-0 bg-slate-800 rounded-full p-1 border-2 border-slate-700 text-slate-300 hover:text-cyan-400"
                                    aria-label="Change profile picture"
                                >
                                    <ICONS.EDIT className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex-grow">
                                <label className="text-sm text-slate-400">Nome de Usuário</label>
                                <input 
                                    type="text" 
                                    value={user.name} 
                                    onChange={e => onUserChange({...user, name: e.target.value})}
                                    className="w-full bg-slate-800 border border-slate-600 rounded p-2 mt-1 text-slate-100" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-3 text-cyan-400">Treino</h2>
                    <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-700">
                        <label className="text-sm text-slate-400">Tempo de Descanso Padrão (segundos)</label>
                         <input 
                            type="number" 
                            value={settings.defaultRestTime} 
                            onChange={e => onSettingsChange({ defaultRestTime: parseInt(e.target.value, 10) || 0 })}
                            className="w-full bg-slate-800 border border-slate-600 rounded p-2 mt-1 text-slate-100" />
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-3 text-cyan-400">Dados do Aplicativo</h2>
                    <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-700">
                        <button onClick={onResetData} className="w-full bg-red-600/80 hover:bg-red-700/80 text-white font-bold py-2 rounded-lg transition-colors">
                           Redefinir Dados do App
                        </button>
                        <p className="text-xs text-slate-500 mt-2 text-center">Atenção: Isso apagará todo o seu progresso, treinos personalizados e alertas.</p>
                    </div>
                </div>
            </div>
            <button onClick={onSave} className="w-full bg-cyan-600 hover:bg-cyan-700 font-bold py-3 mt-4 rounded-xl transition-all duration-300">
                Salvar
            </button>
        </div>
    );
};

const DesktopWarning = () => (
    <div className="hidden md:flex absolute inset-0 bg-slate-950/90 backdrop-blur-sm z-50 flex-col items-center justify-center text-white text-center p-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400 mb-4"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
        <h2 className="text-2xl font-bold mb-2">Melhor Experiência no Celular</h2>
        <p className="text-slate-400 max-w-sm">
            O GymPro Tracker foi projetado para ser seu companheiro de treino no celular. Para uma melhor experiência, por favor, acesse em um dispositivo móvel.
        </p>
    </div>
);


const App = () => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('gymProUser') || 'null') || MOCK_USER);
    const [workouts, setWorkouts] = useState(() => JSON.parse(localStorage.getItem('gymProWorkouts') || 'null') || MOCK_WORKOUTS);
    const [alerts, setAlerts] = useState(() => JSON.parse(localStorage.getItem('gymProAlerts') || 'null') || []);
    const [globalSettings, setGlobalSettings] = useState(() => JSON.parse(localStorage.getItem('gymProSettings') || 'null') || { defaultRestTime: 60 });
    const [exerciseProgress, setExerciseProgress] = useState(() => JSON.parse(localStorage.getItem('gymProProgress') || 'null') || []);
    const [muscleVolume, setMuscleVolume] = useState(() => JSON.parse(localStorage.getItem('gymProMuscleVolume') || 'null') || []);
    const [completedWorkouts, setCompletedWorkouts] = useState(() => JSON.parse(localStorage.getItem('gymProCompletedWorkouts') || 'null') || []);

    const [tempUser, setTempUser] = useState(user);
    const [tempSettings, setTempSettings] = useState(globalSettings);

    const [activeScreen, setActiveScreen] = useState<Screen>(Screen.HOME);
    const [showWorkoutSummary, setShowWorkoutSummary] = useState(false);
    const [workoutSummary, setWorkoutSummary] = useState<{completedSets: number; totalReps: number; totalVolume: number, durationInSeconds: number} | null>(null);
    const [workoutFeedback, setWorkoutFeedback] = useState<{title: string, message: string} | null>(null);
    const [caloriesInput, setCaloriesInput] = useState('');
    const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
    const [workoutStartTime, setWorkoutStartTime] = useState<number | null>(null);
    const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
    
    // Restore active workout from localStorage on initial load
    useEffect(() => {
        try {
            const savedWorkout = localStorage.getItem('gymProActiveWorkout');
            const savedTime = localStorage.getItem('gymProWorkoutStartTime');
            if (savedWorkout && savedTime) {
                setCurrentWorkout(JSON.parse(savedWorkout));
                setWorkoutStartTime(JSON.parse(savedTime));
                setActiveScreen(Screen.WORKOUT);
            }
        } catch (error) {
            console.error("Failed to load active workout from localStorage", error);
            localStorage.removeItem('gymProActiveWorkout');
            localStorage.removeItem('gymProWorkoutStartTime');
        }
    }, []);

    useEffect(() => {
        if (activeScreen === Screen.SETTINGS) {
            setTempUser(user);
            setTempSettings(globalSettings);
        }
    }, [activeScreen, user, globalSettings]);

    const navigateTo = (screen: Screen) => setActiveScreen(screen);
    
    const handleStartWorkout = (workout: Workout) => {
        const workoutCopy = JSON.parse(JSON.stringify(workout));
        const startTime = Date.now();
        setCurrentWorkout(workoutCopy);
        setWorkoutStartTime(startTime);
        localStorage.setItem('gymProActiveWorkout', JSON.stringify(workoutCopy));
        localStorage.setItem('gymProWorkoutStartTime', JSON.stringify(startTime));
        navigateTo(Screen.WORKOUT);
    };

    const handleUpdateCurrentWorkout = (updatedWorkout: Workout) => {
        setCurrentWorkout(updatedWorkout);
        localStorage.setItem('gymProActiveWorkout', JSON.stringify(updatedWorkout));
    };

    const handleAddNewWorkout = () => {
        const newWorkout: Workout = {
            id: `workout${Date.now()}`,
            name: "Novo Treino",
            description: "Adicione exercícios",
            exercises: [],
        };
        const updatedWorkouts = [...workouts, newWorkout];
        setWorkouts(updatedWorkouts);
        localStorage.setItem('gymProWorkouts', JSON.stringify(updatedWorkouts));
        setEditingWorkout(newWorkout);
        navigateTo(Screen.EDIT_WORKOUT);
    };

    const handleEditWorkout = (workout: Workout) => {
        setEditingWorkout(JSON.parse(JSON.stringify(workout)));
        navigateTo(Screen.EDIT_WORKOUT);
    };

    const handleUpdateWorkout = (updatedWorkout: Workout) => {
        const updatedWorkouts = workouts.map(w => w.id === updatedWorkout.id ? updatedWorkout : w);
        setWorkouts(updatedWorkouts);
        localStorage.setItem('gymProWorkouts', JSON.stringify(updatedWorkouts));
        setEditingWorkout(null);
        navigateTo(Screen.WORKOUTS);
    };
    
    const handleSaveSettings = () => {
        setUser(tempUser);
        setGlobalSettings(tempSettings);
        localStorage.setItem('gymProUser', JSON.stringify(tempUser));
        localStorage.setItem('gymProSettings', JSON.stringify(tempSettings));
        navigateTo(Screen.HOME);
    };

    const handleResetData = () => {
        if (window.confirm("Você tem certeza que deseja apagar todos os dados? Esta ação não pode ser desfeita.")) {
            localStorage.clear(); // Clear all data for this domain
            
            setUser(MOCK_USER);
            setWorkouts(MOCK_WORKOUTS);
            setAlerts([]);
            setGlobalSettings({ defaultRestTime: 60 });
            setExerciseProgress([]);
            setMuscleVolume([]);
            setCompletedWorkouts([]);

            alert('Dados do aplicativo redefinidos.');
            navigateTo(Screen.HOME);
        }
    };

    const generateWorkoutFeedback = (summary: { durationInSeconds: number }): { title: string; message: string } => {
        const durationInMinutes = summary.durationInSeconds / 60;
    
        if (durationInMinutes < 1) {
            return { title: "É isso aí!", message: "Qualquer começo é um bom começo. Continue assim!" };
        }
        if (durationInMinutes < 15) {
            return { title: "Treino Rápido!", message: "Sessão curta e eficiente para manter o ritmo." };
        }
        if (durationInMinutes < 45) {
            return { title: "Ótimo Trabalho!", message: "Você mandou bem. A consistência é a chave!" };
        }
        if (durationInMinutes < 75) {
            return { title: "Que Dedicação!", message: "Um treino sólido e completo. Descanse bem!" };
        }
        return { title: "Guerreiro(a)!", message: "Você foi até o limite. Orgulhe-se do seu esforço!" };
    };

    const handleFinishWorkout = () => {
        if (!currentWorkout || !workoutStartTime) return;

        const summary = currentWorkout.exercises.reduce((acc, exercise) => {
            exercise.sets.forEach(set => {
                if (set.isDone) {
                    acc.completedSets++;
                    acc.totalReps += set.reps;
                    acc.totalVolume += set.weight * set.reps;
                }
            });
            return acc;
        }, { completedSets: 0, totalReps: 0, totalVolume: 0 });
        
        const durationInSeconds = Math.floor((Date.now() - workoutStartTime) / 1000);
        const finalSummary = { ...summary, durationInSeconds };

        setWorkoutSummary(finalSummary);
        setWorkoutFeedback(generateWorkoutFeedback(finalSummary));
        setShowWorkoutSummary(true);
    };

    const handleConfirmWorkoutSummary = () => {
        if (!currentWorkout || !workoutSummary) return;

        // --- Update Data and Save ---
        let newAlerts = [...alerts];
        const updatedWorkouts = workouts.map(w => {
            if (w.id !== currentWorkout.id) return w;
            const updatedExercises = w.exercises.map(originalEx => {
                const finishedEx = currentWorkout.exercises.find(ex => ex.id === originalEx.id);
                if (!finishedEx) return originalEx;
                
                const maxWeightSet = finishedEx.sets.filter(s => s.isDone).reduce((max, set) => (set.weight > (max?.weight ?? 0) ? set : max), null as ExerciseSet | null);
                
                if (maxWeightSet && maxWeightSet.weight > originalEx.lastLoad) {
                    newAlerts.unshift({
                        id: `alert-pr-${Date.now()}`,
                        title: `Novo Recorde Pessoal!`,
                        description: `Você levantou ${maxWeightSet.weight}kg no exercício ${originalEx.name}. Parabéns!`,
                        suggestion: "Continue com a progressão de carga.",
                        severity: 'low',
                        date: new Date().toISOString().split('T')[0]
                    });
                    return { ...originalEx, lastLoad: maxWeightSet.weight };
                }
                return originalEx;
            });
            return { ...w, exercises: updatedExercises };
        });

        const today = new Date().toISOString();
        const newProgress: ExerciseProgress[] = JSON.parse(JSON.stringify(exerciseProgress));
        currentWorkout.exercises.forEach(finishedEx => {
            const completedSets = finishedEx.sets.filter(s => s.isDone);
            if (completedSets.length === 0) return;
            const exerciseVolume = completedSets.reduce((sum, set) => sum + (set.weight * set.reps), 0);
            const heaviestSet = completedSets.reduce((heaviest, current) => (current.weight > heaviest.weight ? current : heaviest), completedSets[0]);

            const progressDataPoint: ProgressDataPoint = { date: today.split('T')[0], weight: heaviestSet.weight, reps: heaviestSet.reps, volume: exerciseVolume };

            let exerciseProgressIndex = newProgress.findIndex(p => p.exerciseId === finishedEx.id);
            if (exerciseProgressIndex > -1) {
                const existingData = newProgress[exerciseProgressIndex].data;
                const maxWeightBeforeToday = Math.max(...existingData.map(d => d.weight), 0);
                newProgress[exerciseProgressIndex].isPR = heaviestSet.weight > maxWeightBeforeToday;
                existingData.push(progressDataPoint);
            } else {
                newProgress.push({ exerciseId: finishedEx.id, exerciseName: finishedEx.name, isPR: true, data: [progressDataPoint] });
                exerciseProgressIndex = newProgress.length - 1;
            }

            // --- Stagnation Check ---
            const currentExerciseProgress = newProgress[exerciseProgressIndex];
            const STAGNATION_THRESHOLD = 3;
            if (currentExerciseProgress.data.length >= STAGNATION_THRESHOLD) {
                const lastThreeSessions = currentExerciseProgress.data.slice(-STAGNATION_THRESHOLD);
                const firstWeight = lastThreeSessions[0].weight;
                const isStagnated = lastThreeSessions.every(session => session.weight === firstWeight);

                const hasExistingAlert = newAlerts.some(alert => alert.title === `Estagnação no ${finishedEx.name}`);

                if (isStagnated && !hasExistingAlert) {
                    newAlerts.unshift({
                        id: `alert-stagnation-${finishedEx.id}-${Date.now()}`,
                        title: `Estagnação no ${finishedEx.name}`,
                        description: `Você está há ${STAGNATION_THRESHOLD} treinos com a mesma carga máxima (${firstWeight}kg) no ${finishedEx.name}.`,
                        suggestion: "Tente aumentar a carga, mesmo que precise diminuir as repetições, ou mude a variação do exercício para quebrar o platô.",
                        severity: 'medium',
                        date: new Date().toISOString().split('T')[0]
                    });
                }
            }
        });

        const volumeByMuscleGroup = new Map<string, number>();
        currentWorkout.exercises.forEach(ex => {
            const exerciseVolume = ex.sets.filter(s => s.isDone).reduce((sum, set) => sum + (set.weight * set.reps), 0);
            if (exerciseVolume > 0) {
                const currentVolume = volumeByMuscleGroup.get(ex.muscleGroup) || 0;
                volumeByMuscleGroup.set(ex.muscleGroup, currentVolume + exerciseVolume);
            }
        });

        const muscleGroupColors: { [key: string]: string } = { "Peito": "#0ea5e9", "Costas": "#14b8a6", "Pernas": "#f97316", "Ombros": "#6366f1", "Bíceps": "#38bdf8", "Tríceps": "#06b6d4", "Cardio": "#ef4444", "Default": "#a855f7" };
        const newMuscleVolume: MuscleGroupVolume[] = JSON.parse(JSON.stringify(muscleVolume));
        volumeByMuscleGroup.forEach((volume, name) => {
            const existingGroup = newMuscleVolume.find(mv => mv.name === name);
            if (existingGroup) {
                existingGroup.volume += volume;
            } else {
                newMuscleVolume.push({ name, volume, fill: muscleGroupColors[name] || muscleGroupColors["Default"] });
            }
        });
        
        const newCompletedWorkout: CompletedWorkout = {
            id: `cw-${Date.now()}`,
            name: currentWorkout.name,
            date: today,
            durationInSeconds: workoutSummary.durationInSeconds,
            totalVolume: workoutSummary.totalVolume,
            caloriesBurned: caloriesInput ? parseInt(caloriesInput, 10) : undefined,
            exercises: currentWorkout.exercises,
        };
        const newCompletedWorkouts = [...completedWorkouts, newCompletedWorkout];
        
        // Update states
        setWorkouts(updatedWorkouts);
        setAlerts(newAlerts);
        setExerciseProgress(newProgress);
        setMuscleVolume(newMuscleVolume);
        setCompletedWorkouts(newCompletedWorkouts);
        
        // Persist to localStorage
        localStorage.setItem('gymProWorkouts', JSON.stringify(updatedWorkouts));
        localStorage.setItem('gymProAlerts', JSON.stringify(newAlerts));
        localStorage.setItem('gymProProgress', JSON.stringify(newProgress));
        localStorage.setItem('gymProMuscleVolume', JSON.stringify(newMuscleVolume));
        localStorage.setItem('gymProCompletedWorkouts', JSON.stringify(newCompletedWorkouts));

        // Clear active workout from storage
        localStorage.removeItem('gymProActiveWorkout');
        localStorage.removeItem('gymProWorkoutStartTime');

        // Reset and navigate
        setShowWorkoutSummary(false);
        setCurrentWorkout(null);
        setWorkoutSummary(null);
        setWorkoutStartTime(null);
        setCaloriesInput('');
        navigateTo(Screen.HOME);
    };

    const renderScreen = () => {
        switch (activeScreen) {
            case Screen.HOME:
                return <HomeScreen user={user} workout={workouts[0]} alerts={alerts} onStartWorkout={() => handleStartWorkout(workouts[0])} onNavigate={navigateTo} />;
            case Screen.WORKOUTS:
                return <WorkoutsListScreen workouts={workouts} onStartWorkout={handleStartWorkout} onAddNewWorkout={handleAddNewWorkout} onEditWorkout={handleEditWorkout} />;
            case Screen.EDIT_WORKOUT:
                if (!editingWorkout) {
                    navigateTo(Screen.WORKOUTS);
                    return null;
                }
                return <EditWorkoutScreen workout={editingWorkout} onSave={handleUpdateWorkout} onCancel={() => navigateTo(Screen.WORKOUTS)} />;
            case Screen.WORKOUT:
                 if (!currentWorkout) {
                    navigateTo(Screen.WORKOUTS);
                    return null;
                }
                return <WorkoutScreen workout={currentWorkout} setWorkout={handleUpdateCurrentWorkout} onFinishWorkout={handleFinishWorkout} globalSettings={globalSettings} workoutStartTime={workoutStartTime} />;
            case Screen.PROGRESS:
                return <ProgressScreen exerciseProgress={exerciseProgress} muscleGroupVolume={muscleVolume} onNavigate={navigateTo} />;
            case Screen.HISTORY:
                return <HistoryScreen completedWorkouts={completedWorkouts} onBack={() => navigateTo(Screen.PROGRESS)} />;
            case Screen.MEASUREMENTS:
                return <MeasurementsScreen />;
            case Screen.ALERTS:
                return <AlertsScreen alerts={alerts} />;
            case Screen.SETTINGS:
                return <SettingsScreen user={tempUser} onUserChange={setTempUser} settings={tempSettings} onSettingsChange={setTempSettings} onSave={handleSaveSettings} onResetData={handleResetData} />;
            default:
                return <HomeScreen user={user} workout={workouts[0]} alerts={alerts} onStartWorkout={() => handleStartWorkout(workouts[0])} onNavigate={navigateTo} />;
        }
    };
    
    const navItems = [
        { screen: Screen.HOME, icon: ICONS.HOME, label: "Home" },
        { screen: Screen.WORKOUTS, icon: ICONS.WORKOUT, label: "Treinos" },
        { screen: Screen.PROGRESS, icon: ICONS.PROGRESS, label: "Progresso" },
        { screen: Screen.ALERTS, icon: ICONS.ALERTS, label: "Alertas" },
        { screen: Screen.SETTINGS, icon: ICONS.SETTINGS, label: "Ajustes" },
    ];

    return (
        <div className="w-full h-full bg-slate-800 font-sans flex items-center justify-center">
            <div className="w-full h-full max-w-md mx-auto bg-slate-950 flex flex-col overflow-hidden relative shadow-2xl border-x border-slate-700">
                <DesktopWarning />

                {showWorkoutSummary && workoutSummary && workoutFeedback && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 text-white text-center p-4">
                        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-sm flex flex-col items-center">
                            <ICONS.CHECK className="w-16 h-16 text-green-500 bg-green-500/10 rounded-full p-3 mb-4" />
                            <h2 className="text-3xl font-bold mb-2 text-cyan-400">{workoutFeedback.title}</h2>
                            <p className="text-slate-300 mb-6">{workoutFeedback.message}</p>
                            <div className="grid grid-cols-2 gap-y-4 text-lg w-full mb-6 text-left">
                               <div className="flex flex-col border-r border-slate-700 px-2">
                                    <span className="font-bold text-2xl">{workoutSummary.completedSets}</span>
                                    <span className="text-sm text-slate-400">Séries</span>
                               </div>
                               <div className="flex flex-col px-4">
                                    <span className="font-bold text-2xl">{workoutSummary.totalReps}</span>
                                    <span className="text-sm text-slate-400">Reps</span>
                               </div>
                               <div className="flex flex-col border-r border-slate-700 px-2">
                                    <span className="font-bold text-2xl">{workoutSummary.totalVolume.toLocaleString('pt-BR')}</span>
                                    <span className="text-sm text-slate-400">Volume (kg)</span>
                               </div>
                               <div className="flex flex-col px-4">
                                    <span className="font-bold text-2xl">{formatTime(workoutSummary.durationInSeconds)}</span>
                                    <span className="text-sm text-slate-400">Duração</span>
                               </div>
                            </div>
                            <div className="w-full mt-2">
                                <label className="text-sm text-slate-400 text-left block mb-1">Calorias Queimadas (Opcional)</label>
                                <input 
                                    type="number" 
                                    value={caloriesInput}
                                    onChange={(e) => setCaloriesInput(e.target.value)}
                                    placeholder="Ex: 350"
                                    className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-slate-100 text-center" />
                            </div>
                            <button onClick={handleConfirmWorkoutSummary} className="w-full bg-cyan-600 hover:bg-cyan-700 font-bold py-3 mt-6 rounded-xl transition-all duration-300">
                                Concluir
                            </button>
                        </div>
                    </div>
                )}
                
                <main className="flex-grow overflow-hidden">
                    {renderScreen()}
                </main>

                <nav className="w-full bg-black/50 backdrop-blur-xl border-t border-slate-700/50">
                    <div className="flex justify-around items-center h-20">
                    {navItems.map(item => {
                        const Icon = item.icon;
                        const isActive = activeScreen === item.screen;
                        return (
                             <button key={item.label} onClick={() => setActiveScreen(item.screen)} className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-300 ${isActive ? 'text-cyan-400' : 'text-slate-400 hover:text-white'}`} aria-label={item.label}>
                                <Icon className="w-7 h-7 mb-1" />
                                <span className={`text-xs ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
                            </button>
                        );
                    })}
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default App;
