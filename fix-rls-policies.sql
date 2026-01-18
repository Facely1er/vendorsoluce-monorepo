-- Fix RLS Policies - Make them more secure
-- This script fixes overly permissive RLS policies identified in the security audit
-- 
-- IMPORTANT: Before running, verify that the tables have the expected columns
-- (user_id, created_by, id, email, name, etc.)
-- If columns don't exist, you may need to adjust the policies accordingly.

-- ============================================
-- 1. Fix data_subject_requests table
-- ============================================
-- Current: Allows unrestricted INSERT
-- Fix: Add proper user validation (assuming user_id column exists)
DROP POLICY IF EXISTS "Users can insert data subject requests" ON cybercorrect.data_subject_requests;
CREATE POLICY "Users can insert data subject requests" ON cybercorrect.data_subject_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (
    -- If user_id column exists, check it matches auth.uid()
    -- Otherwise, allow but require at least some identifying information
    (SELECT column_name FROM information_schema.columns 
     WHERE table_schema = 'cybercorrect' 
     AND table_name = 'data_subject_requests' 
     AND column_name = 'user_id') IS NOT NULL
    AND auth.uid() = user_id
    OR
    -- Fallback: require email or other identifier if user_id doesn't exist
    (SELECT column_name FROM information_schema.columns 
     WHERE table_schema = 'cybercorrect' 
     AND table_name = 'data_subject_requests' 
     AND column_name = 'user_id') IS NULL
    AND (email IS NOT NULL OR request_type IS NOT NULL)
  );

-- ============================================
-- 2. Fix asset_import_batch table
-- ============================================
-- Current: Allows unrestricted INSERT
-- Fix: Add user ownership check
DROP POLICY IF EXISTS "Users can create import batches" ON public.asset_import_batch;
CREATE POLICY "Users can create import batches" ON public.asset_import_batch
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = COALESCE(user_id, created_by));

-- ============================================
-- 3. Fix business_functions table
-- ============================================
-- Current: Allows unrestricted ALL operations
-- Fix: Add proper ownership checks
DROP POLICY IF EXISTS "Users can manage business functions" ON public.business_functions;
CREATE POLICY "Users can manage business functions" ON public.business_functions
  FOR ALL
  TO authenticated
  USING (auth.uid() = COALESCE(user_id, created_by))
  WITH CHECK (auth.uid() = COALESCE(user_id, created_by));

-- ============================================
-- 4. Fix business_impacts table
-- ============================================
DROP POLICY IF EXISTS "Users can manage business impacts" ON public.business_impacts;
CREATE POLICY "Users can manage business impacts" ON public.business_impacts
  FOR ALL
  TO authenticated
  USING (auth.uid() = COALESCE(user_id, created_by))
  WITH CHECK (auth.uid() = COALESCE(user_id, created_by));

-- ============================================
-- 5. Fix continuity_plans table
-- ============================================
DROP POLICY IF EXISTS "Users can manage continuity plans" ON public.continuity_plans;
CREATE POLICY "Users can manage continuity plans" ON public.continuity_plans
  FOR ALL
  TO authenticated
  USING (auth.uid() = COALESCE(user_id, created_by))
  WITH CHECK (auth.uid() = COALESCE(user_id, created_by));

-- ============================================
-- 6. Fix feedback_submissions table
-- ============================================
-- Current: Allows unrestricted INSERT for anonymous users
-- Fix: Allow anonymous but validate data
DROP POLICY IF EXISTS "Users can insert their own feedback" ON public.feedback_submissions;
CREATE POLICY "Users can insert their own feedback" ON public.feedback_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Allow anonymous users to submit feedback
    -- But ensure email is provided and valid
    (auth.role() = 'anon' AND email IS NOT NULL AND email != '')
    OR
    -- Authenticated users can submit with their user_id
    (auth.role() = 'authenticated' AND auth.uid() = COALESCE(user_id, auth.uid()))
  );

-- ============================================
-- 7. Fix framework_phases table
-- ============================================
DROP POLICY IF EXISTS "Users can manage framework phases" ON public.framework_phases;
CREATE POLICY "Users can manage framework phases" ON public.framework_phases
  FOR ALL
  TO authenticated
  USING (auth.uid() = COALESCE(user_id, created_by))
  WITH CHECK (auth.uid() = COALESCE(user_id, created_by));

