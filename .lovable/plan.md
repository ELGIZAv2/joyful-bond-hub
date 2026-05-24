## الهدف
نظام نماذج fal جديد ومستقل (جداول جديدة بادئة `fal_`) يضم أحدث 30 نموذج صور و30 نموذج فيديو على fal.ai كما هي مدرجة في 24 مايو 2026، مع توحيد ذكي للنماذج متعددة الـ endpoints، تسعير عادل بهامش ربح ≥60% على أساس **MC = 0.10$**، ودعم كامل للوضعيات (الجودة، الأبعاد، المدة بالثواني)، مع إعادة تاب اختيار النماذج في الاستوديو و MediaHub.

---

## 1) قاعدة التسعير

- **1 MC = 0.10 دولار** (سعر المستخدم النهائي)
- **هامش الربح ≥ 60%**
- المعادلة:
  ```
  credits_per_unit = ceil( (fal_unit_cost_usd × 1.60) / 0.10 )
                   = ceil( fal_unit_cost_usd × 16 )
  min_credits      = 1
  ```
- **الصور**: السعر مرة واحدة لكل صورة (`per_image` أو `per_megapixel`).
- **الفيديو**: تقريباً جميع نماذج fal تُحاسَب **بالثانية**. لذا الحقل الأساسي هو `cost_per_second_usd`، وتكلفة الفيديو = `cost_per_second × duration`. بعض النماذج (مثل Ovi) تُحاسَب لكل فيديو — يُدعم ذلك بحقل `unit = 'video' | 'second' | 'megapixel' | 'image'`.

---

## 2) جداول جديدة (لا تمس الجداول القديمة)

### `public.fal_image_models`
- `slug` فريد (مثل `nano-banana-pro`)
- `display_name`, `provider`, `description`
- **Endpoints (nullable):**
  - `endpoint_text_to_image`
  - `endpoint_image_to_image`
  - `endpoint_multi_reference`
- `fal_unit_cost_usd` numeric
- `unit` text (`image` | `megapixel`)
- `credits` integer (السعر النهائي بعد الهامش)
- `supports_multi_image` boolean, `max_input_images` int
- `supported_aspects` jsonb (مثل `["1:1","3:2","2:3","4:3","16:9","9:16"]`)
- `supported_resolutions` jsonb (`["1K","2K","4K"]` أو `["1024","2048"]`)
- `default_aspect`, `default_resolution`
- `is_premium`, `is_new`, `is_featured`, `sort_order`
- `thumbnail_url`

### `public.fal_video_models`
- نفس الفكرة، مع:
  - `endpoint_text_to_video`, `endpoint_image_to_video`, `endpoint_reference_to_video`, `endpoint_start_end_frame`
  - `unit` text (`second` | `video`)
  - `cost_per_second_usd` numeric (أو `cost_per_video_usd`)
  - `credits_per_second` integer (محسوب: `ceil(cost_per_second × 16)`)
  - `supported_durations` jsonb (مثل `[5, 8, 10]`)
  - `supported_resolutions` jsonb (`["480p","720p","1080p"]`)
  - `supports_start_end_frame` boolean
  - `supports_multi_image` boolean, `max_input_images` int
  - `supports_audio` boolean (لـ Seedance 2.0 / Veo 3.1 / Ovi)

### RLS
- قراءة عامة للمستخدمين المسجّلين (`authenticated SELECT`)
- التعديل عبر `service_role` فقط

---

## 3) النماذج المُختارة (مايو 2026)

