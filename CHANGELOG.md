# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Pending features for next release

## [1.0.0] - 2024-01-XX

### Added
- **Onboarding Flow**
  - Professional onboarding screens
  - Step-by-step introduction to app features
  - Skip option for returning users

- **User Profile Management**
  - Basic information (name, age, sex, height, weight)
  - Body measurements (waist, chest, hips, neck, arm, thigh)
  - Training goals with priority system
  - Training history and experience level
  - Limitations and injuries tracking
  - Available equipment selection
  - Training schedule configuration
  - Training preferences (volume, intensity, sets, reps, rest)
  - Optional nutrition information

- **AI Prompt Generator**
  - Professional prompt generation based on user profile
  - Compatible with all AI models (ChatGPT, Claude, Gemini, etc.)
  - Copy and share functionality
  - Prompt history tracking
  - Regenerate option

- **Program Import System**
  - Paste JSON method
  - Upload JSON file method
  - Sample program loader
  - Comprehensive JSON validation
  - Detailed error reporting with location and suggested fixes
  - Warning system for non-critical issues

- **Workout Tracker**
  - Today's workout display
  - Exercise list with details
  - Set-by-set tracking (weight, reps, RIR/RPE)
  - Rest timer with pause/resume/skip
  - Exercise completion tracking
  - Workout summary
  - Session duration tracking

- **Progress Analytics**
  - Training volume charts
  - Workout frequency analysis
  - Muscle volume breakdown
  - Personal records (PRs) tracking
  - Estimated 1RM calculation
  - Streak tracking
  - Time range filters (7D, 30D, 90D, 6M, 1Y)

- **History & Calendar**
  - Workout history list
  - Calendar view
  - Session details view
  - Date-based navigation

- **Exercise Library**
  - 29+ pre-defined exercises
  - Search functionality
  - Filter by muscle, equipment, difficulty
  - Exercise details view
  - Custom exercise creation

- **Program Management**
  - Multiple programs support
  - Active program selection
  - Export to JSON
  - Duplicate programs
  - Delete programs

- **Settings**
  - Dark/Light theme
  - Language support (English, Persian)
  - RTL support for Persian
  - Weight unit selection (kg/lb)
  - Notification preferences
  - Backup and restore functionality

- **Dashboard**
  - Greeting based on time of day
  - Today's workout card
  - Stats overview (streak, weekly workouts, volume, total workouts)
  - Program progress ring
  - Recent workouts list
  - Empty states with CTAs

- **UI/UX Features**
  - Modern, professional design
  - Smooth animations with Framer Motion
  - Responsive layout
  - Bottom navigation
  - Quick action FABs
  - Gradient cards
  - Progress indicators
  - Loading states
  - Error handling
  - Empty states

- **Technical Features**
  - TypeScript for type safety
  - React Context for state management
  - LocalStorage for data persistence
  - JSON Schema validation
  - Modular architecture
  - Reusable components
  - Custom hooks
  - Utility functions

### Technical Details

#### Dependencies
- React 18.2.0
- TypeScript 5.7.0
- Tailwind CSS 4.1.7
- Vite 6.3.5
- Framer Motion 11.16.1
- Recharts 2.10.0
- Lucide React 0.294.0
- React Router DOM 6.8.0
- date-fns 2.30.0
- uuid 9.0.1

#### Build Tools
- Vite for fast development and building
- TypeScript for type checking
- ESLint for code quality
- Prettier for code formatting

#### CI/CD
- GitHub Actions for CI/CD
- Automated testing
- Build verification
- Deployment to GitHub Pages
- CodeQL security analysis
- Dependency review
- Lighthouse performance testing
- Automated releases

### Security
- Local-first data storage
- No data sent to external servers
- User privacy protection
- Secure data handling

### Performance
- Optimized bundle size
- Lazy loading where appropriate
- Efficient state management
- Minimal re-renders
- Fast page transitions

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Version History

### Versioning Scheme

This project uses [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for backwards-compatible functionality additions
- **PATCH** version for backwards-compatible bug fixes

### Release Process

1. Development happens on `develop` branch
2. Features are merged to `develop` via PRs
3. When ready for release, `develop` is merged to `main`
4. A new tag is created (e.g., `v1.1.0`)
5. GitHub Actions automatically:
   - Builds the project
   - Runs tests
   - Creates a release
   - Deploys to GitHub Pages

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with ❤️ by the FitForge Team**

[Report Bug](https://github.com/yourusername/fitforge/issues) · [Request Feature](https://github.com/yourusername/fitforge/issues)

</div>
