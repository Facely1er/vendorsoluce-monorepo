// Test Supabase connection and check if tables exist
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://snrpdosiuwmdaegxkqux.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNucnBkb3NpdXdtZGFlZ3hrcXV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyMTA5MTYsImV4cCI6MjA3NDc4NjkxNn0.Vne8EVle_hZo3mywuaDyXoGvqzEfxDwM-UBXJSgs7aY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('Testing Supabase connection...');
  
  try {
    // Test basic connection
    const { data, error } = await supabase.from('vs_profiles').select('count').limit(1);
    
    if (error) {
      console.error('Connection error:', error);
      return;
    }
    
    console.log('✅ Supabase connection successful');
    
    // Test if vendor assessment tables exist
    const tables = [
      'vs_vendor_assessments',
      'vs_assessment_frameworks', 
      'vs_assessment_questions',
      'vs_assessment_responses',
      'vs_vendors'
    ];
    
    for (const table of tables) {
      try {
        const { data, error } = await supabase.from(table).select('count').limit(1);
        if (error) {
          console.log(`❌ Table ${table} does not exist or is not accessible:`, error.message);
        } else {
          console.log(`✅ Table ${table} exists and is accessible`);
        }
      } catch (err) {
        console.log(`❌ Table ${table} error:`, err.message);
      }
    }
    
  } catch (err) {
    console.error('Test failed:', err);
  }
}

testConnection();