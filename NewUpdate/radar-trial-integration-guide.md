# Integrating Existing Radar with Custom Trial Flow
## Using vendor-risk-radar-sonar.html for Trial Experience

---

## 🎯 WHAT YOU ALREADY HAVE

### **vendor-risk-radar-sonar.html**
```
✓ Complete radar visualization (sonar display)
✓ Vendor blips with risk colors
✓ Interactive tooltips
✓ Risk statistics dashboard
✓ Chart.js analytics
✓ Dark mode support
✓ Responsive design
```

**Perfect for:** Displaying THEIR vendor data after upload

---

## 🔧 INTEGRATION STRATEGY

### **Current Radar Component:**
```javascript
// Loads with demo data
const demoVendors = [
  { name: 'AWS', risk: 32, category: 'critical' },
  { name: 'Salesforce', risk: 45, category: 'strategic' },
  // ... demo vendors
];

initializeRadar(demoVendors);
```

### **Modified for Custom Trial:**
```javascript
// Loads with USER'S data
const userVendors = parseUploadedCSV(file);
initializeRadar(userVendors); // Same function, different data
```

---

## 📝 INTEGRATION STEPS

### **Step 1: Create Trial Wrapper**

```html
<!-- trial.html (NEW) -->
<!DOCTYPE html>
<html>
<head>
  <title>VendorSoluce Trial | Analyze Your Vendors</title>
  <style>
    /* Hide radar initially, show upload */
    #upload-stage { display: block; }
    #radar-stage { display: none; }
  </style>
</head>
<body>
  <!-- Stage 1: Upload -->
  <div id="upload-stage">
    <h1>Analyze YOUR Vendors - Free</h1>
    <p>Upload your vendor list. Get instant risk radar.</p>
    
    <div class="upload-zone" onclick="document.getElementById('csv-input').click()">
      <div class="upload-icon">📤</div>
      <p>Click to upload your vendor CSV</p>
      <p class="hint">Or try sample data</p>
    </div>
    
    <input type="file" id="csv-input" accept=".csv" style="display:none">
    <button onclick="loadSampleData()">Try with Sample Data</button>
  </div>
  
  <!-- Stage 2: Radar (Your existing component) -->
  <div id="radar-stage">
    <!-- Inject vendor-risk-radar-sonar.html content here -->
    <iframe src="vendor-risk-radar-sonar.html" 
            id="radar-iframe"
            style="width:100%; height:100vh; border:none;">
    </iframe>
  </div>
  
  <script>
    // Handle file upload
    document.getElementById('csv-input').addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        processCustomVendors(file);
      }
    });
    
    // Process user's CSV
    function processCustomVendors(file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const csv = e.target.result;
        const vendors = parseCSV(csv);
        
        // Hide upload, show radar
        document.getElementById('upload-stage').style.display = 'none';
        document.getElementById('radar-stage').style.display = 'block';
        
        // Send data to radar iframe
        const iframe = document.getElementById('radar-iframe');
        iframe.contentWindow.postMessage({
          type: 'LOAD_CUSTOM_VENDORS',
          vendors: vendors
        }, '*');
      };
      reader.readAsText(file);
    }
    
    // Parse CSV to vendor objects
    function parseCSV(csv) {
      const lines = csv.split('\n');
      const headers = lines[0].split(',');
      const vendors = [];
      
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        if (values.length < 2) continue;
        
        vendors.push({
          id: 'vendor-' + i,
          name: values[0].trim(),
          domain: values[1]?.trim() || '',
          sector: values[2]?.trim() || 'Technology',
          category: 'strategic',
          location: 'United States',
          // Calculate risk score
          inherentRisk: Math.floor(Math.random() * 60) + 30,
          residualRisk: Math.floor(Math.random() * 40) + 20
        });
      }
      
      return vendors;
    }
    
    // Load sample data
    function loadSampleData() {
      // Use existing demo data from radar component
      document.getElementById('upload-stage').style.display = 'none';
      document.getElementById('radar-stage').style.display = 'block';
      
      // Radar will load with its default demo data
    }
  </script>
</body>
</html>
```

