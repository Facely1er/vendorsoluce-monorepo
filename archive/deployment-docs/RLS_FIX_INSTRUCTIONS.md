# 🔒 RLS Policy Security Fixes

## Overview

This fixes 17 overly permissive RLS (Row Level Security) policies identified in the Supabase security audit. These policies were using `WITH CHECK (true)` or `USING (true)`, which effectively bypassed security.

## ✅ Quick Fix - Method 1: Supabase Dashboard (Recommended)

1. **Open Supabase SQL Editor:**
   - Go to: https://supabase.com/dashboard/project/dfklqsdfycwjlcasfciu/editor

2. **Copy and Paste SQL:**
   - Open the file: `fix-rls-policies-safe.sql`
   - Copy all contents
   - Paste into the SQL Editor
   - Click **Run** or press `Ctrl+Enter`

3. **Verify:**
   - Check for any errors in the output
   - Re-run the security linter to confirm fixes

## ✅ Method 2: Using psql (Command Line)

If you have PostgreSQL client installed:

```powershell
cd "C:\Users\facel\Downloads\GitHub\ERMITS_MONOREPOS\vendorsoluce-monorepo"
Get-Content fix-rls-policies-safe.sql | psql "postgresql://postgres:K1551d0ug0u@db.dfklqsdfycwjlcasfciu.supabase.co:5432/postgres"
```

## 📋 What Gets Fixed

### Tables Fixed (17 total):

1. **cybercorrect.data_subject_requests** - Now requires user_id match
2. **public.asset_import_batch** - Now requires user ownership
3. **public.business_functions** - Now requires user ownership
4. **public.business_impacts** - Now requires user ownership
5. **public.continuity_plans** - Now requires user ownership
6. **public.feedback_submissions** - Now validates email/required fields
7. **public.framework_phases** - Now requires user ownership
8. **public.mitigation_actions** - Now requires user ownership
9. **public.nist_assessments** - Now requires user ownership
10. **public.nist_controls** - Now requires user ownership
11. **public.nist_mappings** - Now requires user ownership
12. **public.profiles** - Now requires auth.uid() = id
13. **public.risks** - Now requires user ownership
14. **public.signal_history** - Now requires user ownership
15. **public.technosoluce_sbom_library** - Now validates required fields
16. **public.vs_contact_submissions** - Now validates required fields
17. **public.vs_profiles** - Now requires auth.uid() = id

## 🔍 Security Improvements

### Before:
- Policies used `WITH CHECK (true)` - allowed unrestricted access
- Any authenticated user could modify any record
- Anonymous users could insert invalid data

### After:
- Policies check `auth.uid() = user_id` or `auth.uid() = created_by`
- Users can only manage their own data
- Anonymous inserts require validation (email, name, etc.)
- Profile inserts restricted to matching user ID

## ⚠️ Important Notes

1. **Test After Applying:**
   - Verify your application still works correctly
   - Test user registration, data creation, and updates
   - Ensure users can access their own data

2. **Column Assumptions:**
   - The fixes assume tables have `user_id`, `created_by`, or `id` columns
   - If your schema differs, you may need to adjust the policies

3. **Backup First:**
   - Consider backing up your database before applying
   - Or test on a staging environment first

## 🔄 Verification

After applying the fixes, run the Supabase security linter again:
- Go to: Supabase Dashboard → Database → Linter
- All 17 RLS policy warnings should be resolved

## 📞 Need Help?

If you encounter issues:
1. Check the SQL Editor output for specific errors
2. Verify table schemas match the expected columns
3. Test one policy at a time if needed