### 30 نموذج صور (موحّدة)
1. **nano-banana-pro** (Google, t2i + edit + multi)
2. **nano-banana-2** (Google, t2i + edit)
3. **gpt-image-2** (OpenAI, t2i + edit)
4. **gpt-image-1.5** (OpenAI, t2i)
5. **flux-2-pro** (BFL, t2i + edit + outpaint)
6. **flux-2** (BFL dev, t2i)
7. **flux-2/klein/9b** (BFL klein, t2i)
8. **flux-pro/v1.1-ultra** (BFL, t2i)
9. **flux-pro/v1.1** (BFL, t2i)
10. **flux-pro/kontext** (BFL, edit)
11. **flux/dev** (BFL, t2i)
12. **flux/schnell** (BFL, t2i)
13. **flux-lora** (BFL, t2i with LoRA)
14. **bytedance/seedream/v5/lite/text-to-image** + **/edit** (موحّد)
15. **bytedance/seedream/v4.5/text-to-image** + **/edit** (موحّد)
16. **bytedance/seedream/v4/text-to-image** + **/edit** (موحّد)
17. **ideogram/v3** (typography/logos)
18. **recraft/v4.1/pro/text-to-image** (2048 hi-res)
19. **recraft/v4.1/text-to-image**
20. **recraft/v4.1/text-to-vector** (SVG)
21. **xai/grok-imagine-image** + **/edit** (موحّد)
22. **z-image/turbo** (سريع)
23. **qwen-image** (Alibaba)
24. **imagineart/imagineart-2.0-edit-preview/image-to-image**
25. **reve/edit**
26. **bria/fibo-edit/edit** (enterprise-safe)
27. **nano-banana** + **/edit** الأصلي (موحّد)
28. **fast-sdxl**
29. **flux-pro/v1/erase** (object removal)
30. **seedvr/upscale/image** (upscaler 4×)

### 30 نموذج فيديو (موحّدة)
1. **bytedance/seedance-2.0** (text-to-video + image-to-video + reference-to-video + start/end frame) — موحّد بكل الأوضاع
2. **bytedance/seedance-2.0/fast** (نفس الأوضاع، tier أسرع/أرخص) — موحّد
3. **kling-video/v3/pro/image-to-video** + **text-to-video**
4. **kling-video/v2.5-turbo/pro/image-to-video**
5. **veo3.1/fast/reference-to-video** + **text-to-video** + **image-to-video**
6. **veo3** (text-to-video + image-to-video)
7. **pixverse/v6/image-to-video** + **text-to-video**
8. **wan-25-preview/text-to-video** + **image-to-video**
9. **wan-2.2** (i2v)
10. **minimax/hailuo-02-pro** (t2v + i2v + start/end)
11. **minimax/hailuo-02** (t2v + i2v)
12. **runway/gen-4** (i2v + multi-ref)
13. **runway/gen-4-turbo** (i2v)
14. **luma/ray-2** (t2v + i2v + start/end)
15. **luma/ray-2-flash** (t2v + i2v)
16. **pika/v2.2** (t2v + i2v + start/end)
17. **ltx-video-13b** (t2v + i2v)
18. **framepack** (i2v + start/end)
19. **cogvideo-x**
20. **mochi-1**
21. **tencent/hunyuan-video**
22. **open-sora-2**
23. **step-video-2**
24. **vidu/q1** (i2v + start/end + multi-reference)
25. **haiper/v2.5**
26. **magi-1**
27. **dreamina/v3.1**
28. **alibaba/happy-horse/video-edit** (video-to-video)
29. **ovi** (i2v with audio — per-video billing)
30. **heygen/avatar5/digital-twin** (talking avatar)

> القائمة النهائية تُؤكَّد لحظة الـ seed عبر جلب `/api/openapi/queue/openapi.json?endpoint_id=...` لكل نموذج للتأكد من السعر الفعلي من fal.

---

## 4) Edge Functions

### `fal-models-catalog` (GET)
يُعيد JSON موحّد للنماذج (image + video) للاستخدام في الواجهة.

### `fal-generate-image` و `fal-generate-video` (POST)
- استقبال `model_slug` + `prompt` + `images[]` + `start_frame?` + `end_frame?` + `aspect` + `resolution` + `duration?`
- توجيه ذكي حسب المدخلات:
  - فيديو: `start_frame && end_frame && supports_start_end_frame` ⇒ `endpoint_start_end_frame`
  - `images.length > 1 && supports_multi_image` ⇒ multi/reference
  - `images.length === 1` ⇒ i2v / i2i
  - `images.length === 0` ⇒ t2v / t2i
- التحقّق من قيود النموذج (`max_input_images`, `supported_durations`...) ورفض الطلب 400 إن خالف.
- حساب التكلفة:
  - صور: `credits = model.credits` × عدد المخرجات
  - فيديو: `credits = ceil(cost_per_second_usd × duration × 16)`
