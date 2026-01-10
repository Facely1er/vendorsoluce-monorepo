# Navigation Logic & Interlinking Review

**Date:** January 2025  
**Purpose:** Review navigation between React app stages and interlinking with website

---

## Issues Found

### 1. Website → React App Links

#### ❌ **trial.html** - Incorrect Stage 2 Link
- **Line 237:** Links to `/tools/vendor-risk-radar` (Stage 1) but text says "Continue to Stage 2"
- **Should be:** `/supply-chain-assessment` (Stage 2)

#### ⚠️ **demo.html** - Generic Platform Link
- **Line 389:** Links to `/tools/vendor-risk-radar` with text "Continue to Full Platform"
- **Should be:** More specific - "Continue to Stage 1" or link to `/demo` in React app

#### ✅ **how-it-works.html** - Correct Links
- Stage 1 → `/tools/vendor-risk-radar` ✓
- Stage 2 → `/supply-chain-assessment` ✓
- Stage 3 → `/vendor-assessments` ✓

---

### 2. React App Internal Navigation

#### ⚠️ **VendorRiskRadar (Stage 1)**
- **Has:** JourneyProgress component with Stage 2 link
- **Missing:** Direct CTA button to Stage 2 after vendor analysis
- **Missing:** Link back to website demo/trial

#### ⚠️ **SupplyChainAssessment (Stage 2)**
- **Has:** JourneyProgress component with Stage 3 link
- **Missing:** Direct CTA button to Stage 3 after assessment completion
- **Missing:** Link back to Stage 1
- **Missing:** Link back to website demo/trial

#### ⚠️ **VendorAssessmentPortal (Stage 3)**
- **Has:** JourneyProgress component
- **Missing:** Link back to Stage 1 or Stage 2
- **Missing:** Link back to website demo/trial
- **Missing:** Journey completion celebration with links

---

### 3. Cross-Project Navigation

#### ❌ **Missing: React App → Website Links**
- No "See Demo" link in React app
- No "Try Trial" link in React app
- No "Back to Website" option

#### ⚠️ **Missing: Website → React App Demo/Trial**
- Website demo.html should link to React `/demo` page
- Website trial.html should link to React `/trial` page
- Or maintain website versions but link to React app for full experience

---

## Recommended Navigation Flow

### Website → React App Flow
```
Website Homepage
  ↓
Website Demo (demo.html) - Sample data, 3 stages
  ↓
Website Trial (trial.html) - User's data, Stage 1 only
  ↓
React App Demo (/demo) - Interactive demo
  ↓
React App Trial (/trial) - Zero-friction trial
  ↓
React App Stage 1 (/tools/vendor-risk-radar)
  ↓
React App Stage 2 (/supply-chain-assessment)
  ↓
React App Stage 3 (/vendor-assessments)
```

### React App Internal Flow
```
Stage 1: Vendor Risk Radar
  ├─ JourneyProgress (shows all stages)
  ├─ CTA: "Continue to Stage 2" → /supply-chain-assessment
  └─ Link: "See Demo" → /demo or website demo.html

Stage 2: Supply Chain Assessment
  ├─ JourneyProgress (shows all stages)
  ├─ CTA: "Continue to Stage 3" → /vendor-assessments
  ├─ Link: "Back to Stage 1" → /tools/vendor-risk-radar
  └─ Link: "See Demo" → /demo or website demo.html

Stage 3: Vendor Assessment Portal
  ├─ JourneyProgress (shows all stages)
  ├─ Celebration: "Journey Complete!"
  ├─ Link: "Back to Stage 1" → /tools/vendor-risk-radar
  ├─ Link: "Back to Stage 2" → /supply-chain-assessment
  └─ Link: "See Demo" → /demo or website demo.html
```

---

## Fixes Required

### Priority 1: Critical Navigation Errors

1. **Fix trial.html Stage 2 link** (Line 237)
   - Change: `/tools/vendor-risk-radar` → `/supply-chain-assessment`
   - Update text if needed

2. **Add Stage 2 CTA in VendorRiskRadar**
   - Add prominent "Continue to Stage 2" button after vendor analysis
   - Link to `/supply-chain-assessment`

3. **Add Stage 3 CTA in SupplyChainAssessment**
   - Add "Continue to Stage 3" button after assessment completion
   - Link to `/vendor-assessments`

### Priority 2: Cross-Project Links

4. **Add "See Demo" links in React app**
   - Add to all stage pages
   - Link to `/demo` or website `demo.html`

5. **Add "Try Trial" links in React app**
   - Add to Stage 1 page
   - Link to `/trial` or website `trial.html`

6. **Add "Back to Website" option**
   - Add to React app pages
   - Link to website homepage

### Priority 3: Enhanced Navigation

7. **Add journey completion in Stage 3**
   - Show completion message
   - Provide links to restart journey or explore more

8. **Add breadcrumb navigation**
   - Show current stage in breadcrumbs
   - Allow quick navigation between stages

---

## Implementation Plan

### Step 1: Fix Critical Errors
- [ ] Fix trial.html Stage 2 link
- [ ] Add Stage 2 CTA in VendorRiskRadar
- [ ] Add Stage 3 CTA in SupplyChainAssessment

### Step 2: Add Cross-Project Links
- [ ] Add "See Demo" links to React app pages
- [ ] Add "Try Trial" links to React app pages
- [ ] Add "Back to Website" links

### Step 3: Enhance Navigation
- [ ] Add journey completion in Stage 3
- [ ] Add breadcrumb navigation
- [ ] Add "Back to Previous Stage" links

---

## Files to Modify

### Website Files
1. `packages/website/trial.html` - Fix Stage 2 link
2. `packages/website/demo.html` - Improve CTAs

### React App Files
1. `packages/app/src/pages/tools/VendorRiskRadar.tsx` - Add Stage 2 CTA
2. `packages/app/src/pages/SupplyChainAssessment.tsx` - Add Stage 3 CTA
3. `packages/app/src/pages/VendorAssessmentPortal.tsx` - Add completion & navigation
4. `packages/app/src/components/journey/JourneyProgress.tsx` - Already good, may enhance

---

## Testing Checklist

- [ ] Website demo.html → React app navigation works
- [ ] Website trial.html → React app Stage 2 link works
- [ ] React app Stage 1 → Stage 2 navigation works
- [ ] React app Stage 2 → Stage 3 navigation works
- [ ] React app → Website demo/trial links work
- [ ] JourneyProgress component navigation works
- [ ] All CTAs are visible and functional
- [ ] Mobile navigation works correctly

---

**Status:** ⚠️ Issues Found - Fixes Required  
**Priority:** High - Navigation is critical for user experience
