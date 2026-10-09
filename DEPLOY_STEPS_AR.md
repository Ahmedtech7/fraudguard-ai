# FraudGuard AI — تشغيل ونشر على Vercel

## التشغيل على الماك
1. فك الضغط وافتح مجلد `FraudGuard_Vercel_Ready` في VS Code.
2. أنشئ `.env` بنسخ `.env.example`، وضع `sb_publishable_...` مكان `PASTE_YOUR_PUBLISHABLE_KEY_HERE` في كلا المتغيرين. لا تستخدم أي Secret/Service Role key.
3. شغل `npm install` ثم `npm run dev`. افتح http://localhost:5173.
4. في Supabase > Authentication > Providers تأكد أن Email مفعّل. داخل URL Configuration ضع `http://localhost:5173` في Redirect URLs، ولاحقًا رابط Vercel.
5. جرّب إنشاء حساب ثم تسجيل الدخول. قد يطلب منك تأكيد البريد الإلكتروني.

## النشر على Vercel
1. ارفع المجلد إلى مستودع GitHub جديد. تأكد أن `.env` ليس ضمن الملفات المرفوعة.
2. افتح vercel.com > Add New Project، اختر المستودع. Framework: Vite. Build: `npm run build`. Output Directory: `dist`.
3. أضف Environment Variables الأربعة: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`. الرابط والمفتاح العام فقط.
4. اضغط Deploy.
5. داخل Supabase > Authentication > URL Configuration ضع رابط Vercel في Site URL وRedirect URLs ثم أعد اختبار التسجيل والدخول والتنبؤ.

## ملاحظات
- صفحات الواجهة محمية بالجلسة، وكذلك API endpoints (`/api/predict`, `/api/batch`, `/api/demo`, `/api/model`) تتحقق من Supabase access token على السيرفر.
- للتجربة فقط، استخدم معاملات وهمية، وليس بيانات مالية حقيقية.
- لا توجد قاعدة بيانات منفصلة للمعاملات؛ Supabase Auth يدير حسابات المستخدمين.
- النموذج الحالي Logistic Regression مدرب على بيانات اصطناعية وليس متحققًا من استخدامه في بنوك حقيقية.
- Vercel Serverless Functions تتلقى ملف `server/model.json` ضمن حزمة الـFunction.