- خصم الرصيد عبر `deduct_credits` الموجود مسبقاً.
- يستخدم `FAL_KEY` الموجود في secrets (تم تأكيد وجوده).

---

## 5) الواجهة

### إعادة تاب «النموذج» (Model)
- في `MediaHubPage`: إضافة صفّ «Model» مجدداً داخل لوحة الإعدادات.
- في `ImageStudioPage` و `VideoStudioPage`: إعادة زر «Model» قرب زر «Media» بنمط iOS الموجود.

### `FalModelPickerSheet` (مكوّن جديد)
- يقرأ من الجدولين الجديدين عبر `useFalModels()` hook.
- كل بطاقة تعرض:
  - الاسم + الوصف القصير + السعر بالـ MC
  - شارات نصّية صغيرة (بدون أي إيموجي):
    - `NEW` للجديد
    - `PRO` للمميّز
    - `MULTI ×N` للنماذج التي تدعم عدّة صور (N = الحد الأقصى)
    - `I2I` / `I2V` / `T2I` / `T2V` حسب الأوضاع المدعومة
    - `START+END` لنماذج الفيديو التي تدعم Start & End frame
    - `AUDIO` للنماذج التي تولّد صوتاً
- فلاتر: All / New / Premium / Fast.
- ترتيب: المميّز ← الأحدث ← الأقل تكلفة.

### إدخال الصور
- **النماذج العادية**: مربع إرفاق واحد (كما هو).
- **`supports_multi_image`**: مربع يقبل عدة صور حتى `max_input_images`، يعرضها كصفّ مصغّرات قابلة للحذف، مع شارة `MULTI ×N` فوقه.
- **`supports_start_end_frame` (فيديو)**: مربعا إدخال منفصلان «Start Frame» و«End Frame»، كل منهما عليه شارة `START` أو `END`، ويختفي مربع الإرفاق العادي.

### الجودة والأبعاد والمدة
- لوحة الإعدادات تقرأ `supported_aspects` و `supported_resolutions` و `supported_durations` من النموذج المختار وتعرض فقط ما هو مدعوم.
- ترتيب الأبعاد: 1:1 ← 4:5 ← 2:3 ← 3:2 ← 4:3 ← 16:9 ← 9:16 ← 21:9.
- المدّة دائماً بالثواني (5s / 8s / 10s إلخ).

---

## 6) خطوات التنفيذ بالترتيب

1. **بحث ميداني**: جلب openapi schema لكل نموذج من القائمتين للتحقّق من السعر الحقيقي ومسار الـ endpoint والمدخلات/الأبعاد المدعومة.
2. **Migration #1**: إنشاء الجدولين `fal_image_models` و `fal_video_models` + RLS + Indexes + Triggers `updated_at`.
3. **Migration #2 (data)**: Seed لكل النماذج (60 صف) بالقيم الحقيقية.
4. **Edge functions**: `fal-models-catalog`, `fal-generate-image`, `fal-generate-video`.
5. **Hook + types**: `useFalModels`, `useFalGenerate`.
6. **مكوّنات مشتركة جديدة**: `FalModelPickerSheet`, `MultiImageAttach`, `StartEndFrameAttach`, `ModelBadges`.
7. **ربط الصفحات**: استعادة تاب «النموذج» في `MediaHubPage` و `ImageStudioPage` و `VideoStudioPage` مع إصلاح خطأ runtime الحالي (`Unknown image model: nano-banana`) عبر استخدام السجل الجديد.
8. **اختبار**: `curl_edge_functions` لكل من t2i, i2i, multi-image, t2v, i2v, start/end frame.

---

## ملاحظات
- ممنوع استخدام أي إيموجي في الواجهة — كل الشارات نصّية فقط.
- جميع المدد تظهر بالثواني (s).
- لا حذف ولا تعديل على أي جدول قديم؛ المستخدم القديم لـ `ai_models` يستمر بالعمل.
- `FAL_KEY` المؤكَّد سيُستخدم في الـ edge functions دون عرضه أبداً.
- الواجهة تستخدم semantic tokens من `index.css` بالكامل.