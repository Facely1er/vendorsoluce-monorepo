-- Check which columns exist in the problematic tables
-- Run this first to understand your table structure

SELECT 
    table_schema,
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_schema IN ('public', 'cybercorrect')
  AND table_name IN (
    'data_subject_requests',
    'asset_import_batch',
    'business_functions',
    'business_impacts',
    'continuity_plans',
    'feedback_submissions',
    'framework_phases',
    'mitigation_actions',
    'nist_assessments',
    'nist_controls',
    'nist_mappings',
    'profiles',
    'risks',
    'signal_history',
    'technosoluce_sbom_library',
    'vs_contact_submissions',
    'vs_profiles'
  )
  AND column_name IN ('user_id', 'created_by', 'id', 'email', 'name', 'message', 'sbom_data', 'package_name')
ORDER BY table_schema, table_name, column_name;