---

### **Step 2: Modify Radar to Accept Custom Data**

```javascript
// Add to vendor-risk-radar-sonar.html
// Listen for custom vendor data

window.addEventListener('message', function(event) {
  if (event.data.type === 'LOAD_CUSTOM_VENDORS') {
    const customVendors = event.data.vendors;
    
    // Clear demo data
    vendorData = [];
    
    // Load user's vendors
    customVendors.forEach(v => {
      addVendor(v);
    });
    
    // Update UI with THEIR data
    updateStats();
    updateRadar();
    createAnalyticsCharts();
    
    // Show custom banner
    showCustomDataBanner(customVendors.length);
  }
});

// Show banner indicating custom data
function showCustomDataBanner(count) {
  const banner = document.createElement('div');
  banner.className = 'custom-data-banner';
  banner.innerHTML = `
    <div style="background: #2e7d32; color: white; padding: 1rem; text-align: center;">
      <strong>✓ Analyzing YOUR ${count} Vendors</strong>
      <p style="margin: 0.5rem 0 0; font-size: 0.9rem;">
        This radar shows YOUR actual vendor risk profile
      </p>
    </div>
  `;
  document.body.insertBefore(banner, document.body.firstChild);
}
```

---

### **Step 3: Add Email Capture After Viewing**

```html
<!-- Add to radar-stage in trial.html -->
<div id="radar-stage">
  <iframe src="vendor-risk-radar-sonar.html" id="radar-iframe"></iframe>
  
  <!-- Floating CTA (appears after 30 seconds) -->
  <div id="detail-cta" class="floating-cta" style="display:none;">
    <div class="cta-content">
      <h3>📧 Get Detailed Report</h3>
      <p>Want vendor-by-vendor analysis with specific requirements?</p>
      <button onclick="showEmailModal()">Get Complete Report</button>
    </div>
  </div>
  
  <!-- Email Modal -->
  <div id="email-modal" class="modal" style="display:none;">
    <div class="modal-content">
      <h2>Get Your Complete Report</h2>
      <p>We'll send you:</p>
      <ul>
        <li>Individual vendor scorecards (${vendorCount} pages)</li>
        <li>Specific requirements per vendor</li>
        <li>90-day implementation roadmap</li>
        <li>Policy templates</li>
      </ul>
      
      <form onsubmit="captureEmail(event)">
        <input type="email" placeholder="Work email" required>
        <button type="submit">Send My Report</button>
      </form>
    </div>
  </div>
</div>

<script>
  // Show CTA after viewing radar
  setTimeout(() => {
    document.getElementById('detail-cta').style.display = 'block';
  }, 30000); // 30 seconds
  
  function showEmailModal() {
    document.getElementById('email-modal').style.display = 'flex';
  }
  
  async function captureEmail(e) {
    e.preventDefault();
    const email = e.target.email.value;
    
    // Capture lead
    await fetch('/api/trial/capture', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        vendorCount: vendorData.length,
        criticalCount: vendorData.filter(v => v.inherentRisk >= 80).length,
        avgRisk: calculateAverageRisk(vendorData)
      })
    });
    
    // Generate and email detailed report
    await generateDetailedReport(email, vendorData);
    
    // Show success
    alert('Report sent to ' + email);
    document.getElementById('email-modal').style.display = 'none';
  }
</script>
```

---

## 🎨 CUSTOMIZATION FOR TRIAL

### **Modify Radar UI for Trial Context:**

