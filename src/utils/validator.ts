import { WorkoutProgram, ValidationResult, ValidationError } from '../types';

export function validateWorkoutJSON(jsonString: string): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: string[] = [];

  // Check JSON syntax
  let parsed: any;
  try {
    parsed = JSON.parse(jsonString);
  } catch (e) {
    return {
      valid: false,
      errors: [{
        field: 'root',
        error: 'Invalid JSON syntax',
        location: 'root',
        suggestedFix: 'Check for missing commas, brackets, or quotes'
      }],
      warnings: []
    };
  }

  // Check schema_version
  if (!parsed.schema_version) {
    errors.push({
      field: 'schema_version',
      error: 'Missing schema_version',
      location: 'root',
      expected: 'string (e.g., "1.0")',
      suggestedFix: 'Add "schema_version": "1.0" to the root object'
    });
  }

  // Check program
  if (!parsed.program) {
    errors.push({
      field: 'program',
      error: 'Missing program object',
      location: 'root.program',
      suggestedFix: 'Add a "program" object with id, name, goal, duration_weeks, days_per_week'
    });
  } else {
    const requiredProgramFields = ['id', 'name', 'duration_weeks', 'days_per_week'];
    requiredProgramFields.forEach(field => {
      if (parsed.program[field] === undefined) {
        errors.push({
          field: `program.${field}`,
          error: `Missing required field: ${field}`,
          location: `root.program.${field}`,
          suggestedFix: `Add "${field}" to the program object`
        });
      }
    });
  }

  // Check user_context
  if (!parsed.user_context) {
    warnings.push('Missing user_context - this is recommended for tracking');
  }

  // Check days
  if (!parsed.days || !Array.isArray(parsed.days)) {
    errors.push({
      field: 'days',
      error: 'Missing or invalid days array',
      location: 'root.days',
      suggestedFix: 'Add a "days" array containing workout day objects'
    });
  } else {
    const dayIds = new Set<string>();
    parsed.days.forEach((day: any, dayIndex: number) => {
      // Check day_id
      if (!day.day_id) {
        errors.push({
          field: `days[${dayIndex}].day_id`,
          error: 'Missing day_id',
          location: `root.days[${dayIndex}].day_id`,
          suggestedFix: 'Add a unique day_id string'
        });
      } else if (dayIds.has(day.day_id)) {
        errors.push({
          field: `days[${dayIndex}].day_id`,
          error: `Duplicate day_id: ${day.day_id}`,
          location: `root.days[${dayIndex}].day_id`,
          suggestedFix: 'Each day must have a unique day_id'
        });
      }
      dayIds.add(day.day_id);

      // Check day name
      if (!day.name) {
        errors.push({
          field: `days[${dayIndex}].name`,
          error: 'Missing day name',
          location: `root.days[${dayIndex}].name`,
          suggestedFix: 'Add a descriptive name for this workout day'
        });
      }

      // Check exercises
      if (!day.exercises || !Array.isArray(day.exercises)) {
        errors.push({
          field: `days[${dayIndex}].exercises`,
          error: 'Missing or invalid exercises array',
          location: `root.days[${dayIndex}].exercises`,
          suggestedFix: 'Add an "exercises" array'
        });
      } else {
        const exerciseIds = new Set<string>();
        day.exercises.forEach((ex: any, exIndex: number) => {
          const loc = `days[${dayIndex}].exercises[${exIndex}]`;
          
          if (!ex.exercise_id) {
            errors.push({
              field: `${loc}.exercise_id`,
              error: 'Missing exercise_id',
              location: `root.${loc}.exercise_id`,
              suggestedFix: 'Add a unique exercise_id'
            });
          } else if (exerciseIds.has(ex.exercise_id)) {
            errors.push({
              field: `${loc}.exercise_id`,
              error: `Duplicate exercise_id: ${ex.exercise_id}`,
              location: `root.${loc}.exercise_id`,
              suggestedFix: 'Each exercise must have a unique exercise_id'
            });
          }
          exerciseIds.add(ex.exercise_id);

          if (!ex.name) {
            errors.push({
              field: `${loc}.name`,
              error: 'Missing exercise name',
              location: `root.${loc}.name`,
              suggestedFix: 'Add the exercise name'
            });
          }

          if (ex.sets !== undefined && (typeof ex.sets !== 'number' || ex.sets < 1)) {
            errors.push({
              field: `${loc}.sets`,
              error: 'Invalid sets value',
              location: `root.${loc}.sets`,
              expected: 'positive integer',
              received: String(ex.sets),
              suggestedFix: 'Sets must be a positive integer (e.g., 3)'
            });
          }

          if (ex.reps) {
            if (typeof ex.reps.min !== 'number' || ex.reps.min < 1) {
              errors.push({
                field: `${loc}.reps.min`,
                error: 'Invalid min reps',
                location: `root.${loc}.reps.min`,
                expected: 'positive integer',
                suggestedFix: 'Min reps must be at least 1'
              });
            }
            if (typeof ex.reps.max !== 'number' || ex.reps.max < ex.reps.min) {
              errors.push({
                field: `${loc}.reps.max`,
                error: 'Invalid max reps',
                location: `root.${loc}.reps.max`,
                expected: `integer >= ${ex.reps.min}`,
                suggestedFix: 'Max reps must be >= min reps'
              });
            }
          }

          if (ex.rest_seconds !== undefined && (typeof ex.rest_seconds !== 'number' || ex.rest_seconds < 0)) {
            errors.push({
              field: `${loc}.rest_seconds`,
              error: 'Invalid rest_seconds',
              location: `root.${loc}.rest_seconds`,
              expected: 'non-negative integer',
              suggestedFix: 'Rest seconds must be 0 or greater'
            });
          }
        });
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

export function parseWorkoutProgram(jsonString: string): WorkoutProgram | null {
  const result = validateWorkoutJSON(jsonString);
  if (!result.valid) return null;
  
  try {
    return JSON.parse(jsonString) as WorkoutProgram;
  } catch {
    return null;
  }
}
