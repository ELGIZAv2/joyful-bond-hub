## الفحص الثالث لقسم السلايدس — جولة QA متعمقة (نسخة نهائية)

سأقوم بفحص شامل (CEO/Frontend/Backend/Slides/UI/Design) + بناء طبقة اختبارات حقيقية باستخدام **6 أدوات open-source** مختلفة.

**قرارات مؤكَّدة من المستخدم:**
- ❌ لن أغيّر أي شيء في التصميم. الـ render الحالي = baseline مقدّس.
- ✅ أقصى ثقة ممكنة: fast-check بـ 5000 iteration لكل property.

---

### 🔍 ما سأفحصه (read-only)

1. **Visual reality check** — أفتح `/chat` في المتصفح، ألتقط screenshots لسلايدز موجودة، أفحص بصرياً:
   - هل الـ accent/ornament/density variants ظاهرة فعلاً بعد الإصلاحات السابقة؟
   - هل النصوص قابلة للقراءة (32-104px)؟
   - هل RTL يعمل على timeline/comparison/process؟
   - **لن أعدّل أي شيء بصرياً** — فقط أوثّق وأبني baselines

2. **Data-flow audit** — أتبع slide من الـ planner → expandDeep → post-processor → renderer وأتحقق أن الـ `layout` suffix يصل سليماً بصيغة `base--accent-align-density-ornament`.

3. **Edge function health** — أراجع logs الإنتاج لـ `chat-slides-stream` بحثاً عن أخطاء/timeouts.

4. **Bundle/perf check** — قياس فقط، بدون تعديل.

---

### 🧪 طبقة الاختبارات الجديدة (6 أدوات open-source)

| # | الأداة | الاستخدام | عدد الاختبارات |
|---|--------|----------|----------------|
| 1 | **vitest** (موجود) | unit للـ parseVariant + layout registry | ~8 إضافية |
| 2 | **@testing-library/react** (موجود) | rendering للـ SlideRender عبر 7 أنواع × LTR/RTL | ~14 |
| 3 | **fast-check** (جديد) | property-based — **5000 iteration/property** | ~6 properties = 30K runs |
| 4 | **@playwright/test** (موجود) | E2E navigation + export PPTX | ~5 |
| 5 | **@axe-core/playwright** (موجود) | a11y scan على slides modal | ~3 |
| 6 | **pixelmatch + pngjs** (جديد) | visual regression — يكشف أي تغيير ≥0.1% | ~8 baselines |

**Properties التي ستُفحص بـ fast-check (5000 run × كل واحدة):**
- كل layout id يحلّ لـ base موجود في BASE_LAYOUTS
- parseVariant لا يرمي exception على أي input عشوائي
- density المُولّد دائماً ∈ {airy, balanced, dense}
- accent المُولّد دائماً ∈ القاموس الـ 16
- SlideRender لا يرمي على أي تركيبة slide data عشوائية
- post-processor يحافظ على عدد السلايدز (لا يفقد ولا يضيف)

---

### 🎯 Visual Regression — تفصيل
- ألتقط baseline لـ 8 سلايدز ثابتة (fixtures) تغطّي: cover, split-right, big-number, comparison, timeline, process, gallery, quote
- أحفظها في `e2e/__visual__/slides-baseline/`
- كل run لاحق يقارنها بـ pixelmatch؛ threshold = **0.1%** (حساس جداً)
- أي اختلاف بكسل → الاختبار يفشل ويُخرج diff image
- **هذا يضمن أن أي تعديل لاحق على التصميم يُكشف فوراً**

---

### 📋 خطوات التنفيذ

```text
1. Visual audit (browser screenshots + إثبات الحالة الحالية)

2. Backend audit (logs + curl test)

3. تثبيت أدوات جديدة
   └─ bun add -d fast-check pixelmatch pngjs @types/pngjs

4. كتابة الاختبارات
   ├─ src/test/slides/parseVariant.test.ts
   ├─ src/test/slides/slideRender.test.tsx (7 layouts × LTR/RTL)
   ├─ src/test/slides/slides.property.test.ts (fast-check, numRuns: 5000)
   ├─ e2e/slides-deck.spec.ts (Playwright)
   ├─ e2e/slides-a11y.spec.ts (axe على modal)
   └─ e2e/slides-visual.spec.ts (pixelmatch threshold 0.1%)

5. توليد 8 baseline screenshots (snapshot من التصميم الحالي بالضبط)

6. تشغيل كل الطبقات + تقرير نهائي
```

---

### ⏱️ المتوقع
- **زمن التنفيذ**: ~8-12 دقيقة (fast-check 5000×6 ثقيل لكنه قابل للتشغيل)
- **اختبارات جديدة**: ~38 ملف اختبار، ~30,000 property run
- **التصميم**: لن يتغيّر بأي شكل
- **الناتج**: drift detector كامل — لو غيّر أي أحد بكسل، الـ CI يصرخ

اضغط Implement plan للبدء.