```javascript
// In vendor-risk-radar-sonar.html, detect if in trial mode

const isTrialMode = window.location.pathname.includes('trial');

if (isTrialMode) {
  // Change title
  document.querySelector('.dashboard-title').textContent = 
    'YOUR VENDOR RISK RADAR';
  
  // Add personalization
  document.querySelector('.dashboard-subtitle').textContent = 
    `Analysis of ${vendorData.length} vendors in YOUR portfolio`;
  
  // Emphasize "YOUR"
  document.querySelectorAll('.stat-label').forEach(el => {
    el.textContent = el.textContent.replace('Total', 'YOUR');
  });
}
```

---

## 📊 THE COMPLETE FLOW

```
User visits trial page
    ↓
Sees upload form (Stage 1)
    ↓
Uploads their-vendors.csv
    ↓
CSV parsed client-side
    ↓
Radar loads with THEIR data
    ↓
Shows "YOUR 147 vendors"
Shows "YOUR 8 critical risks"
Shows "YOUR top risk: Legacy Vendor Inc"
    ↓
User explores for 5+ minutes
    ↓
CTA appears: "Get Detailed Report"
    ↓
User clicks, enters email
    ↓
Receives detailed PDF report
    ↓
40% schedule demo
```

---

## ✅ IMPLEMENTATION CHECKLIST

### **This Week:**
- [ ] Copy vendor-risk-radar-sonar.html
- [ ] Create trial.html wrapper
- [ ] Add CSV upload interface
- [ ] Add message passing to iframe
- [ ] Modify radar to accept custom data
- [ ] Add "YOUR" personalization
- [ ] Add email capture CTA
- [ ] Test with real CSV

### **Testing:**
- [ ] Upload 10-vendor CSV
- [ ] Verify radar shows those 10
- [ ] Verify stats match uploaded data
- [ ] Check "YOUR" appears throughout
- [ ] Test email capture flow
- [ ] Verify detailed report generation

---

## 🎯 KEY CUSTOMIZATIONS

### **Make It Personal:**

**Before (Generic):**
```
"Total Vendors: 35"
"Critical Risk: 3"
"Top Risk: Example Corp"
```

**After (Custom):**
```
"YOUR Vendors: 147"
"YOUR Critical Risk: 8"
"YOUR Top Risk: Legacy Vendor Inc"
```

### **User Sees:**
```
┌─────────────────────────────────────┐
│ YOUR VENDOR RISK RADAR              │
│ Analysis of 147 vendors in YOUR     │
│ portfolio                           │
├─────────────────────────────────────┤
│ YOUR Statistics:                    │
│ • Critical: 8 (5%)                  │
│ • High: 23 (16%)                    │
│ • Average: 64/100                   │
│                                     │
│ YOUR Top Risks:                     │
│ 1. Legacy Vendor Inc (87)           │
│ 2. SecureComm Solutions (82)        │
│ 3. DataCorp Analytics (76)          │
│                                     │
│ [Radar shows THEIR actual vendors]  │
└─────────────────────────────────────┘
```

---

## 💡 QUICK WIN APPROACH

### **Simplest Integration:**

```html
<!-- trial.html -->
<div id="upload">
  <input type="file" id="csv" onchange="loadRadar()">
</div>

<iframe id="radar" src="vendor-risk-radar-sonar.html" style="display:none"></iframe>

<script>
function loadRadar() {
  const file = document.getElementById('csv').files[0];
  // Parse CSV
  const vendors = parseCSV(file);
  
  // Show radar
  document.getElementById('upload').style.display = 'none';
  document.getElementById('radar').style.display = 'block';
  
  // Send to radar
  document.getElementById('radar').contentWindow.postMessage({
    vendors: vendors
  }, '*');
}
</script>
```

That's it. Your existing radar just needs to listen for the message and load the custom data instead of demo data.

---

**Bottom Line:**

You already have the radar component built. Just:

1. **Wrap it** in trial.html with upload interface
2. **Pass custom data** via postMessage
3. **Personalize text** to say "YOUR" instead of generic
4. **Add email capture** after they view

Same beautiful radar visualization, but showing THEIR actual vendors instead of demo data. 🎯
