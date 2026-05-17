# Mobile responsiveness – timeline & page list

Plan to convert all web app screens to mobile-responsive.  
**Stack:** Next.js, Tailwind CSS.

---

## Timeline (estimated)

| Phase | Scope | Duration | Notes |
|-------|--------|----------|--------|
| **Phase 1** | Global shell + auth & landing | 3–4 days | Header, layouts, login/signup/forgot/reset, home |
| **Phase 2** | Create flow – upload & summary | 2–3 days | Upload, NoResume, ExtractedInfo, Summary, Resume |
| **Phase 3** | Create flow – questionnaire | 2–3 days | Questionnaire + sidebar + all question layouts |
| **Phase 4** | Create flow – job title & snapshot | 3–4 days | Job prediction, radar, recommendations, detail; full snapshot page + charts |
| **Phase 5** | Profile + polish | 1–2 days | Profile page, shared components, QA |
| **Total** | — | **~12–16 days** | Single dev; adjust if parallel work |

---

## 1. Global / shared (do first)

| Item | File(s) | Sections / notes |
|------|---------|-------------------|
| **Root layout** | `src/app/layout.tsx` | Body, font, viewport meta (if any). |
| **Header** | `src/components/Header.tsx` | Logo size, nav/buttons, avatar dropdown, **mobile menu** (hamburger + drawer/sheet for “Log in”, “Create my Skill snapshot”, Profile/Log out). |
| **Public layout** | `src/app/(public)/layout.tsx` | Wrapper only; ensure no fixed widths. |
| **Private layout** | `src/app/(private)/layout.tsx` | Wrapper only; ensure no fixed widths. |
| **Global styles** | `src/styles/globals.css`, `theme.css`, `utilities.css` | `container`, `section-padding`, breakpoints, touch targets. |

---

## 2. Public pages (auth & landing)

| Page | File(s) | Sections to make responsive |
|------|---------|------------------------------|
| **Home (landing)** | `src/app/page.tsx` | **Hero** (flex-col-reverse, text/CTA, hero image). **How does Skill Snapshot help** (feature grid 1→3). **Glimpse** (dot-bg, image + list + CTA). **Stats** (grid 1→2→4, card padding/text). **Process (3 steps)** (grid 1→3). **Smart features carousel** (Swiper breakpoints). **30s video** (aspect ratio, h-[90dvh]). **Beyond a resume** (convo images, overflow). **Before/After comparison** (grid, arrow on mobile). **Testimonials** (flex → stack or carousel). **FAQ** (accordion, padding). **Footer** (CTA + logo + social stack). |
| **Login** | `src/app/(public)/login/page.tsx` | Main: `flex-col md:flex-row`. Form column: full width on mobile, padding. |
| **Signup** | `src/app/(public)/signup/page.tsx` | Same as Login. |
| **Forgot password** | `src/app/(public)/forgotpassword/page.tsx` | Same as Login. |
| **Reset password** | `src/app/(public)/resetpassword/page.tsx` | Same as Login. |
| **LeftBanner** (shared auth) | `src/components/LeftBanner.tsx` | Hide or collapse on small screens; stack with form; image + text sizing. |

**Shared auth components to check:**  
`BackButton`, `TextField`, `AccentButton`, `SocialSignIn`, `CustomButton` (in `src/components/`).

---

## 3. Private – Profile

| Page | File(s) | Sections |
|------|---------|----------|
| **Profile** | `src/app/(private)/profile/page.tsx` | **Header block**: avatar + name + email (stack on mobile, `border-r` only from `md`). **Form**: `grid-cols-2` → `grid-cols-1` on mobile; padding `p-16` → `p-4`/`p-6`; button row. |

---

## 4. Private – Create flow (single route, multiple “screens”)

Create is one route (`/create`) with internal state switching. Each “screen” is a section to treat as a page for responsiveness.

### 4.1 Create – orchestrator

| Item | File | Notes |
|------|------|--------|
| **Create page** | `src/app/(private)/create/page.tsx` | No layout; only switches screens. Ensure container/padding works on small viewports. |

