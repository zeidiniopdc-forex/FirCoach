import { ExerciseLibraryItem } from '../types';

export const exerciseLibrary: ExerciseLibraryItem[] = [
  // Chest
  { id: 'ex_lib_001', name: 'Barbell Bench Press', nameFa: 'پرس سینه هالتر', muscle: 'Chest', secondaryMuscles: ['Triceps', 'Shoulders'], equipment: 'Barbell', instructions: 'Lie on bench, grip bar slightly wider than shoulder width. Lower to chest, press up.', difficulty: 'intermediate', type: 'strength', tags: ['compound', 'push'] },
  { id: 'ex_lib_002', name: 'Dumbbell Bench Press', nameFa: 'پرس سینه دمبل', muscle: 'Chest', secondaryMuscles: ['Triceps', 'Shoulders'], equipment: 'Dumbbells', instructions: 'Lie on bench with dumbbells. Press up and lower with control.', difficulty: 'intermediate', type: 'strength', tags: ['compound', 'push'] },
  { id: 'ex_lib_003', name: 'Incline Dumbbell Press', nameFa: 'پرس بالا سینه دمبل', muscle: 'Chest', secondaryMuscles: ['Shoulders', 'Triceps'], equipment: 'Dumbbells', instructions: 'Set bench to 30-45 degrees. Press dumbbells up from chest level.', difficulty: 'intermediate', type: 'strength', tags: ['compound', 'push', 'upper_chest'] },
  { id: 'ex_lib_004', name: 'Cable Flyes', nameFa: 'قفسه سینه سیم‌کش', muscle: 'Chest', secondaryMuscles: ['Shoulders'], equipment: 'Cable', instructions: 'Stand between cables, bring handles together in front of chest with slight bend in elbows.', difficulty: 'beginner', type: 'strength', tags: ['isolation', 'push'] },
  { id: 'ex_lib_005', name: 'Push-Ups', nameFa: 'شنا', muscle: 'Chest', secondaryMuscles: ['Triceps', 'Shoulders', 'Abs'], equipment: 'Bodyweight', instructions: 'Start in plank position. Lower body until chest nearly touches floor, push back up.', difficulty: 'beginner', type: 'strength', tags: ['compound', 'push', 'bodyweight'] },
  { id: 'ex_lib_006', name: 'Chest Dips', nameFa: 'دیپ سینه', muscle: 'Chest', secondaryMuscles: ['Triceps', 'Shoulders'], equipment: 'Bodyweight', instructions: 'Lean forward on parallel bars. Lower body, then press up.', difficulty: 'intermediate', type: 'strength', tags: ['compound', 'push', 'bodyweight'] },

  // Back
  { id: 'ex_lib_007', name: 'Barbell Row', nameFa: 'زیربغل هالتر خم', muscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts'], equipment: 'Barbell', instructions: 'Bend over at 45 degrees, pull barbell to lower chest.', difficulty: 'intermediate', type: 'strength', tags: ['compound', 'pull'] },
  { id: 'ex_lib_008', name: 'Pull-Ups', nameFa: 'بارفیکس', muscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts'], equipment: 'Pull-up Bar', instructions: 'Hang from bar, pull body up until chin over bar.', difficulty: 'intermediate', type: 'strength', tags: ['compound', 'pull', 'bodyweight'] },
  { id: 'ex_lib_009', name: 'Lat Pulldown', nameFa: 'زیربغل سیم‌کش', muscle: 'Back', secondaryMuscles: ['Biceps', 'Rear Delts'], equipment: 'Cable', instructions: 'Sit at lat pulldown machine, pull bar to upper chest.', difficulty: 'beginner', type: 'strength', tags: ['compound', 'pull'] },
  { id: 'ex_lib_010', name: 'Seated Cable Row', nameFa: 'قایقی سیم‌کش', muscle: 'Back', secondaryMuscles: ['Biceps'], equipment: 'Cable', instructions: 'Sit at cable row, pull handle to torso, squeeze shoulder blades.', difficulty: 'beginner', type: 'strength', tags: ['compound', 'pull'] },
  { id: 'ex_lib_011', name: 'Deadlift', nameFa: 'ددلیفت', muscle: 'Back', secondaryMuscles: ['Hamstrings', 'Glutes', 'Quads', 'Traps'], equipment: 'Barbell', instructions: 'Stand with bar over midfoot. Hinge at hips, grip bar, stand up keeping back straight.', difficulty: 'advanced', type: 'strength', tags: ['compound', 'pull', 'hinge'] },

  // Shoulders
  { id: 'ex_lib_012', name: 'Overhead Press', nameFa: 'پرس سرشانه هالتر', muscle: 'Shoulders', secondaryMuscles: ['Triceps', 'Traps'], equipment: 'Barbell', instructions: 'Stand with bar at shoulder level. Press overhead until arms locked.', difficulty: 'intermediate', type: 'strength', tags: ['compound', 'push'] },
  { id: 'ex_lib_013', name: 'Dumbbell Lateral Raise', nameFa: 'نشر جانب دمبل', muscle: 'Shoulders', secondaryMuscles: ['Traps'], equipment: 'Dumbbells', instructions: 'Stand with dumbbells at sides. Raise arms to sides until parallel with floor.', difficulty: 'beginner', type: 'strength', tags: ['isolation', 'push'] },
  { id: 'ex_lib_014', name: 'Face Pull', nameFa: 'فیس پول', muscle: 'Shoulders', secondaryMuscles: ['Rear Delts', 'Traps'], equipment: 'Cable', instructions: 'Set cable at face height. Pull rope towards face, externally rotating shoulders.', difficulty: 'beginner', type: 'strength', tags: ['isolation', 'pull', 'rear_delt'] },
  { id: 'ex_lib_015', name: 'Arnold Press', nameFa: 'پرس آرنولد', muscle: 'Shoulders', secondaryMuscles: ['Triceps'], equipment: 'Dumbbells', instructions: 'Start with dumbbells in front, palms facing you. Rotate and press overhead.', difficulty: 'intermediate', type: 'strength', tags: ['compound', 'push'] },

  // Arms
  { id: 'ex_lib_016', name: 'Barbell Curl', nameFa: 'جلوبازو هالتر', muscle: 'Biceps', secondaryMuscles: ['Forearms'], equipment: 'Barbell', instructions: 'Stand with barbell, curl up keeping elbows stationary.', difficulty: 'beginner', type: 'strength', tags: ['isolation', 'pull'] },
  { id: 'ex_lib_017', name: 'Tricep Pushdown', nameFa: 'پشت بازو سیم‌کش', muscle: 'Triceps', secondaryMuscles: [], equipment: 'Cable', instructions: 'At cable machine, push handle down extending arms fully.', difficulty: 'beginner', type: 'strength', tags: ['isolation', 'push'] },
  { id: 'ex_lib_018', name: 'Hammer Curl', nameFa: 'جلوبازو چکشی', muscle: 'Biceps', secondaryMuscles: ['Forearms'], equipment: 'Dumbbells', instructions: 'Hold dumbbells with neutral grip. Curl up keeping wrists neutral.', difficulty: 'beginner', type: 'strength', tags: ['isolation', 'pull'] },
  { id: 'ex_lib_019', name: 'Skull Crushers', nameFa: 'جمجمه‌شکن', muscle: 'Triceps', secondaryMuscles: [], equipment: 'Barbell', instructions: 'Lie on bench, extend bar upward then lower to forehead by bending elbows.', difficulty: 'intermediate', type: 'strength', tags: ['isolation', 'push'] },

  // Legs
  { id: 'ex_lib_020', name: 'Barbell Squat', nameFa: 'اسکات هالتر', muscle: 'Quads', secondaryMuscles: ['Glutes', 'Hamstrings', 'Abs'], equipment: 'Barbell', instructions: 'Bar on upper back. Squat down until thighs parallel, stand back up.', difficulty: 'intermediate', type: 'strength', tags: ['compound', 'push', 'squat'] },
  { id: 'ex_lib_021', name: 'Romanian Deadlift', nameFa: 'ددلیفت رومانیایی', muscle: 'Hamstrings', secondaryMuscles: ['Glutes', 'Back'], equipment: 'Barbell', instructions: 'Hold bar at hip level. Hinge at hips, lower bar along legs keeping slight knee bend.', difficulty: 'intermediate', type: 'strength', tags: ['compound', 'hinge', 'pull'] },
  { id: 'ex_lib_022', name: 'Leg Press', nameFa: 'پرس پا', muscle: 'Quads', secondaryMuscles: ['Glutes', 'Hamstrings'], equipment: 'Machine', instructions: 'Sit in leg press machine. Push platform away, lower with control.', difficulty: 'beginner', type: 'strength', tags: ['compound', 'push'] },
  { id: 'ex_lib_023', name: 'Leg Curl', nameFa: 'پشت ران دستگاه', muscle: 'Hamstrings', secondaryMuscles: [], equipment: 'Machine', instructions: 'Lie face down on leg curl machine. Curl legs up, lower with control.', difficulty: 'beginner', type: 'strength', tags: ['isolation', 'pull'] },
  { id: 'ex_lib_024', name: 'Bulgarian Split Squat', nameFa: 'اسکات بلغاری', muscle: 'Quads', secondaryMuscles: ['Glutes', 'Hamstrings'], equipment: 'Dumbbells', instructions: 'Rear foot elevated on bench. Lower into lunge position, drive back up.', difficulty: 'intermediate', type: 'strength', tags: ['compound', 'push', 'unilateral'] },
  { id: 'ex_lib_025', name: 'Calf Raise', nameFa: 'ساق پا', muscle: 'Calves', secondaryMuscles: [], equipment: 'Machine', instructions: 'Stand on calf raise machine. Raise up on toes, lower with stretch.', difficulty: 'beginner', type: 'strength', tags: ['isolation', 'push'] },
  { id: 'ex_lib_026', name: 'Hip Thrust', nameFa: 'هیپ تراست', muscle: 'Glutes', secondaryMuscles: ['Hamstrings'], equipment: 'Barbell', instructions: 'Back on bench, bar over hips. Drive hips up, squeeze glutes at top.', difficulty: 'intermediate', type: 'strength', tags: ['compound', 'push', 'hinge'] },

  // Abs
  { id: 'ex_lib_027', name: 'Cable Crunch', nameFa: 'کرانچ سیم‌کش', muscle: 'Abs', secondaryMuscles: [], equipment: 'Cable', instructions: 'Kneel at cable machine with rope behind head. Crunch down flexing abs.', difficulty: 'beginner', type: 'strength', tags: ['isolation', 'pull'] },
  { id: 'ex_lib_028', name: 'Hanging Leg Raise', nameFa: 'زیرشکم آویزان', muscle: 'Abs', secondaryMuscles: ['Hip Flexors'], equipment: 'Pull-up Bar', instructions: 'Hang from bar. Raise legs up keeping them straight or bent.', difficulty: 'intermediate', type: 'strength', tags: ['isolation', 'pull', 'bodyweight'] },
  { id: 'ex_lib_029', name: 'Plank', nameFa: 'پلانک', muscle: 'Abs', secondaryMuscles: ['Shoulders', 'Glutes'], equipment: 'Bodyweight', instructions: 'Hold push-up position on forearms. Keep body straight.', difficulty: 'beginner', type: 'strength', tags: ['isolation', 'bodyweight', 'core'] },
];

export function searchExercises(query: string, filters?: { muscle?: string; equipment?: string; difficulty?: string }): ExerciseLibraryItem[] {
  let results = exerciseLibrary;
  
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(ex => 
      ex.name.toLowerCase().includes(q) || 
      ex.muscle.toLowerCase().includes(q) ||
      ex.tags.some(t => t.includes(q))
    );
  }

  if (filters?.muscle) {
    results = results.filter(ex => ex.muscle === filters.muscle);
  }
  if (filters?.equipment) {
    results = results.filter(ex => ex.equipment === filters.equipment);
  }
  if (filters?.difficulty) {
    results = results.filter(ex => ex.difficulty === filters.difficulty);
  }

  return results;
}