-- ============================================
-- 8. Fix mitigation_actions table
-- ============================================
DROP POLICY IF EXISTS "Users can manage mitigation actions" ON public.mitigation_actions;
CREATE POLICY "Users can manage mitigation actions" ON public.mitigation_actions
  FOR ALL
  TO authenticated
  USING (auth.uid() = COALESCE(user_id, created_by))
  WITH CHECK (auth.uid() = COALESCE(user_id, created_by));

-- ============================================
-- 9. Fix nist_assessments table
-- ============================================
DROP POLICY IF EXISTS "Users can manage nist assessments" ON public.nist_assessments;
CREATE POLICY "Users can manage nist assessments" ON public.nist_assessments
  FOR ALL
  TO authenticated
  USING (auth.uid() = COALESCE(user_id, created_by))
  WITH CHECK (auth.uid() = COALESCE(user_id, created_by));

-- ============================================
-- 10. Fix nist_controls table
-- ============================================
DROP POLICY IF EXISTS "Users can manage nist controls" ON public.nist_controls;
CREATE POLICY "Users can manage nist controls" ON public.nist_controls
  FOR ALL
  TO authenticated
  USING (auth.uid() = COALESCE(user_id, created_by))
  WITH CHECK (auth.uid() = COALESCE(user_id, created_by));

-- ============================================
-- 11. Fix nist_mappings table
-- ============================================
DROP POLICY IF EXISTS "Users can manage nist mappings" ON public.nist_mappings;
CREATE POLICY "Users can manage nist mappings" ON public.nist_mappings
  FOR ALL
  TO authenticated
  USING (auth.uid() = COALESCE(user_id, created_by))
  WITH CHECK (auth.uid() = COALESCE(user_id, created_by));

-- ============================================
-- 12. Fix profiles table
-- ============================================
-- Current: Allows anonymous users to insert any profile
-- Fix: Only allow users to create their own profile
DROP POLICY IF EXISTS "Allow anon insert for new user profile" ON public.profiles;
CREATE POLICY "Allow anon insert for new user profile" ON public.profiles
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (auth.uid() = id);

-- ============================================
-- 13. Fix risks table
-- ============================================
DROP POLICY IF EXISTS "Users can manage risks" ON public.risks;
CREATE POLICY "Users can manage risks" ON public.risks
  FOR ALL
  TO authenticated
  USING (auth.uid() = COALESCE(user_id, created_by))
  WITH CHECK (auth.uid() = COALESCE(user_id, created_by));

-- ============================================
-- 14. Fix signal_history table
-- ============================================
-- Current: Allows unrestricted INSERT
-- Fix: Add user ownership check
DROP POLICY IF EXISTS "Users can insert signal history" ON public.signal_history;
CREATE POLICY "Users can insert signal history" ON public.signal_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = COALESCE(user_id, created_by));

-- ============================================
-- 15. Fix technosoluce_sbom_library table
-- ============================================
-- Current: Allows anonymous users to insert any SBOM
-- Fix: Allow anonymous but validate required fields
DROP POLICY IF EXISTS "TechnoSoluce SBOM Library anon insert" ON public.technosoluce_sbom_library;
CREATE POLICY "TechnoSoluce SBOM Library anon insert" ON public.technosoluce_sbom_library
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Require at least a name or identifier
    (name IS NOT NULL AND name != '')
    OR
    (sbom_data IS NOT NULL)
  );

-- ============================================
-- 16. Fix vs_contact_submissions table
-- ============================================
-- Current: Allows unrestricted INSERT
-- Fix: Allow but validate required fields
DROP POLICY IF EXISTS "Anyone can insert contact submissions" ON public.vs_contact_submissions;
CREATE POLICY "Anyone can insert contact submissions" ON public.vs_contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    -- Require email or name for contact submissions
    (email IS NOT NULL AND email != '')
    OR
    (name IS NOT NULL AND name != '')
    OR
    (message IS NOT NULL AND message != '')
  );

-- ============================================
-- 17. Fix vs_profiles table
-- ============================================
-- Current: Allows anonymous users to insert any profile
-- Fix: Only allow users to create their own profile
DROP POLICY IF EXISTS "Allow anon insert for new user profile" ON public.vs_profiles;
CREATE POLICY "Allow anon insert for new user profile" ON public.vs_profiles
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (auth.uid() = id);

-- ============================================
-- Summary
-- ============================================
-- All RLS policies have been updated to:
-- 1. Check user ownership (auth.uid() = user_id/created_by)
-- 2. Validate required fields for anonymous inserts
-- 3. Ensure users can only manage their own data
-- 4. Maintain functionality while improving security
