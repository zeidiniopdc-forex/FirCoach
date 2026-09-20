# راهنمای مشارکت در FitForge

از علاقه شما به مشارکت در FitForge متشکریم! این سند شما را در فرآیند مشارکت راهنمایی می‌کند.

## 📋 فهرست مطالب

- [کد رفتار](#کد-رفتار)
- [چگونه می‌توانم مشارکت کنم؟](#چگونه-میتوانم-مشارکت-کنم)
- [گزارش باگ](#گزارش-باگ)
- [پیشنهاد ویژگی](#پیشنهاد-ویژگی)
- [Pull Request](#pull-request)
- [راهنمای کدنویسی](#راهنمای-کدنویسی)
- [ساختار پروژه](#ساختار-پروژه)

---

## 🤝 کد رفتار

این پروژه و شرکت‌کنندگان آن توسط [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/) اداره می‌شوند. با مشارکت در این پروژه، شما موافقت می‌کنید که این قوانین را رعایت کنید.

لطفاً با همه مشارکت‌کنندگان با احترام رفتار کنید.

---

## 🎯 چگونه می‌توانم مشارکت کنم؟

### راه‌های مشارکت

1. **گزارش باگ** - اگر باگی پیدا کردید، آن را گزارش دهید
2. **پیشنهاد ویژگی** - ایده‌های جدید برای بهبود پروژه
3. **ارسال Pull Request** - کد بنویسید و ارسال کنید
4. **بهبود مستندات** - کمک به بهبود README و سایر مستندات
5. **تست و بازخورد** - تست اپلیکیشن و ارائه بازخورد
6. **ترجمه** - کمک به ترجمه به زبان‌های دیگر

---

## 🐛 گزارش باگ

اگر باگی پیدا کردید، لطفاً یک Issue باز کنید و اطلاعات زیر را ارائه دهید:

### قالب گزارش باگ

```markdown
**توضیح باگ**
توضیح واضح و مختصری از باگ

**مراحل بازتولید**
1. برو به '...'
2. کلیک کن روی '...'
3. اسکرول کن تا '...'
4. خطا را ببین

**رفتار مورد انتظار**
توضیح واضحی از آنچه انتظار داشتید اتفاق بیفتد

**رفتار واقعی**
توضیح واضحی از آنچه واقعاً اتفاق افتاد

**اسکرین‌شات‌ها**
در صورت امکان، اسکرین‌شات اضافه کنید

**محیط:**
- OS: [مثلاً macOS, Windows]
- Browser: [مثلاً Chrome, Safari]
- Version: [مثلاً 22]

**اطلاعات اضافی**
هر اطلاعات دیگری که فکر می‌کنید مفید باشد
```

---

## 💡 پیشنهاد ویژگی

اگر ایده‌ای برای ویژگی جدید دارید:

1. ابتدا Issues را بررسی کنید تا مطمئن شوید ایده شما قبلاً پیشنهاد نشده باشد
2. یک Issue جدید با برچسب `enhancement` باز کنید
3. ویژگی را به وضوح توضیح دهید
4. موارد استفاده و مزایا را شرح دهید

### قالب پیشنهاد ویژگی

```markdown
**ویژگی مورد نظر**
توضیح واضح و مختصر از ویژگی

**مشکل مرتبط**
آیا ویژگی شما مربوط به یک مشکل است؟ توضیح دهید

**راه حل پیشنهادی**
توضیح دهید که می‌خواهید چه اتفاقی بیفتد

**گزینه‌های جایگزین**
آیا ویژگی‌های مشابه یا راه حل‌های جایگزین را در نظر گرفته‌اید؟

**موارد استفاده**
چند مورد استفاده واقعی از این ویژگی

**اطلاعات اضافی**
هر اطلاعات دیگری یا اسکرین‌شات‌ها
```

---

## 🔀 Pull Request

### مراحل ارسال Pull Request

1. **Fork کنید**
   ```bash
   git clone https://github.com/YOUR-USERNAME/fitforge.git
   cd fitforge
   ```

2. **Branch جدید ایجاد کنید**
   ```bash
   git checkout -b feature/AmazingFeature
   # یا
   git checkout -b fix/bug-fix-description
   ```

3. **تغییرات را Commit کنید**
   ```bash
   git add .
   git commit -m "Add: Amazing feature description"
   ```

4. **Push کنید**
   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Pull Request باز کنید**
   - به repository اصلی بروید
   - روی "New Pull Request" کلیک کنید
   - Branch خود را انتخاب کنید
   - PR را ارسال کنید

### قالب Pull Request

```markdown
## توضیحات
توضیح مختصری از تغییرات

## نوع تغییر
- [ ] Bug fix (تغییری که یک مشکل را رفع می‌کند)
- [ ] New feature (تغییری که عملکرد جدیدی اضافه می‌کند)
- [ ] Breaking change (تغییری که باعث می‌شود عملکرد موجود تغییر کند)
- [ ] Documentation update (به‌روزرسانی مستندات)

## تست شده
- [ ] کد به درستی کامپایل می‌شود
- [ ] تست‌ها پاس می‌شوند
- [ ] تغییرات به صورت دستی تست شده‌اند

## اسکرین‌شات‌ها
در صورت تغییرات UI، اسکرین‌شات اضافه کنید

## Checklist
- [ ] کد من از style guide پروژه پیروی می‌کند
- [ ] کد من را کامنت‌گذاری کرده‌ام
- [ ] تغییرات من مستندات مربوطه را به‌روزرسانی کرده‌اند
- [ ] تغییرات من هیچ warning جدیدی ایجاد نمی‌کنند
- [ ] من تست‌هایی اضافه کرده‌ام که اثبات می‌کند fix من کار می‌کند یا ویژگی من کار می‌کند
- [ ] تمام تست‌های واحد موجود پاس می‌شوند
```

### قوانین نام‌گذاری Branch

- `feature/` - برای ویژگی‌های جدید
  - مثال: `feature/add-dark-mode`
- `fix/` - برای رفع باگ‌ها
  - مثال: `fix/login-error`
- `docs/` - برای تغییرات مستندات
  - مثال: `docs/update-readme`
- `refactor/` - برای بازسازی کد
  - مثال: `refactor/improve-performance`
- `test/` - برای اضافه کردن تست‌ها
  - مثال: `test/add-unit-tests`

### قوانین Commit Message

از [Conventional Commits](https://www.conventionalcommits.org/) پیروی کنید:

```
<type>(<scope>): <subject>

<body>

<footer>
```

انواع:
- `feat`: ویژگی جدید
- `fix`: رفع باگ
- `docs`: تغییرات مستندات
- `style`: تغییرات فرمت (بدون تغییر کد)
- `refactor`: بازسازی کد
- `test`: اضافه کردن تست‌ها
- `chore`: تغییرات build یا ابزارها

مثال‌ها:
```
feat(workout): add rest timer with pause/resume

- Added countdown timer
- Implemented pause/resume functionality
- Added skip button

Closes #123
```

```
fix(dashboard): correct streak calculation

Fixed bug where streak was not counting consecutive days properly

Fixes #456
```

---

## 💻 راهنمای کدنویسی

### TypeScript

- از TypeScript strict mode استفاده کنید
- تایپ‌های صریح را ترجیح دهید
- از `any` تا حد امکان اجتناب کنید
- interface ها را برای ساختارهای داده استفاده کنید

```typescript
// ✅ خوب
interface UserProfile {
  name: string;
  age: number;
  email: string;
}

// ❌ بد
const user = {
  name: 'John',
  age: 25,
  email: 'john@example.com'
}
```

### React Components

- کامپوننت‌ها را کوچک و متمرکز نگه دارید
- از React Hooks استفاده کنید
- از prop drilling اجتناب کنید
- از Context API برای state سراسری استفاده کنید

```typescript
// ✅ خوب
const UserProfile: React.FC<UserProfileProps> = ({ name, age }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>{age} years old</p>
    </div>
  );
};

// ❌ بد
function UserProfile(props: any) {
  return <div>{props.name} - {props.age}</div>;
}
```

### Styling

- از Tailwind CSS استفاده کنید
- از کلاس‌های سفارشی تا حد امکان اجتناب کنید
- از responsive design استفاده کنید
- از dark mode پشتیبانی کنید

```typescript
// ✅ خوب
<button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
  Click me
</button>

// ❌ بد
<button style={{ padding: '16px', backgroundColor: '#4f46e5' }}>
  Click me
</button>
```

### State Management

- از Context API برای state سراسری استفاده کنید
- state محلی را با useState مدیریت کنید
- از useReducer برای state پیچیده استفاده کنید

```typescript
// ✅ خوب
const [state, dispatch] = useReducer(reducer, initialState);

// ❌ بد
let globalState = {};
```

### Error Handling

- خطاها را به درستی مدیریت کنید
- پیام‌های خطای کاربرپسند نمایش دهید
- از try-catch استفاده کنید

```typescript
// ✅ خوب
try {
  const data = await fetchData();
  return data;
} catch (error) {
  console.error('Failed to fetch data:', error);
  throw new Error('Unable to load data. Please try again.');
}

// ❌ بد
const data = await fetchData();
```

### Performance

- از React.memo برای کامپوننت‌های گران‌قیمت استفاده کنید
- از useMemo و useCallback به درستی استفاده کنید
- از lazy loading استفاده کنید
- تصاویر را بهینه کنید

```typescript
// ✅ خوب
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* expensive rendering */}</div>;
});

// ❌ بد
const ExpensiveComponent = ({ data }) => {
  return <div>{/* expensive rendering */}</div>;
};
```

---

## 📁 ساختار پروژه

```
src/
├── components/          # کامپوننت‌های قابل استفاده مجدد
├── pages/              # صفحات اپلیکیشن
├── contexts/           # Context providers
├── hooks/              # Custom hooks
├── utils/              # توابع کمکی
├── types/              # TypeScript types
├── data/               # داده‌های استاتیک
└── styles/             # استایل‌های سراسری
```

### افزودن کامپوننت جدید

1. کامپوننت را در `src/components/` ایجاد کنید
2. از TypeScript استفاده کنید
3. Props را تایپ کنید
4. کامپوننت را export کنید

```typescript
// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary' 
}) => {
  return (
    <button 
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
};
```

### افزودن صفحه جدید

1. صفحه را در `src/pages/` ایجاد کنید
2. Route را در `App.tsx` اضافه کنید
3. لینک را در Navigation اضافه کنید

```typescript
// src/pages/NewPage.tsx
import React from 'react';

export const NewPage: React.FC = () => {
  return (
    <div>
      <h1>New Page</h1>
    </div>
  );
};
```

---

## 🧪 تست

### اجرای تست‌ها

```bash
# اجرای تمام تست‌ها
npm test

# اجرای تست‌ها با watch mode
npm run test:watch

# بررسی coverage
npm run test:coverage
```

### نوشتن تست

- برای هر ویژگی جدید تست بنویسید
- تست‌ها باید مستقل باشند
- از mock data استفاده کنید

```typescript
// src/utils/__tests__/calculations.test.ts
import { calculateVolume } from '../calculations';

describe('calculateVolume', () => {
  it('should calculate total volume correctly', () => {
    const sets = [
      { weight: 100, reps: 10, completed: true },
      { weight: 100, reps: 8, completed: true },
    ];
    
    const result = calculateVolume(sets);
    expect(result).toBe(1800);
  });
});
```

---

## 📚 منابع مفید

- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## ❓ سوالات

اگر سوالی دارید، می‌توانید:

- یک Issue باز کنید
- به Maintainer ها ایمیل بزنید
- در Discussions شرکت کنید

---

## 🙏 قدردانی

از تمام مشارکت‌کنندگان متشکریم! ❤️

---

<div align="center">

**با تشکر از مشارکت شما!**

⭐ اگر این پروژه را دوست داشتید، لطفاً یک Star بدهید!

</div>