### 4.2 Upload “screen”

| Screen | File(s) | Sections |
|--------|---------|----------|
| **Upload** | `src/app/(private)/create/(upload)/UploadPage.tsx` | Step indicator, title + star, **FileUploader** + **LinkedinInput** + **AlternateOptionCard** layout (stack on mobile). |
| **FileUploader** | `(upload)/FileUploader.tsx` | Drag area, button sizing. |
| **LinkedinInput** | `(upload)/LinkedinInput.tsx` | Input + CTA. |
| **AlternateOptionCard** | `(upload)/AlternateOptionCard.tsx` | Card layout, padding. |
| **SummaryLoader** | `(upload)/SummaryLoader.tsx` | Full-screen loader; text/animations. |
| **NoResume** | `(upload)/NoResume.tsx` | Layout, CTAs. |
| **ExtractedInfo** | `(upload)/ExtractedInfo.tsx` | Summary + **EditJourney**; grid/list for mobile. |
| **EditJourney** | `(upload)/EditJourney.tsx` | Form/list layout. |

### 4.3 Summary & Resume “screens”

| Screen | File(s) | Sections |
|--------|---------|----------|
| **Summary** | `src/app/(private)/create/(summary)/Summary.tsx` | Content grid, CTAs, step indicator. |
| **Resume** | `src/app/(private)/create/Resume.tsx` | Layout, any preview or actions. |

### 4.4 Questionnaire “screen”

| Screen | File(s) | Sections |
|--------|---------|----------|
| **Questionnaire page** | `(questionnaire)/QuestionnairePage.tsx` | **Sidebar** (hide or drawer on mobile) + **QuestionSlider** + step indicator. |
| **SideBar** | `(questionnaire)/SideBar.tsx` | Collapsible/drawer on mobile; step list. |
| **QuestionSlider** | `(questionnaire)/QuestionSlider.tsx` | Single question per view; nav buttons. |
| **QuestionCard** | `(questionnaire)/QuestionCard.tsx` | Padding, font sizes. |
| **QuestionLayout** | `(questionnaire)/QuestionLayout.tsx` | Wrapper spacing. |
| **Layouts** | `(questionnaire)/(layouts)/*.tsx` | **TagsLayout**, **SliderLayout**, **SingleWithTextField**, **SingleWithInput**, **SingleWithDropdown**, **SingleSelect**, **ShortAnswer**, **MultipleWithLimit**, **MultipleWithAdd**, **MultipleSelect**, **ListLayout**, **DropdownWithMultiSelect** – ensure chips/options wrap and touch targets. |
| **Layout components** | `(questionnaire)/(layouts)/(layoutComponents)/*.tsx` | **SliderComponent**, **Options**, **InputChip**, **IconAndQuestionText**, **EditModal**, **AddChip** – mobile-friendly controls. |

### 4.5 Job title “screen” (sub-pages)

| Sub-screen | File(s) | Sections |
|------------|---------|----------|
| **Job prediction** | `(jobtitle)/JobTitlePage.tsx` + `JobPrediction.tsx` | Back + step indicator, title, **JobPrediction** content. |
| **JobPrediction** | `(jobtitle)/JobPrediction.tsx` | Cards/list for roles. |
| **Role radar** | `(jobtitle)/RoleRadar.tsx` | Chart container (Recharts); responsive width/height. |
| **Role recommendations** | `(jobtitle)/RoleRecommendations.tsx` | Same/alternate tabs, list/grid. |
| **Role detail** | `(jobtitle)/RoleDetail.tsx` | Single role layout, **MatchPercentage**, **AttributeSection**, **IndustrySection**, **GraphComponent**. |
| **Job title components** | `(jobtitle)/(components)/*.tsx` | **JobTitle**, **MatchPercentage**, **AttributeSection**, **IndustrySection**, **GraphComponent** – stack on mobile. |

### 4.6 Snapshot “screen”

