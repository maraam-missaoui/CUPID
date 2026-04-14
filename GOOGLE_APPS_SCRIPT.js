// ============================================
// AMORÉ BOUTIQUE — GOOGLE APPS SCRIPT
// This code goes into Google Apps Script
// (script.google.com) — NOT your website files
// ============================================
// 
// SETUP STEPS:
// 1. Go to https://script.google.com
// 2. Create a new project named "Amore Orders"
// 3. Paste ALL of this code, replacing the default function
// 4. Change YOUR_EMAIL_HERE to your real email
// 5. Change YOUR_SHEET_ID to your Google Sheet ID
// 6. Click Deploy > New Deployment > Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 7. Copy the Web App URL
// 8. Paste that URL into checkout.js GOOGLE_SCRIPT_URL
// ============================================

const YOUR_EMAIL = 'YOUR_EMAIL_HERE'; // ← Change this to your email!
const SHEET_NAME = 'Orders';

function doPost(e) {
  try {
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch {
      data = e.parameter;
    }
    
    // 1. Save to Google Sheet
    saveToSheet(data);
    
    // 2. Send email notification to you
    sendOwnerEmail(data);
    
    // 3. Send confirmation email to customer
    if (data.email) {
      sendCustomerEmail(data);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error(err);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('AMORÉ Boutique order endpoint is running ✓')
    .setMimeType(ContentService.MimeType.TEXT);
}

function saveToSheet(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  // Create sheet with headers if it doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Order #',
      'Date & Time',
      'First Name',
      'Last Name',
      'Phone',
      'Email',
      'Town',
      'Address',
      'Items',
      'Item Count',
      'Subtotal',
      'Delivery Fee',
      'TOTAL',
      'Notes',
      'Status'
    ]);
    
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, 15);
    headerRange.setBackground('#c97088');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
    
    // Set column widths
    sheet.setColumnWidth(1, 80);
    sheet.setColumnWidth(2, 160);
    sheet.setColumnWidth(3, 100);
    sheet.setColumnWidth(4, 100);
    sheet.setColumnWidth(5, 120);
    sheet.setColumnWidth(6, 180);
    sheet.setColumnWidth(7, 120);
    sheet.setColumnWidth(8, 200);
    sheet.setColumnWidth(9, 300);
    sheet.setColumnWidth(13, 100);
    sheet.setColumnWidth(15, 100);
  }
  
  // Get next order number
  const lastRow = sheet.getLastRow();
  const orderNum = lastRow > 1 ? lastRow : 1;
  const orderRef = 'ORD-' + String(orderNum).padStart(4, '0');
  
  // Add order row
  sheet.appendRow([
    orderRef,
    data.timestamp || new Date().toLocaleString(),
    data.firstName || '',
    data.lastName || '',
    data.phone || '',
    data.email || '',
    data.town || '',
    data.address || '',
    data.items || '',
    data.itemCount || '',
    data.subtotal || '',
    data.deliveryFee || '8 DT',
    data.total || '',
    data.notes || '',
    'New 🆕'
  ]);
  
  // Highlight new row in light pink
  const newRow = sheet.getLastRow();
  sheet.getRange(newRow, 1, 1, 15).setBackground('#fdf0f3');
}

