# FraudGuard AI — Dark Premium

تم تغيير صفحة Login وSign Up فقط مع الحفاظ على Dashboard وواجهة API.

- Sign In: Email + Password
- Sign Up: Full Name + Email + Password
- Reset Password: إرسال رابط استعادة عبر Supabase
- Google login: غير مضاف لأن Google OAuth لم يُفعل بعد
- الأرقام التسويقية الوهمية تمت إزالتها من صفحة الدخول

## استبدال المشروع الموجود عندك
افتح هذا المجلد في VS Code. انسخ ملف `.env` من مشروعك السابق إلى جذر هذا المجلد (لا ترسله لأي شخص). ثم:

```bash
npm install
npm run dev
```

البرنامج يستعمل Supabase كما كان في المشروع السابق، ولا يغير بيانات الحسابات الموجودة.
