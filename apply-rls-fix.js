// Node.js script to apply RLS policy fixes
// Run: node apply-rls-fix.js

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const connectionString = 'postgresql://postgres:K1551d0ug0u@db.dfklqsdfycwjlcasfciu.supabase.co:5432/postgres';
const sqlFile = path.join(__dirname, 'fix-rls-policies-safe.sql');

async function applyRLSFixes() {
  const client = new Client({
    connectionString: connectionString,
  });

  try {
    console.log('🔌 Connecting to database...');
    await client.connect();
    console.log('✅ Connected successfully\n');

    console.log('📖 Reading SQL file...');
    const sql = fs.readFileSync(sqlFile, 'utf8');
    console.log(`✅ Read ${sql.length} characters\n`);

    console.log('🔧 Applying RLS policy fixes...\n');
    await client.query(sql);
    
    console.log('✅ All RLS policies fixed successfully!\n');
    console.log('📋 Next steps:');
    console.log('   1. Verify fixes in Supabase Dashboard');
    console.log('   2. Run security linter again to confirm');
    console.log('   3. Test your application functionality\n');

  } catch (error) {
    console.error('❌ Error applying fixes:', error.message);
    console.error('\n💡 Alternative: Use Supabase Dashboard SQL Editor');
    console.error('   https://supabase.com/dashboard/project/dfklqsdfycwjlcasfciu/editor\n');
    process.exit(1);
  } finally {
    await client.end();
  }
}

// Check if pg module is installed
try {
  require('pg');
  applyRLSFixes();
} catch (error) {
  console.error('❌ PostgreSQL client (pg) not installed.');
  console.error('   Install it with: npm install pg\n');
  console.error('💡 Alternative: Use Supabase Dashboard SQL Editor');
  console.error('   https://supabase.com/dashboard/project/dfklqsdfycwjlcasfciu/editor\n');
  process.exit(1);
}
