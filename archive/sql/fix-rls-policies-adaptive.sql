-- Adaptive RLS Policy Fixes
-- This script checks for column existence before applying policies
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/dfklqsdfycwjlcasfciu/editor

-- ============================================
-- Helper function to check if column exists
-- ============================================
DO $$
DECLARE
    col_exists boolean;
BEGIN
    -- ============================================
    -- 1. Fix data_subject_requests table
    -- ============================================
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'cybercorrect' 
        AND table_name = 'data_subject_requests' 
        AND column_name = 'user_id'
    ) INTO col_exists;
    
    DROP POLICY IF EXISTS "Users can insert data subject requests" ON cybercorrect.data_subject_requests;
    
    IF col_exists THEN
        CREATE POLICY "Users can insert data subject requests" ON cybercorrect.data_subject_requests
          FOR INSERT TO authenticated
          WITH CHECK (auth.uid() = user_id);
    ELSE
        -- Fallback: just require authentication
        CREATE POLICY "Users can insert data subject requests" ON cybercorrect.data_subject_requests
          FOR INSERT TO authenticated
          WITH CHECK (auth.uid() IS NOT NULL);
    END IF;

    -- ============================================
    -- 2. Fix asset_import_batch table
    -- ============================================
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'asset_import_batch' 
        AND column_name IN ('user_id', 'created_by')
    ) INTO col_exists;
    
    DROP POLICY IF EXISTS "Users can create import batches" ON public.asset_import_batch;
    
    IF col_exists THEN
        CREATE POLICY "Users can create import batches" ON public.asset_import_batch
          FOR INSERT TO authenticated
          WITH CHECK (auth.uid() = COALESCE(user_id, created_by));
    ELSE
        CREATE POLICY "Users can create import batches" ON public.asset_import_batch
          FOR INSERT TO authenticated
          WITH CHECK (auth.uid() IS NOT NULL);
    END IF;

    -- ============================================
    -- 3. Fix business_functions table
    -- ============================================
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'business_functions' 
        AND column_name IN ('user_id', 'created_by')
    ) INTO col_exists;
    
    DROP POLICY IF EXISTS "Users can manage business functions" ON public.business_functions;
    
    IF col_exists THEN
        CREATE POLICY "Users can manage business functions" ON public.business_functions
          FOR ALL TO authenticated
          USING (auth.uid() = COALESCE(user_id, created_by))
          WITH CHECK (auth.uid() = COALESCE(user_id, created_by));
    ELSE
        -- For tables without user columns, at least require authentication
        CREATE POLICY "Users can manage business functions" ON public.business_functions
          FOR ALL TO authenticated
          USING (true)
          WITH CHECK (true);
    END IF;

    -- ============================================
    -- 4. Fix business_impacts table
    -- ============================================
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'business_impacts' 
        AND column_name IN ('user_id', 'created_by')
    ) INTO col_exists;
    
    DROP POLICY IF EXISTS "Users can manage business impacts" ON public.business_impacts;
    
    IF col_exists THEN
        CREATE POLICY "Users can manage business impacts" ON public.business_impacts
          FOR ALL TO authenticated
          USING (auth.uid() = COALESCE(user_id, created_by))
          WITH CHECK (auth.uid() = COALESCE(user_id, created_by));
    ELSE
        CREATE POLICY "Users can manage business impacts" ON public.business_impacts
          FOR ALL TO authenticated
          USING (true)
          WITH CHECK (true);
    END IF;

    -- ============================================
    -- 5. Fix continuity_plans table
    -- ============================================
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'continuity_plans' 
        AND column_name IN ('user_id', 'created_by')
    ) INTO col_exists;
    
    DROP POLICY IF EXISTS "Users can manage continuity plans" ON public.continuity_plans;
    
    IF col_exists THEN
        CREATE POLICY "Users can manage continuity plans" ON public.continuity_plans
          FOR ALL TO authenticated
          USING (auth.uid() = COALESCE(user_id, created_by))
          WITH CHECK (auth.uid() = COALESCE(user_id, created_by));
    ELSE
        CREATE POLICY "Users can manage continuity plans" ON public.continuity_plans
          FOR ALL TO authenticated
          USING (true)
          WITH CHECK (true);
    END IF;

    -- ============================================
    -- 6. Fix feedback_submissions table
    -- ============================================
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'feedback_submissions' 
        AND column_name = 'user_id'
    ) INTO col_exists;
    
    DROP POLICY IF EXISTS "Users can insert their own feedback" ON public.feedback_submissions;
    
    IF col_exists THEN
        CREATE POLICY "Users can insert their own feedback" ON public.feedback_submissions
          FOR INSERT TO anon, authenticated
          WITH CHECK (
            (auth.role() = 'anon' AND (email IS NOT NULL AND email != ''))
            OR
            (auth.role() = 'authenticated' AND auth.uid() = COALESCE(user_id, auth.uid()))
          );
    ELSE
        CREATE POLICY "Users can insert their own feedback" ON public.feedback_submissions
          FOR INSERT TO anon, authenticated
          WITH CHECK (
            (auth.role() = 'anon' AND (email IS NOT NULL AND email != ''))
            OR
            (auth.role() = 'authenticated')
          );
    END IF;

    -- ============================================
    -- 7. Fix framework_phases table
    -- ============================================
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'framework_phases' 
        AND column_name IN ('user_id', 'created_by')
    ) INTO col_exists;
    
    DROP POLICY IF EXISTS "Users can manage framework phases" ON public.framework_phases;
    
    IF col_exists THEN
        CREATE POLICY "Users can manage framework phases" ON public.framework_phases
          FOR ALL TO authenticated
          USING (auth.uid() = COALESCE(user_id, created_by))
          WITH CHECK (auth.uid() = COALESCE(user_id, created_by));
    ELSE
        CREATE POLICY "Users can manage framework phases" ON public.framework_phases
          FOR ALL TO authenticated
          USING (true)
          WITH CHECK (true);
    END IF;

    -- ============================================
    -- 8. Fix mitigation_actions table
    -- ============================================
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'mitigation_actions' 
        AND column_name IN ('user_id', 'created_by')
    ) INTO col_exists;
    
    DROP POLICY IF EXISTS "Users can manage mitigation actions" ON public.mitigation_actions;
    
    IF col_exists THEN
        CREATE POLICY "Users can manage mitigation actions" ON public.mitigation_actions
          FOR ALL TO authenticated
          USING (auth.uid() = COALESCE(user_id, created_by))
          WITH CHECK (auth.uid() = COALESCE(user_id, created_by));
    ELSE
        CREATE POLICY "Users can manage mitigation actions" ON public.mitigation_actions
          FOR ALL TO authenticated
          USING (true)
          WITH CHECK (true);
    END IF;

    -- ============================================
    -- 9. Fix nist_assessments table
    -- ============================================
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'nist_assessments' 
        AND column_name IN ('user_id', 'created_by')
    ) INTO col_exists;
    
    DROP POLICY IF EXISTS "Users can manage nist assessments" ON public.nist_assessments;
    
    IF col_exists THEN
        CREATE POLICY "Users can manage nist assessments" ON public.nist_assessments
          FOR ALL TO authenticated
          USING (auth.uid() = COALESCE(user_id, created_by))
          WITH CHECK (auth.uid() = COALESCE(user_id, created_by));
    ELSE
        CREATE POLICY "Users can manage nist assessments" ON public.nist_assessments
          FOR ALL TO authenticated
          USING (true)
          WITH CHECK (true);
    END IF;

    -- ============================================
    -- 10. Fix nist_controls table
    -- ============================================
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'nist_controls' 
        AND column_name IN ('user_id', 'created_by')
    ) INTO col_exists;
    
    DROP POLICY IF EXISTS "Users can manage nist controls" ON public.nist_controls;
    
    IF col_exists THEN
        CREATE POLICY "Users can manage nist controls" ON public.nist_controls
          FOR ALL TO authenticated
          USING (auth.uid() = COALESCE(user_id, created_by))
          WITH CHECK (auth.uid() = COALESCE(user_id, created_by));
    ELSE
        CREATE POLICY "Users can manage nist controls" ON public.nist_controls
          FOR ALL TO authenticated
          USING (true)
          WITH CHECK (true);
    END IF;

    -- ============================================
    -- 11. Fix nist_mappings table
    -- ============================================
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'nist_mappings' 
        AND column_name IN ('user_id', 'created_by')
    ) INTO col_exists;
    
    DROP POLICY IF EXISTS "Users can manage nist mappings" ON public.nist_mappings;
    
    IF col_exists THEN
        CREATE POLICY "Users can manage nist mappings" ON public.nist_mappings
          FOR ALL TO authenticated
          USING (auth.uid() = COALESCE(user_id, created_by))
          WITH CHECK (auth.uid() = COALESCE(user_id, created_by));
    ELSE
        CREATE POLICY "Users can manage nist mappings" ON public.nist_mappings
          FOR ALL TO authenticated
          USING (true)
          WITH CHECK (true);
    END IF;

    -- ============================================
    -- 12. Fix profiles table
    -- ============================================
    DROP POLICY IF EXISTS "Allow anon insert for new user profile" ON public.profiles;
    CREATE POLICY "Allow anon insert for new user profile" ON public.profiles
      FOR INSERT TO anon, authenticated
      WITH CHECK (auth.uid() = id);

    -- ============================================
    -- 13. Fix risks table
    -- ============================================
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'risks' 
        AND column_name IN ('user_id', 'created_by')
    ) INTO col_exists;
    
    DROP POLICY IF EXISTS "Users can manage risks" ON public.risks;
    
    IF col_exists THEN
        CREATE POLICY "Users can manage risks" ON public.risks
          FOR ALL TO authenticated
          USING (auth.uid() = COALESCE(user_id, created_by))
          WITH CHECK (auth.uid() = COALESCE(user_id, created_by));
    ELSE
        CREATE POLICY "Users can manage risks" ON public.risks
          FOR ALL TO authenticated
          USING (true)
          WITH CHECK (true);
    END IF;

    -- ============================================
    -- 14. Fix signal_history table
    -- ============================================
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'signal_history' 
        AND column_name IN ('user_id', 'created_by')
    ) INTO col_exists;
    
    DROP POLICY IF EXISTS "Users can insert signal history" ON public.signal_history;
    
    IF col_exists THEN
        CREATE POLICY "Users can insert signal history" ON public.signal_history
          FOR INSERT TO authenticated
          WITH CHECK (auth.uid() = COALESCE(user_id, created_by));
    ELSE
        CREATE POLICY "Users can insert signal history" ON public.signal_history
          FOR INSERT TO authenticated
          WITH CHECK (auth.uid() IS NOT NULL);
    END IF;

    -- ============================================
    -- 15. Fix technosoluce_sbom_library table
    -- ============================================
    DROP POLICY IF EXISTS "TechnoSoluce SBOM Library anon insert" ON public.technosoluce_sbom_library;
    CREATE POLICY "TechnoSoluce SBOM Library anon insert" ON public.technosoluce_sbom_library
      FOR INSERT TO anon, authenticated
      WITH CHECK (
        -- Require at least one identifying field
        (name IS NOT NULL AND name != '')
        OR
        (sbom_data IS NOT NULL)
        OR
        (package_name IS NOT NULL)
      );

    -- ============================================
    -- 16. Fix vs_contact_submissions table
    -- ============================================
    DROP POLICY IF EXISTS "Anyone can insert contact submissions" ON public.vs_contact_submissions;
    CREATE POLICY "Anyone can insert contact submissions" ON public.vs_contact_submissions
      FOR INSERT TO anon, authenticated
      WITH CHECK (
        -- Require at least one contact field
        (email IS NOT NULL AND email != '')
        OR
        (name IS NOT NULL AND name != '')
        OR
        (message IS NOT NULL AND message != '')
      );

    -- ============================================
    -- 17. Fix vs_profiles table
    -- ============================================
    DROP POLICY IF EXISTS "Allow anon insert for new user profile" ON public.vs_profiles;
    CREATE POLICY "Allow anon insert for new user profile" ON public.vs_profiles
      FOR INSERT TO anon, authenticated
      WITH CHECK (auth.uid() = id);

END $$;

-- ============================================
-- Summary
-- ============================================
-- All RLS policies have been updated:
-- - Tables with user_id/created_by: Now check ownership
-- - Tables without user columns: At least require authentication
-- - Anonymous inserts: Require validation of required fields
-- - Profile tables: Require auth.uid() = id match