| Section | File(s) | Sections |
|---------|---------|----------|
| **Snapshot page shell** | `(snapshot)/SnapShotPage.tsx` | Back + step indicator, title, main card padding. |
| **Profile block** | Same | Left/right panels → stack on mobile; **WhyBox** row → stack. |
| **Skill Journey** | `(snapshot)/SkillJourney.tsx` | Grid 1→3; card padding. |
| **PillarChart** | `(snapshot)/PillarChart.tsx` | Chart + legend; full width on mobile. |
| **BubbleChart** | `(snapshot)/Bubblechart.tsx` | Responsive chart. |
| **LineChart** | `(snapshot)/LineChart.tsx` | Responsive chart. |
| **MapChart** | `(snapshot)/MapChart.tsx` | Map/chart container. |
| **ProjectManager** | `(snapshot)/ProjectManager.tsx` | Grid/sections stack. |
| **SkillHeatMap** | `(snapshot)/SkillHeatMap.tsx` | Table or grid; horizontal scroll if needed. |
| **ActionSteps** | `(snapshot)/ActionSteps.tsx` | List layout. |
| **WhyBox** | `(snapshot)/WhyBox.tsx` | Inline → stack. |
| **TitleWithIcon** | `(snapshot)/TitleWIthIcon.tsx` | Text + icon size. |
| **PDFLoadingOverlay** | `(snapshot)/PDFLoadingOverlay.tsx` | Full-screen overlay. |
| **Download/Share** | SnapShotPage | Button row wrap, link text. |

---

## 5. Shared components (used across pages)

| Component | File | Notes |
|-----------|------|--------|
| **StepIndicator** | `src/components/StepIndicator.tsx` | Horizontal steps; consider compact/mobile variant. |
| **BackButton** | `src/components/BackButton.tsx` | Size, padding. |
| **CustomButton / AccentButton / BorderButton** | `src/components/CustomButton.tsx` | Full width on mobile where appropriate. |
| **TitleComponent** | `src/components/TitleComponent.tsx` | Font size scale. |
| **TextField** | `src/components/TextField.tsx` | Padding, label. |
| **LetterAvatar** | `src/components/LetterAvatar.tsx` | Size in header. |
| **ProfileProgressRing** | `src/components/ProfileProgressRing.tsx` | Size in profile + snapshot. |
| **VideoPlayer** | `src/components/VideoComponent.tsx` | Aspect ratio, controls. |
| **SwiperCarousel** | `src/components/SwiperCarousel.tsx` | Already has breakpoints; verify mobile. |
| **CustomBadge** | `src/components/CustomBadge.tsx` | Text wrap. |
| **SkillCard** | `src/components/SkillCard.tsx` | Card layout. |
| **JourneyCards** | `src/components/JourneyCards.tsx` | Grid/list. |

---

## 6. Quick checklist by route

- [ ] **/** – Home (all sections above)
- [ ] **/login** – Login + LeftBanner
- [ ] **/signup** – Signup + LeftBanner
- [ ] **/forgotpassword** – Forgot + LeftBanner
- [ ] **/resetpassword** – Reset + LeftBanner
- [ ] **/profile** – Profile (header + form)
- [ ] **/create** – Upload → ExtractedInfo → Questionnaire → Resume / NoResume → Summary → Job title (prediction → radar → recommendations → detail) → Snapshot

---

## 7. Suggested Tailwind approach

- Use **`sm:`**, **`md:`**, **`lg:`** consistently (e.g. `flex-col md:flex-row`, `grid-cols-1 md:grid-cols-2`).
- **Containers**: ensure `container` has horizontal padding (e.g. `px-4` or `px-6`) on small screens.
- **Typography**: scale down on mobile (e.g. `text-2xl sm:text-4xl`).
- **Charts**: wrap in a responsive container; use `width={undefined}` or `100%` with aspect ratio where needed (Recharts).
- **Touch**: min ~44px tap targets for buttons/links.
- **Header**: implement **hamburger + mobile menu** for auth/profile links on small viewports.

Use this doc as the master list and tick off sections as you make them responsive. If you want, next step can be implementing Phase 1 (Header + auth + home) or a single page end-to-end as a reference.
