# Set Vercel Environment Variables
# Run this script from the monorepo root directory

Write-Host "Setting Vercel environment variables..." -ForegroundColor Green
Write-Host ""

# Supabase Configuration
$SUPABASE_URL = "https://dfklqsdfycwjlcasfciu.supabase.co"
$SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRma2xxc2RmeWN3amxjYXNmY2l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzODA5OTcsImV4cCI6MjA3OTk1Njk5N30.OiaL5SkKnMlpdfW2Y2L-m2mzmCFA_LgpUq2-m8XF-yQ"

Write-Host "Setting VITE_SUPABASE_URL..." -ForegroundColor Yellow
Write-Host "Value: $SUPABASE_URL" -ForegroundColor Cyan
$SUPABASE_URL | vercel env add VITE_SUPABASE_URL production

Write-Host ""
Write-Host "Setting VITE_SUPABASE_ANON_KEY..." -ForegroundColor Yellow
$SUPABASE_ANON_KEY | vercel env add VITE_SUPABASE_ANON_KEY production

Write-Host ""
Write-Host "✓ Environment variables set!" -ForegroundColor Green
Write-Host "Vercel will automatically redeploy your application." -ForegroundColor Green
Write-Host ""
Write-Host "To verify, run: vercel env ls" -ForegroundColor Cyan
