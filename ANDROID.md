# FitForge Android - راهنمای ساخت APK

این مستندات نحوه ساخت فایل APK و AAB برای اپلیکیشن FitForge را توضیح می‌دهد.

---

## 📱 روش‌های ساخت APK

### 1. ساخت خودکار با GitHub Actions (توصیه شده)

GitHub Actions به صورت خودکار APK را در شرایط زیر می‌سازد:

#### الف) Debug APK
- **Trigger**: هر push به شاخه‌های `main` و `develop`
- **خروجی**: `fitforge-debug.apk`
- **کاربرد**: تست و توسعه

#### ب) Release APK
- **Trigger**: ایجاد tag با فرمت `v*` (مثلاً `v1.0.0`)
- **خروجی**: `fitforge-release.apk` (امضا شده یا بدون امضا)
- **کاربرد**: انتشار نهایی

#### ج) Android App Bundle (AAB)
- **Trigger**: ایجاد tag با فرمت `v*`
- **خروجی**: `fitforge.aab`
- **کاربرد**: آپلود در Google Play Store

---

## 🔧 ساخت محلی APK

### پیش‌نیازها

1. **Node.js 18+**
   ```bash
   node --version
   ```

2. **Android Studio** یا **Android SDK**
   - نصب Android Studio از [android.com](https://developer.android.com/studio)
   - یا نصب Android SDK command line tools

3. **Java JDK 17**
   ```bash
   java -version
   ```

4. **Capacitor CLI**
   ```bash
   npm install -g @capacitor/cli
   ```

### مراحل ساخت

#### مرحله 1: نصب وابستگی‌ها
```bash
npm install
```

#### مرحله 2: ساخت وب اپ
```bash
npm run build
```

#### مرحله 3: افزودن پلتفرم اندروید
```bash
npx cap add android
```

#### مرحله 4: Sync کردن Capacitor
```bash
npx cap sync android
```

#### مرحله 5: باز کردن در Android Studio
```bash
npx cap open android
```

#### مرحله 6: ساخت APK در Android Studio
1. در Android Studio، منوی `Build` را باز کنید
2. گزینه `Build Bundle(s) / APK(s)` را انتخاب کنید
3. گزینه `Build APK(s)` را انتخاب کنید
4. APK در مسیر `android/app/build/outputs/apk/debug/` ساخته می‌شود

### ساخت APK با خط فرمان

```bash
cd android
./gradlew assembleDebug
```

APK در مسیر زیر قرار می‌گیرد:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🔐 ساخت Release APK امضا شده

### مرحله 1: ایجاد Keystore

```bash
keytool -genkey -v -keystore release-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias fitforge
```

پاسخ به سوالات:
- Enter keystore password: [رمز عبور قوی]
- Re-enter new password: [تکرار رمز عبور]
- What is your first and last name: [نام شما]
- What is the name of your organizational unit: [واحد سازمانی]
- What is the name of your organization: [نام سازمان]
- What is the name of your City or Locality: [شهر]
- What is the name of your State or Province: [استان]
- What is the two-letter country code: [کد کشور - IR]

### مرحله 2: کپی Keystore به پروژه

```bash
cp release-keystore.jks android/app/
```

### مرحله 3: ایجاد فایل keystore.properties

فایل `android/keystore.properties` را ایجاد کنید:

```properties
storePassword=YOUR_KEYSTORE_PASSWORD
keyPassword=YOUR_KEY_PASSWORD
keyAlias=fitforge
storeFile=app/release-keystore.jks
```

⚠️ **مهم**: این فایل را به `.gitignore` اضافه کنید!

### مرحله 4: پیکربندی build.gradle

فایل `android/app/build.gradle` را ویرایش کنید:

```gradle
android {
    // ... سایر تنظیمات
    
    signingConfigs {
        release {
            def keystorePropertiesFile = rootProject.file("keystore.properties")
            def keystoreProperties = new Properties()
            keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
            
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### مرحله 5: ساخت Release APK

```bash
cd android
./gradlew assembleRelease
```

APK امضا شده در مسیر زیر قرار می‌گیرد:
```
android/app/build/outputs/apk/release/app-release.apk
```

---

## 📦 ساخت Android App Bundle (AAB)

AAB فرمت مورد نیاز برای Google Play Store است.

### ساخت AAB

```bash
cd android
./gradlew bundleRelease
```

AAB در مسیر زیر قرار می‌گیرد:
```
android/app/build/outputs/bundle/release/app-release.aab
```

---

## 🚀 استفاده از GitHub Actions

### تنظیم Secrets برای ساخت امضا شده

برای ساخت APK امضا شده در GitHub Actions، باید secrets زیر را تنظیم کنید:

1. به repository خود در GitHub بروید
2. به `Settings` > `Secrets and variables` > `Actions` بروید
3. Secrets زیر را اضافه کنید:

#### KEYSTORE_BASE64
```bash
# تبدیل keystore به base64
base64 release-keystore.jks > keystore-base64.txt
# محتوای فایل را کپی کنید
```

#### KEYSTORE_PASSWORD
رمز عبور keystore

#### KEY_ALIAS
Alias استفاده شده در keystore (مثلاً `fitforge`)

#### KEY_PASSWORD
رمز عبور key (معمولاً همان KEYSTORE_PASSWORD)

### ساخت خودکار با Tag

```bash
# ایجاد tag
git tag v1.0.0

# push tag
git push origin v1.0.0
```

GitHub Actions به صورت خودکار:
1. وب اپ را build می‌کند
2. Capacitor را sync می‌کند
3. APK امضا شده را می‌سازد
4. Release در GitHub ایجاد می‌کند
5. APK را به release اضافه می‌کند

---

## 📊 Workflow های موجود

### 1. build-apk.yml
- **Trigger**: Push به main/develop، PR، manual
- **خروجی**: Debug APK
- **کاربرد**: تست و توسعه

### 2. build-signed-apk.yml
- **Trigger**: Tag push، manual
- **خروجی**: Release APK امضا شده
- **کاربرد**: انتشار نهایی

### 3. build-aab.yml
- **Trigger**: Tag push، manual
- **خروجی**: Android App Bundle
- **کاربرد**: Google Play Store

---

## 🎨 سفارشی‌سازی اپلیکیشن

### تغییر آیکون

1. آیکون‌های مختلف را در مسیرهای زیر قرار دهید:
   ```
   android/app/src/main/res/
   ├── mipmap-hdpi/ic_launcher.png (72x72)
   ├── mipmap-mdpi/ic_launcher.png (48x48)
   ├── mipmap-xhdpi/ic_launcher.png (96x96)
   ├── mipmap-xxhdpi/ic_launcher.png (144x144)
   └── mipmap-xxxhdpi/ic_launcher.png (192x192)
   ```

2. یا از ابزار آنلاین استفاده کنید:
   - [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/)

### تغییر Splash Screen

1. تصویر splash را در مسیر زیر قرار دهید:
   ```
   android/app/src/main/res/drawable/splash.png
   ```

2. رنگ پس‌زمینه را در `capacitor.config.ts` تنظیم کنید:
   ```typescript
   plugins: {
     SplashScreen: {
       backgroundColor: '#0f172a',
     }
   }
   ```

### تغییر نام اپلیکیشن

فایل `android/app/src/main/res/values/strings.xml` را ویرایش کنید:

```xml
<resources>
    <string name="app_name">FitForge</string>
</resources>
```

### تغییر Package Name

1. فایل `capacitor.config.ts` را ویرایش کنید:
   ```typescript
   appId: 'com.yourcompany.fitforge',
   ```

2. ساختار پوشه‌ها را تغییر دهید:
   ```
   android/app/src/main/java/com/yourcompany/fitforge/
   ```

3. فایل `android/app/src/main/AndroidManifest.xml` را ویرایش کنید:
   ```xml
   <manifest package="com.yourcompany.fitforge">
   ```

---

## 🧪 تست APK

### نصب روی دستگاه

```bash
adb install app-debug.apk
```

### نصب روی emulator

1. Android Studio را باز کنید
2. یک emulator ایجاد کنید
3. APK را روی emulator بکشید و رها کنید

### تست با Firebase Test Lab

```bash
gcloud firebase test android run \
  --type robo \
  --app app-debug.apk \
  --device model=Pixel2,version=28,locale=en,orientation=portrait
```

---

## 📤 انتشار

### Google Play Store

1. AAB را بسازید:
   ```bash
   ./gradlew bundleRelease
   ```

2. به [Google Play Console](https://play.google.com/console) بروید

3. اپلیکیشن جدید ایجاد کنید

4. AAB را آپلود کنید

5. اطلاعات اپلیکیشن را تکمیل کنید:
   - توضیحات
   - اسکرین‌شات‌ها
   - آیکون
   - دسته‌بندی
   - رده‌بندی سنی

6. Review و Publish

### آپلود خودکار با GitHub Actions

برای آپلود خودکار به Google Play:

1. Service Account JSON ایجاد کنید
2. Secret `PLAY_STORE_SERVICE_ACCOUNT_JSON` را تنظیم کنید
3. Workflow `build-aab.yml` به صورت خودکار آپلود می‌کند

---

## 🐛 عیب‌یابی

### خطای "SDK location not found"

فایل `android/local.properties` را ایجاد کنید:

```properties
sdk.dir=/path/to/android/sdk
```

### خطای "Keystore not found"

مطمئن شوید که:
- فایل keystore در مسیر صحیح قرار دارد
- مسیر در `keystore.properties` صحیح است
- فایل `keystore.properties` وجود دارد

### خطای "Gradle build failed"

```bash
cd android
./gradlew clean
./gradlew assembleDebug --stacktrace
```

### APK خیلی بزرگ است

1. Minification را فعال کنید:
   ```gradle
   buildTypes {
       release {
           minifyEnabled true
           shrinkResources true
       }
   }
   ```

2. ProGuard rules را بهینه کنید

---

## 📚 منابع مفید

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Developer Guide](https://developer.android.com/guide)
- [Gradle Build Tool](https://docs.gradle.org/)
- [Google Play Console](https://play.google.com/console)

---

## 🆘 پشتیبانی

برای مشکلات و سوالات:
- [GitHub Issues](https://github.com/yourusername/fitforge/issues)
- [GitHub Discussions](https://github.com/yourusername/fitforge/discussions)

---

<div align="center">

**ساخته شده با ❤️ برای جامعه تناسب اندام**

</div>
