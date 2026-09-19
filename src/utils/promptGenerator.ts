import { AppState } from '../types';

const JSON_SCHEMA = `{
  "schema_version": "1.0",
  "program": {
    "id": "unique-program-id",
    "name": "Program Name",
    "description": "Brief description",
    "goal": ["primary_goal", "secondary_goal"],
    "duration_weeks": 8,
    "days_per_week": 4
  },
  "user_context": {
    "age": 30,
    "sex": "male",
    "height_cm": 175,
    "weight_kg": 80,
    "experience_level": "intermediate",
    "training_experience_years": 3
  },
  "days": [
    {
      "day_id": "day_1",
      "name": "Upper Body Push",
      "weekday": "Monday",
      "focus": ["Chest", "Shoulders", "Triceps"],
      "exercises": [
        {
          "exercise_id": "ex_001",
          "name": "Barbell Bench Press",
          "muscle_group": "Chest",
          "secondary_muscles": ["Triceps", "Shoulders"],
          "order": 1,
          "sets": 4,
          "reps": { "min": 6, "max": 10 },
          "target_weight": null,
          "rir": 2,
          "rpe": null,
          "rest_seconds": 120,
          "tempo": "3-1-1-0",
          "equipment": "Barbell",
          "notes": "Control the eccentric",
          "superset_group": null,
          "warmup": false
        }
      ]
    }
  ]
}`;

export function generatePrompt(state: AppState): string {
  const { profile, goals, priorityMuscles, trainingHistory, limitations, equipment, schedule, preferences, nutrition } = state;

  let prompt = `# Personalized Workout Program Generator

You are an expert exercise scientist and strength coach. Based on the client profile below, generate a complete, periodized workout program.

## Client Profile

`;

  if (profile) {
    prompt += `### Basic Information
- Name: ${profile.name}
- Age: ${profile.age}
- Sex: ${profile.sex}
- Height: ${profile.heightCm} cm
- Weight: ${profile.weightKg} kg

`;
  }

  if (goals.length > 0) {
    prompt += `### Training Goals
`;
    goals.forEach(g => {
      prompt += `- ${g.type} (Priority: ${g.priority})\n`;
    });
    prompt += '\n';
  }

  if (priorityMuscles.length > 0) {
    prompt += `### Priority Muscle Groups (in order of priority)
${priorityMuscles.map((m, i) => `${i + 1}. ${m}`).join('\n')}

`;
  }

  if (trainingHistory) {
    prompt += `### Training History
- Experience Level: ${trainingHistory.level}
- Years of Training: ${trainingHistory.yearsOfExperience}
- Current Sessions/Week: ${trainingHistory.currentSessionsPerWeek}
- Average Session Duration: ${trainingHistory.averageSessionMinutes} minutes
- Bodybuilding Experience: ${trainingHistory.bodybuildingExperience}
- Other Sports: ${trainingHistory.otherSportsExperience}

`;
  }

  if (limitations && limitations.hasLimitation) {
    prompt += `### ⚠️ IMPORTANT: Limitations & Injuries
- Location: ${limitations.location || 'Not specified'}
- Type: ${limitations.type || 'Not specified'}
- Forbidden Exercises: ${limitations.forbiddenExercises.join(', ') || 'None specified'}
- Exercises to Avoid: ${limitations.avoidExercises.join(', ') || 'None specified'}
- Preferred Exercises: ${limitations.preferredExercises.join(', ') || 'None specified'}
- Use with Caution: ${limitations.cautionExercises.join(', ') || 'None specified'}
- Additional Notes: ${limitations.notes || 'None'}

**CRITICAL**: Do NOT suggest any forbidden exercises. Do NOT make medical assumptions. Only use the information provided above as constraints.

`;
  }

  if (equipment.length > 0) {
    prompt += `### Available Equipment
${equipment.map(e => `- ${e.type}${e.customName ? ` (${e.customName})` : ''}`).join('\n')}

`;
  }

  if (schedule) {
    prompt += `### Schedule
- Days per Week: ${schedule.daysPerWeek}
- Available Days: ${schedule.availableDays.join(', ')}
- Session Duration: ${schedule.sessionDurationMinutes} minutes
- Preferred Time: ${schedule.preferredTime || 'Flexible'}
- Flexibility: ${schedule.flexible ? 'Yes' : 'No'}

`;
  }

  if (preferences) {
    prompt += `### Training Preferences
- Volume Preference: ${preferences.volume}
- Intensity Preference: ${preferences.intensity}
- Preferred Sets per Exercise: ${preferences.preferredSets}
- Rep Range: ${preferences.repRange.min}-${preferences.repRange.max}
- Rest Time: ${preferences.restSeconds} seconds
- Techniques: ${preferences.techniques.join(', ') || 'Standard'}
- Preferred Exercises: ${preferences.preferredExercises.join(', ') || 'None specified'}
- Exercises to Avoid: ${preferences.avoidExercises.join(', ') || 'None specified'}

`;
  }

  if (nutrition && (nutrition.calories || nutrition.protein)) {
    prompt += `### Nutrition Context (for reference only)
- Calories: ${nutrition.calories || 'Not specified'}
- Protein: ${nutrition.protein || 'Not specified'}g
- Diet: ${nutrition.diet || 'Not specified'}
- Meals/Day: ${nutrition.mealsPerDay || 'Not specified'}
- Supplements: ${nutrition.supplements?.join(', ') || 'None'}

`;
  }

  prompt += `## Program Requirements

1. Create a program that matches the client's goals, experience level, and available equipment.
2. Respect ALL limitations and forbidden exercises.
3. Include appropriate warm-up sets.
4. Use RIR (Reps in Reserve) for intensity management.
5. Include proper rest periods based on exercise type.
6. Consider progressive overload principles.
7. Match volume to the client's experience level.
8. If superset groups are used, assign a common "superset_group" identifier.

## Output Format

Your response MUST be ONLY valid JSON matching this exact schema:

${JSON_SCHEMA}

## Strict Rules

1. Output ONLY valid JSON. No markdown, no explanation, no code fences.
2. Every exercise must have a unique exercise_id.
3. Every day must have a unique day_id.
4. Sets must be positive integers.
5. Reps must have min and max as positive integers where max >= min.
6. Rest_seconds must be non-negative integers.
7. Include all required fields for each exercise.
8. Match the number of days to the client's schedule (${schedule?.daysPerWeek || 4} days/week).
9. Each session should fit within ${schedule?.sessionDurationMinutes || 60} minutes.
10. Use only the equipment listed above.
`;

  return prompt;
}
