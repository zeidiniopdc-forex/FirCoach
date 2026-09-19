import { WorkoutSession, WorkoutSetLog, PersonalRecord } from '../types';

export function calculateVolume(sets: WorkoutSetLog[]): number {
  return sets.reduce((total, set) => {
    if (set.completed) {
      return total + (set.weight * set.reps);
    }
    return total;
  }, 0);
}

export function calculateSessionVolume(session: WorkoutSession): number {
  return session.exercises.reduce((total, exercise) => {
    return total + calculateVolume(exercise.sets);
  }, 0);
}

export function calculateEstimated1RM(weight: number, reps: number): number {
  // Epley formula
  if (reps <= 1) return weight;
  return Math.round(weight * (1 + reps / 30));
}

export function calculateTotalSets(session: WorkoutSession): number {
  return session.exercises.reduce((total, exercise) => {
    return total + exercise.sets.filter(s => s.completed).length;
  }, 0);
}

export function calculateTotalReps(session: WorkoutSession): number {
  return session.exercises.reduce((total, exercise) => {
    return total + exercise.sets
      .filter(s => s.completed)
      .reduce((setTotal, set) => setTotal + set.reps, 0);
  }, 0);
}

export function findPersonalRecords(sessions: WorkoutSession[]): PersonalRecord[] {
  const records: Map<string, PersonalRecord> = new Map();

  sessions.forEach(session => {
    session.exercises.forEach(exercise => {
      exercise.sets.forEach(set => {
        if (!set.completed) return;
        
        const existing = records.get(exercise.exerciseName);
        const estimated1RM = calculateEstimated1RM(set.weight, set.reps);
        const volume = set.weight * set.reps;

        if (!existing) {
          records.set(exercise.exerciseName, {
            exercise: exercise.exerciseName,
            weight: set.weight,
            reps: set.reps,
            estimated1RM,
            date: set.timestamp
          });
        } else {
          if (set.weight > existing.weight) {
            existing.weight = set.weight;
            existing.reps = set.reps;
            existing.date = set.timestamp;
          }
          if (estimated1RM > existing.estimated1RM) {
            existing.estimated1RM = estimated1RM;
          }
        }
      });
    });
  });

  return Array.from(records.values());
}

export function calculateMuscleVolume(sessions: WorkoutSession[]): Map<string, number> {
  const volumes = new Map<string, number>();

  sessions.forEach(session => {
    session.exercises.forEach(exercise => {
      const completedSets = exercise.sets.filter(s => s.completed).length;
      const current = volumes.get(exercise.muscleGroup) || 0;
      volumes.set(exercise.muscleGroup, current + completedSets);
    });
  });

  return volumes;
}

export function calculateWeeklyVolume(sessions: WorkoutSession[], weeks: number = 4): { week: string; volume: number }[] {
  const now = new Date();
  const result: { week: string; volume: number }[] = [];

  for (let i = weeks - 1; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - (i * 7 + weekStart.getDay()));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    const weekSessions = sessions.filter(s => {
      const date = new Date(s.date);
      return date >= weekStart && date < weekEnd;
    });

    const volume = weekSessions.reduce((total, session) => {
      return total + calculateSessionVolume(session);
    }, 0);

    result.push({
      week: `Week ${weeks - i}`,
      volume
    });
  }

  return result;
}

export function calculateStreak(sessions: WorkoutSession[]): number {
  if (sessions.length === 0) return 0;

  const sortedDates = [...new Set(sessions.map(s => s.date))].sort().reverse();
  const today = new Date().toISOString().split('T')[0];
  
  let streak = 0;
  let checkDate = new Date();

  for (const date of sortedDates) {
    const diff = Math.floor((checkDate.getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
    if (diff <= 1) {
      streak++;
      checkDate = new Date(date);
    } else {
      break;
    }
  }

  return streak;
}

export function formatDuration(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs > 0) return `${hrs}h ${mins}m`;
  return `${mins}m`;
}

export function formatVolume(volume: number): string {
  if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M kg`;
  if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K kg`;
  return `${volume} kg`;
}
