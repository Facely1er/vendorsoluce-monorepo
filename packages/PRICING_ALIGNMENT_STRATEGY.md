# Pricing Pages Alignment Strategy

**Date:** January 2026  
**Purpose:** Maintain consistency between website and React app pricing pages

---

## Current State

### Two Pricing Pages

1. **Website Pricing** (`packages/website/pricing.html`)
   - Static HTML page
   - Hardcoded pricing data
   - Manual updates required

2. **React App Pricing** (`packages/app/src/pages/Pricing.tsx`)
   - Dynamic React component
   - Uses `stripeProducts.ts` as data source
   - Stripe integration

### Source of Truth

**React App:** `packages/app/src/lib/stripeProducts.ts`
- Contains all product definitions
- Monthly and annual pricing
- Features, limits, compliance frameworks
- Stripe product IDs

**Website:** Hardcoded in HTML
- Pricing values embedded in HTML
- Features listed in HTML
- No centralized data source

---

## Alignment Issues

### Potential Inconsistencies

1. **Pricing Values**
   - Website: Hardcoded `$39`, `$129`, `$399`, etc.
   - React: Pulled from `stripeProducts.ts`
   - Risk: Values can drift out of sync

2. **Features Lists**
   - Website: Features in HTML
   - React: Features in `stripeProducts.ts`
   - Risk: Feature lists can differ

3. **Plan Names**
   - Website: "Starter Monthly", "Professional Monthly", etc.
   - React: Uses product names from `stripeProducts.ts`
   - Risk: Naming inconsistencies

4. **Compliance Frameworks**
   - Website: May list frameworks differently
   - React: Uses `complianceFrameworks` array
   - Risk: Framework lists can differ

5. **Limits (Users, Vendors, Storage)**
   - Website: Hardcoded limits
   - React: Uses `limits` object
   - Risk: Limit values can differ

---

## Recommended Solutions

### Option 1: Shared Pricing Configuration (Recommended)

Create a shared pricing configuration file that both projects can use:

**Structure:**
```
packages/
  shared/
    pricing-config.js (or .json)
```

**Benefits:**
- Single source of truth
- Easy to maintain
- Both projects reference same data
- Type-safe with TypeScript

**Implementation:**
1. Extract pricing data from `stripeProducts.ts` to shared config
2. Website reads from shared config (via build script or API)
3. React app imports from shared config
4. Update process: Change shared config → Both pages update

---

### Option 2: Website Uses React App Pricing API

**Structure:**
- React app exposes pricing data via API endpoint
- Website fetches pricing data at build time or runtime

**Benefits:**
- React app is single source of truth
- Website always in sync
- No manual updates needed

**Drawbacks:**
- Requires API endpoint
- Website depends on React app
- Build complexity

---

### Option 3: Documentation-Driven Updates

**Structure:**
- Maintain pricing documentation
- Manual sync process with checklist
- Regular review schedule

**Benefits:**
- Simple to implement
- No code changes needed
- Works immediately

**Drawbacks:**
- Manual process (error-prone)
- Requires discipline
- No automated validation

---

## Recommended Approach: Hybrid

### Phase 1: Immediate (Documentation)

1. **Create Pricing Reference Document**
   - Document all pricing values
   - List all features per tier
   - Document limits and frameworks
   - Include update checklist

2. **Update Process**
   - When pricing changes, update both pages
   - Use checklist to ensure consistency
   - Review monthly

### Phase 2: Short-term (Shared Config)

1. **Create Shared Pricing Config**
   ```javascript
   // packages/shared/pricing-config.js
   export const PRICING_PLANS = {
     starter: {
       monthly: 39,
       annual: 390,
       features: [...],
       limits: {...}
     },
     // ...
   };
   ```

2. **Update React App**
   - Import from shared config
   - Use for Stripe products
   - Use for pricing page

3. **Update Website**
   - Build script reads shared config
   - Generates pricing HTML
   - Or uses JavaScript to inject pricing

### Phase 3: Long-term (API-Driven)

1. **Pricing API Endpoint**
   - React app exposes `/api/pricing`
   - Returns JSON with all pricing data

2. **Website Integration**
   - Fetches from API at build time
   - Or uses client-side fetch
   - Always in sync

---

## Implementation Plan

### Step 1: Create Pricing Reference Document

**File:** `packages/PRICING_REFERENCE.md`

