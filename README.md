# FitForge - AI-Powered Workout Planner & Tracker

<div align="center">

![FitForge](https://img.shields.io/badge/FitForge-v1.0.0-indigo)
![React](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

**برنامه‌ریزی تمرینی هوشمند با کمک هوش مصنوعی و ردیابی حرفه‌ای پیشرفت**

[ویژگی‌ها](#ویژگیها) • [نصب و راه‌اندازی](#نصب-و-راهاندازی) • [استفاده](#استفاده) • [مشارکت](#مشارکت)

</div>

---

## 📋 فهرست مطالب

- [معرفی](#معرفی)
- [ویژگی‌ها](#ویژگیها)
- [نصب و راه‌اندازی](#نصب-و-راهاندازی)
- [استفاده](#استفاده)
- [ساختار پروژه](#ساختار-پروژه)
- [معماری](#معماری)
- [JSON Schema](#json-schema)
- [مشارکت](#مشارکت)
- [لایسنس](#لایسنس)

---

## 🎯 معرفی

FitForge یک اپلیکیشن وب پیشرفته برای تولید برنامه‌های تمرینی شخصی‌سازی‌شده با کمک هوش مصنوعی و ردیابی حرفه‌ای جلسات تمرینی است. این اپلیکیشن چرخه کاملی از ساخت پروفایل تا تحلیل پیشرفت را پوشش می‌دهد.

### 🔄 چرخه کامل اپلیکیشن

```
USER PROFILE → TRAINING ASSESSMENT → PROMPT GENERATOR → COPY/SHARE PROMPT
     ↓
EXTERNAL AI (ChatGPT, Claude, Gemini, etc.)
     ↓
STRUCTURED JSON → IMPORT JSON → JSON VALIDATION → WORKOUT PROGRAM
     ↓
WORKOUT TRACKER → PROGRESS ANALYTICS → DASHBOARD
```

### ✨ اصل مهم معماری

**هوش مصنوعی از اپلیکیشن مستقل است** - JSON به عنوان قرارداد استاندارد بین AI و اپلیکیشن عمل می‌کند. اپلیکیشن به هیچ مدل AI خاصی وابسته نیست.

---

## 🚀 ویژگی‌ها

### 👤 مدیریت پروفایل کاربر
- ✅ اطلاعات پایه (نام، سن، جنسیت، قد، وزن)
- ✅ اندازه‌گیری‌های بدنی (دور کمر، سینه، باسن، گردن، بازو، ران)
- ✅ تعیین اهداف تمرینی با اولویت‌بندی
- ✅ سابقه تمرینی و سطح تجربه
- ✅ محدودیت‌ها و آسیب‌ها
- ✅ تجهیزات در دسترس
- ✅ برنامه زمانی تمرین
- ✅ ترجیحات تمرینی (حجم، شدت، ست، تکرار، استراحت)
- ✅ اطلاعات تغذیه‌ای (اختیاری)

### 🤖 تولید پرامپت هوشمند
- ✅ تولید پرامپت حرفه‌ای بر اساس پروفایل کاربر
- ✅ سازگار با تمام مدل‌های AI (ChatGPT, Claude, Gemini, etc.)
- ✅ کپی و اشتراک‌گذاری پرامپت
- ✅ ذخیره تاریخچه پرامپت‌ها
- ✅ امکان بازتولید پرامپت

### 📥 وارد کردن برنامه
- ✅ Paste JSON
- ✅ Upload فایل JSON
- ✅ بارگذاری برنامه نمونه
- ✅ اعتبارسنجی کامل JSON
- ✅ نمایش دقیق خطاها با محل و پیشنهاد رفع

### 🏋️ ردیابی تمرین
- ✅ نمایش تمرینات روز
- ✅ ثبت وزن، تکرار، RIR/RPE برای هر ست
- ✅ تایمر استراحت با امکان Pause/Resume
- ✅ تکمیل خودکار تمرینات
- ✅ خلاصه جلسه تمرینی

### 📊 تحلیل پیشرفت
- ✅ نمودار حجم تمرین
- ✅ نمودار فرکانس تمرین
- ✅ تحلیل حجم عضلانی
- ✅ رکوردهای شخصی (PRs)
- ✅ محاسبه 1RM تخمینی
- ✅ Streak tracking
- ✅ فیلتر زمانی (7 روز، 30 روز، 90 روز، 6 ماه، 1 سال)

### 📅 تاریخچه و تقویم
- ✅ لیست جلسات قبلی
- ✅ نمای تقویمی
- ✅ جزئیات کامل هر جلسه
- ✅ نمایش روزهای تمرین انجام‌شده

### 📚 کتابخانه تمرینات
- ✅ بیش از 29 تمرین از پیش تعریف‌شده
- ✅ فیلتر بر اساس عضله، تجهیزات، سطح
- ✅ جستجوی پیشرفته
- ✅ امکان افزودن تمرین سفارشی

### 📦 مدیریت برنامه‌ها
- ✅ چندین برنامه همزمان
- ✅ فعال/غیرفعال کردن برنامه
- ✅ Export به JSON
- ✅ Duplicate برنامه
- ✅ حذف برنامه

### ⚙️ تنظیمات
- ✅ تم تاریک/روشن
- ✅ پشتیبانی از زبان فارسی و انگلیسی
- ✅ RTL برای فارسی
- ✅ واحد وزن (kg/lb)
- ✅ تنظیمات اعلان‌ها
- ✅ Backup و Restore

---

## 🛠️ نصب و راه‌اندازی

### پیش‌نیازها
- Node.js 18+ 
- npm یا yarn

### نصب

```bash
# Clone repository
git clone https://github.com/yourusername/fitforge.git
cd fitforge

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### دسترسی به اپلیکیشن

پس از اجرای `npm run dev`، اپلیکیشن در آدرس `http://localhost:5173` در دسترس خواهد بود.

---

## 📖 استفاده

### 1. تکمیل پروفایل

پس از اولین اجرا، Onboarding نمایش داده می‌شود. سپس فرم پروفایل را تکمیل کنید:

- اطلاعات پایه
- اهداف تمرینی
- سابقه تمرینی
- محدودیت‌ها
- تجهیزات
- برنامه زمانی
- ترجیحات
- اطلاعات تغذیه‌ای (اختیاری)

### 2. تولید پرامپت

پس از تکمیل پروفایل:

1. روی دکمه "Generate Prompt" (آیکون ✨) کلیک کنید
2. پرامپت تولید شده را کپی کنید
3. پرامپت را به AI دلخواه (ChatGPT, Claude, Gemini, etc.) بدهید
4. AI یک JSON مطابق Schema تولید می‌کند

### 3. وارد کردن برنامه

1. روی دکمه "Import Program" (آیکون 📤) کلیک کنید
2. JSON تولید شده توسط AI را Paste یا Upload کنید
3. اپلیکیشن JSON را اعتبارسنجی می‌کند
4. در صورت معتبر بودن، برنامه Import می‌شود

### 4. شروع تمرین

1. به تب "Workout" بروید
2. روی "Start Workout" کلیک کنید
3. وزن، تکرار و RIR/RPE را برای هر ست ثبت کنید
4. پس از تکمیل هر ست، تایمر استراحت شروع می‌شود
5. پس از اتمام تمرین، روی "Finish" کلیک کنید

### 5. مشاهده پیشرفت

به تب "Progress" بروید و:

- نمودار حجم تمرین را مشاهده کنید
- رکوردهای شخصی را ببینید
- تحلیل عضلانی را بررسی کنید
- فرکانس تمرین را دنبال کنید

---

## 📁 ساختار پروژه

```
fitforge/
├── .github/
│   └── workflows/
│       ├── ci.yml              # CI/CD Pipeline
│       ├── deploy.yml          # Deploy to GitHub Pages
│       └── release.yml         # Auto Release
├── src/
│   ├── contexts/
│   │   └── AppContext.tsx      # Global state management
│   ├── data/
│   │   ├── exerciseLibrary.ts  # Exercise database
│   │   └── sampleProgram.ts    # Sample workout program
│   ├── pages/
│   │   ├── Dashboard.tsx       # Main dashboard
│   │   ├── Workout.tsx         # Workout tracker
│   │   ├── Programs.tsx        # Program management
│   │   ├── Progress.tsx        # Progress analytics
│   │   ├── Profile.tsx         # User profile
│   │   ├── History.tsx         # Workout history
│   │   ├── ExerciseLibrary.tsx # Exercise library
│   │   ├── Settings.tsx        # App settings
│   │   ├── Onboarding.tsx      # Onboarding screens
│   │   ├── ProfileSetup.tsx    # Profile setup wizard
│   │   ├── PromptGenerator.tsx # AI prompt generator
│   │   └── ImportProgram.tsx   # JSON import
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   ├── utils/
│   │   ├── storage.ts          # LocalStorage utilities
│   │   ├── validator.ts        # JSON validation
│   │   ├── promptGenerator.ts  # Prompt generation
│   │   └── calculations.ts     # Workout calculations
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.js
└── README.md
```

---

## 🏗️ معماری

### State Management

از React Context API برای مدیریت state سراسری استفاده شده است:

```typescript
interface AppState {
  profile: UserProfile | null;
  goals: TrainingGoal[];
  priorityMuscles: MuscleGroup[];
  trainingHistory: TrainingHistory | null;
  limitations: Limitation | null;
  equipment: Equipment[];
  schedule: Schedule | null;
  preferences: Preferences | null;
  nutrition: NutritionInfo | null;
  programs: WorkoutProgram[];
  activeProgramId: string | null;
  sessions: WorkoutSession[];
  promptHistory: PromptHistory[];
  settings: AppSettings;
  customExercises: ExerciseLibraryItem[];
}
```

### Data Persistence

تمام داده‌ها در LocalStorage ذخیره می‌شوند:

```typescript
// Save state
localStorage.setItem('fitforge_app_state', JSON.stringify(state));

// Load state
const state = JSON.parse(localStorage.getItem('fitforge_app_state'));
```

### JSON Validation

اعتبارسنجی کامل JSON با نمایش دقیق خطاها:

```typescript
interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: string[];
}

interface ValidationError {
  field: string;
  error: string;
  location: string;
  expected?: string;
  received?: string;
  suggestedFix?: string;
}
```

---

## 📄 JSON Schema

### ساختار برنامه تمرینی

```json
{
  "schema_version": "1.0",
  "program": {
    "id": "unique-program-id",
    "name": "Program Name",
    "description": "Brief description",
    "goal": ["muscle_hypertrophy", "strength"],
    "duration_weeks": 8,
    "days_per_week": 4
  },
  "user_context": {
    "age": 28,
    "sex": "male",
    "height_cm": 178,
    "weight_kg": 82,
    "experience_level": "intermediate",
    "training_experience_years": 3
  },
  "days": [
    {
      "day_id": "day_1",
      "name": "Upper Body Push",
      "weekday": "Saturday",
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
          "rest_seconds": 150,
          "tempo": "3-1-1-0",
          "equipment": "Barbell",
          "notes": "Focus on controlled eccentric",
          "superset_group": null,
          "warmup": false
        }
      ]
    }
  ]
}
```

### فیلدهای ضروری

- `schema_version`: نسخه Schema
- `program.id`: شناسه یکتای برنامه
- `program.name`: نام برنامه
- `program.duration_weeks`: مدت برنامه (هفته)
- `program.days_per_week`: تعداد روزهای تمرین در هفته
- `days[].day_id`: شناسه یکتای روز
- `days[].name`: نام روز تمرین
- `days[].exercises[]`: لیست تمرینات
- `exercises[].exercise_id`: شناسه یکتای تمرین
- `exercises[].name`: نام تمرین
- `exercises[].sets`: تعداد ست
- `exercises[].reps`: محدوده تکرار
- `exercises[].rest_seconds`: زمان استراحت

---

## 🤝 مشارکت

مشارکت شما باعث خوشحالی ماست! لطفاً مراحل زیر را دنبال کنید:

1. Fork پروژه
2. Branch جدید ایجاد کنید (`git checkout -b feature/AmazingFeature`)
3. تغییرات را Commit کنید (`git commit -m 'Add some AmazingFeature'`)
4. به Branch پوش کنید (`git push origin feature/AmazingFeature`)
5. Pull Request باز کنید

### راهنمای کدنویسی

- از TypeScript استفاده کنید
- کامپوننت‌ها را کوچک و متمرکز نگه دارید
- از React Hooks استفاده کنید
- کامنت‌های معنادار بنویسید
- از Tailwind CSS برای استایل‌دهی استفاده کنید

---

## 📝 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است. برای جزئیات بیشتر به فایل [LICENSE](LICENSE) مراجعه کنید.

---

## 🙏 قدردانی

- [React](https://reactjs.org/) - کتابخانه UI
- [TypeScript](https://www.typescriptlang.org/) - زبان برنامه‌نویسی
- [Tailwind CSS](https://tailwindcss.com/) - فریمورک CSS
- [Vite](https://vitejs.dev/) - Build tool
- [Framer Motion](https://www.framer.com/motion/) - انیمیشن
- [Recharts](https://recharts.org/) - نمودارها
- [Lucide React](https://lucide.dev/) - آیکون‌ها

---

## 📱 ساخت APK اندروید

این پروژه از [Capacitor](https://capacitorjs.com/) برای تبدیل وب اپ به اپلیکیشن اندروید استفاده می‌کند.

### ساخت خودکار با GitHub Actions

APK به صورت خودکار در شرایط زیر ساخته می‌شود:

| Trigger | خروجی | کاربرد |
|---------|-------|--------|
| Push به main/develop | Debug APK | تست و توسعه |
| Tag با فرمت `v*` | Release APK | انتشار نهایی |
| Tag با فرمت `v*` | AAB | Google Play Store |

### ساخت محلی APK

```bash
# نصب وابستگی‌ها
npm install

# ساخت وب اپ
npm run build

# افزودن پلتفرم اندروید
npx cap add android

# Sync کردن Capacitor
npx cap sync android

# باز کردن در Android Studio
npx cap open android

# یا ساخت با خط فرمان
cd android && ./gradlew assembleDebug
```

APK در مسیر `android/app/build/outputs/apk/debug/app-debug.apk` قرار می‌گیرد.

📖 [راهنمای کامل ساخت APK](ANDROID.md)

---

## 📞 تماس

برای سوالات و پیشنهادات:

- Email: your.email@example.com
- GitHub Issues: [Report a bug](https://github.com/yourusername/fitforge/issues)

---

<div align="center">

**ساخته شده با ❤️ برای جامعه تناسب اندام**

⭐ اگر این پروژه را دوست داشتید، لطفاً یک Star بدهید!

</div>