function sendOwnerEmail(data) {
  const subject = `🛍️ New Order! ${data.firstName} ${data.lastName} — ${data.total}`;
  
  const html = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#fff">
      <div style="background:linear-gradient(135deg,#c97088,#c9a96e);padding:32px;text-align:center">
        <h1 style="color:white;margin:0;font-size:28px;letter-spacing:4px">AMORÉ</h1>
        <p style="color:rgba(255,255,255,0.9);margin:8px 0 0;font-size:14px">New Order Received! 🎀</p>
      </div>
      
      <div style="padding:32px">
        <h2 style="color:#2a1a20;margin-bottom:24px">Order Details</h2>
        
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
          <tr style="background:#fdf0f3">
            <td style="padding:10px 14px;font-weight:bold;color:#6b4a55;font-size:13px;width:40%">Date</td>
            <td style="padding:10px 14px;color:#2a1a20;font-size:13px">${data.timestamp}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;font-weight:bold;color:#6b4a55;font-size:13px">Customer</td>
            <td style="padding:10px 14px;color:#2a1a20;font-size:13px">${data.firstName} ${data.lastName}</td>
          </tr>
          <tr style="background:#fdf0f3">
            <td style="padding:10px 14px;font-weight:bold;color:#6b4a55;font-size:13px">Phone</td>
            <td style="padding:10px 14px;color:#2a1a20;font-size:13px">${data.phone}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;font-weight:bold;color:#6b4a55;font-size:13px">Email</td>
            <td style="padding:10px 14px;color:#2a1a20;font-size:13px">${data.email}</td>
          </tr>
          <tr style="background:#fdf0f3">
            <td style="padding:10px 14px;font-weight:bold;color:#6b4a55;font-size:13px">Town</td>
            <td style="padding:10px 14px;color:#2a1a20;font-size:13px">${data.town}</td>
          </tr>
          <tr>
            <td style="padding:10px 14px;font-weight:bold;color:#6b4a55;font-size:13px">Address</td>
            <td style="padding:10px 14px;color:#2a1a20;font-size:13px">${data.address}</td>
          </tr>
          ${data.notes ? `
          <tr style="background:#fdf0f3">
            <td style="padding:10px 14px;font-weight:bold;color:#6b4a55;font-size:13px">Notes</td>
            <td style="padding:10px 14px;color:#2a1a20;font-size:13px">${data.notes}</td>
          </tr>` : ''}
        </table>
        
        <div style="background:#fdf0f3;border-radius:12px;padding:20px;margin-bottom:24px">
          <h3 style="margin:0 0 12px;color:#2a1a20;font-size:15px">Items Ordered</h3>
          <p style="margin:0;color:#6b4a55;font-size:14px;line-height:1.6">${data.items}</p>
        </div>
        
        <table style="width:100%;border-top:2px solid #f5c6d0;padding-top:16px">
          <tr>
            <td style="padding:6px 0;color:#6b4a55;font-size:14px">Subtotal</td>
            <td style="padding:6px 0;color:#2a1a20;font-size:14px;text-align:right">${data.subtotal}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;color:#6b4a55;font-size:14px">Delivery</td>
            <td style="padding:6px 0;color:#2a1a20;font-size:14px;text-align:right">8 DT</td>
          </tr>
          <tr>
            <td style="padding:10px 0 6px;font-weight:bold;color:#2a1a20;font-size:16px;border-top:1px solid #f5c6d0">TOTAL TO COLLECT</td>
            <td style="padding:10px 0 6px;font-weight:bold;color:#c97088;font-size:18px;text-align:right;border-top:1px solid #f5c6d0">${data.total}</td>
          </tr>
        </table>
        
        <div style="margin-top:24px;padding:16px;background:#fff3e0;border-radius:10px;text-align:center">
          <p style="margin:0;color:#c97088;font-size:13px">💵 Collect <strong>${data.total}</strong> in cash upon delivery to ${data.firstName} in ${data.town}</p>
        </div>
      </div>
      
      <div style="background:#2a1a20;padding:20px;text-align:center">
        <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0">AMORÉ Boutique — Order Management System</p>
      </div>
    </div>
  `;
  
  GmailApp.sendEmail(YOUR_EMAIL, subject, '', { htmlBody: html });
}

function sendCustomerEmail(data) {
  const subject = `Your AMORÉ order is confirmed! 🎀`;
  
  const html = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;background:#fff">
      <div style="background:linear-gradient(135deg,#c97088,#c9a96e);padding:32px;text-align:center">
        <h1 style="color:white;margin:0;font-size:28px;letter-spacing:4px">AMORÉ</h1>
        <p style="color:rgba(255,255,255,0.9);margin:8px 0 0;font-size:14px">boutique</p>
      </div>
      
      <div style="padding:40px;text-align:center">
        <div style="font-size:48px;margin-bottom:16px">🎀</div>
        <h2 style="color:#2a1a20;font-size:24px;margin-bottom:8px">Your order is confirmed!</h2>
        <p style="color:#6b4a55;font-size:15px;margin-bottom:32px">Thank you so much, <strong>${data.firstName}</strong>! We're so excited to get your package ready 💌</p>
        
        <div style="background:#fdf0f3;border-radius:12px;padding:24px;text-align:left;margin-bottom:24px">
          <h3 style="color:#c97088;margin:0 0 16px;font-size:14px;text-transform:uppercase;letter-spacing:2px">Your Items</h3>
          <p style="color:#6b4a55;font-size:14px;line-height:1.7;margin:0">${data.items}</p>
        </div>
        
        <div style="border:2px solid #f5c6d0;border-radius:12px;padding:20px;margin-bottom:24px">
          <p style="margin:0 0 8px;color:#6b4a55;font-size:14px">Total to pay on delivery:</p>
          <p style="margin:0;font-size:28px;font-weight:bold;color:#c97088">${data.total}</p>
          <p style="margin:8px 0 0;color:#a07080;font-size:12px">Including 8 DT delivery fee. Pay in cash when your package arrives!</p>
        </div>
        
        <div style="background:#f8f8f8;border-radius:12px;padding:20px;text-align:left">
          <h4 style="color:#2a1a20;margin:0 0 12px;font-size:13px">Delivery to:</h4>
          <p style="color:#6b4a55;font-size:14px;margin:0;line-height:1.6">
            ${data.firstName} ${data.lastName}<br>
            ${data.address}<br>
            ${data.town}<br>
            📱 ${data.phone}
          </p>
        </div>
        
        <p style="color:#a07080;font-size:13px;margin-top:24px;line-height:1.6">
          We'll contact you on <strong>${data.phone}</strong> to confirm your delivery details.<br>
          Questions? DM us on Instagram @amoreboutique.tn 💌
        </p>
      </div>
      
      <div style="background:#2a1a20;padding:20px;text-align:center">
        <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0">© 2025 AMORÉ Boutique · Made with ♡ in Tunisia</p>
      </div>
    </div>
  `;
  
  GmailApp.sendEmail(data.email, subject, '', { htmlBody: html });
}