**Content:**
- All pricing tiers and prices
- Features per tier
- Limits per tier
- Compliance frameworks
- Update history

### Step 2: Create Shared Pricing Config

**File:** `packages/shared/pricing-config.js`

**Structure:**
```javascript
export const PRICING_PLANS = {
  starter: {
    name: 'Starter',
    monthly: {
      price: 39,
      priceId: 'price_xxx',
      productId: 'prod_xxx'
    },
    annual: {
      price: 390,
      priceId: 'price_xxx',
      productId: 'prod_xxx',
      savings: 78 // 20% savings
    },
    features: [
      'Up to 5 team members',
      'Up to 25 vendor assessments',
      // ...
    ],
    limits: {
      users: 5,
      vendors: 25,
      assessments: 100,
      storage: '2GB'
    },
    complianceFrameworks: ['NIST']
  },
  // ... other tiers
};
```

### Step 3: Update React App

1. Modify `stripeProducts.ts` to import from shared config
2. Generate Stripe products from shared config
3. Pricing page uses shared config

### Step 4: Update Website

**Option A: Build-time Generation**
- Build script reads shared config
- Generates pricing HTML section
- Injects into `pricing.html`

**Option B: Client-side Injection**
- Website loads shared config via script
- JavaScript injects pricing data
- Dynamic updates

**Option C: Manual Sync**
- Document pricing values
- Manual update checklist
- Regular reviews

---

## Current Pricing Values (Reference)

### Monthly Plans
- **Starter:** $39/month
- **Professional:** $129/month
- **Enterprise:** $399/month
- **Federal:** Custom pricing

### Annual Plans (20% savings)
- **Starter:** $390/year (save $78)
- **Professional:** $1,290/year (save $258)
- **Enterprise:** $3,990/year (save $798)
- **Federal:** Custom pricing

### Features Summary

**Starter:**
- 5 team members
- 25 vendor assessments
- NIST SP 800-161
- 2GB storage
- Email support

**Professional:**
- 25 team members
- 100 vendor assessments
- NIST + CMMC 2.0
- 15GB storage
- Priority support
- API access
- White-label

**Enterprise:**
- Unlimited team members
- Unlimited vendor assessments
- All compliance frameworks
- Unlimited storage
- Dedicated support
- Custom integrations

**Federal:**
- All Enterprise features
- FedRAMP compliance
- Government-specific features
- Custom pricing

---

## Maintenance Checklist

When updating pricing:

- [ ] Update `packages/shared/pricing-config.js` (if exists)
- [ ] Update `packages/app/src/lib/stripeProducts.ts`
- [ ] Update `packages/app/src/pages/Pricing.tsx` (if needed)
- [ ] Update `packages/website/pricing.html`
- [ ] Update `packages/PRICING_REFERENCE.md`
- [ ] Test React app pricing page
- [ ] Test website pricing page
- [ ] Verify Stripe product IDs match
- [ ] Check feature lists match
- [ ] Verify limits match
- [ ] Test checkout flow
- [ ] Update meta descriptions
- [ ] Review both pages side-by-side

---

## Quick Win: Create Pricing Reference

**Immediate Action:**
1. Create `packages/PRICING_REFERENCE.md` with current values
2. Document all pricing, features, limits
3. Use as reference when updating either page
4. Review monthly for consistency

---

## Files to Create/Modify

### New Files
1. `packages/shared/pricing-config.js` - Shared pricing data
2. `packages/PRICING_REFERENCE.md` - Pricing documentation
3. `packages/website/scripts/generate-pricing.js` - Build script (optional)

### Files to Modify
1. `packages/app/src/lib/stripeProducts.ts` - Import from shared config
2. `packages/website/pricing.html` - Use shared config or reference doc
3. `packages/app/src/pages/Pricing.tsx` - Already uses stripeProducts.ts

---

## Validation Strategy

### Automated Checks (Future)
- Compare pricing values between files
- Validate feature lists match
- Check limits consistency
- Verify Stripe IDs exist

### Manual Review
- Side-by-side comparison
- Feature list verification
- Pricing calculation checks
- User testing

---

## Next Steps

1. **Immediate:** Create `PRICING_REFERENCE.md` with current values
2. **Short-term:** Extract shared pricing config
3. **Long-term:** Implement API-driven approach

---

**Status:** ⚠️ Needs Alignment Strategy  
**Priority:** High - Pricing consistency is critical for trust
