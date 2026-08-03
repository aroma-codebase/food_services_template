const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const pageStyle = 'width:794px;height:1123px;margin:0;padding:0;background:#ffffff;overflow:hidden;';
const pdfRootStyle = 'width:794px;height:1123px;padding:28px;background:#ffffff;color:#1f2937;font-family:Arial,Helvetica,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact;overflow:hidden;';
const sheetStyle = 'height:100%;border:1px solid #fed7aa;border-radius:30px;background:radial-gradient(circle at top right, rgba(251, 146, 60, 0.14), transparent 26%),linear-gradient(180deg, #fffdfa 0%, #ffffff 38%, #fffaf5 100%);padding:24px;overflow:hidden;';

const labelStyle = 'margin:0;color:#94a3b8;font-size:10px;font-weight:800;letter-spacing:0.3em;text-transform:uppercase;';
const valueStyle = 'margin:8px 0 0;font-size:18px;font-weight:800;line-height:1.2;color:#0f172a;word-break:break-word;';
const noteStyle = 'margin:5px 0 0;color:#64748b;font-size:11px;line-height:1.45;word-break:break-word;';

export const buildEnquiryPdfHtml = ({
  packageTitle,
  packageLabel,
  guestCount,
  budgetRange,
  fullName,
  email,
  phone,
  notes,
}) => {
  const submittedAt = new Date().toLocaleString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="${pageStyle}">
        <div style="${pdfRootStyle}">
          <main style="${sheetStyle}">
            <table style="width:100%;height:100%;border-collapse:collapse;table-layout:fixed;">
              <tr>
                <td colspan="2" style="padding:0 0 18px 0;border-bottom:1px solid #e2e8f0;vertical-align:top;">
                  <table style="width:100%;border-collapse:collapse;">
                    <tr>
                      <td style="vertical-align:top;padding-right:16px;">
                        <p style="margin:0;color:#f97316;font-size:10px;font-weight:800;letter-spacing:0.38em;text-transform:uppercase;">Sri Annapoorna</p>
                        <h1 style="margin:10px 0 6px;font-family:Georgia,'Times New Roman',serif;font-size:27px;line-height:1.05;color:#111827;">Catering Enquiry PDF</h1>
                        <p style="margin:0;max-width:360px;color:#64748b;font-size:12px;line-height:1.5;">Clean booking summary generated from your selected package and contact details.</p>
                      </td>
                      <td style="width:156px;vertical-align:top;">
                        <div style="border-radius:16px;background:linear-gradient(180deg, #fff7ed 0%, #ffedd5 100%);padding:12px 14px;text-align:right;border:1px solid rgba(249, 115, 22, 0.15);">
                          <p style="${labelStyle}">Status</p>
                          <p style="margin:5px 0 0;color:#ea580c;font-size:14px;font-weight:700;">Enquiry booked</p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td colspan="2" style="padding:18px 0 0 0;vertical-align:top;">
                  <table style="width:100%;border-collapse:separate;border-spacing:12px;table-layout:fixed;">
                    <tr>
                      <td style="width:50%;vertical-align:top;">
                        <div style="border-radius:20px;background:linear-gradient(180deg, #ffffff 0%, #fffaf4 100%);padding:16px;border:1px solid #e2e8f0;box-shadow:0 8px 26px rgba(15, 23, 42, 0.04);min-height:102px;">
                          <p style="${labelStyle}">Package</p>
                          <p style="${valueStyle}">${escapeHtml(packageTitle)}</p>
                          <p style="${noteStyle}">${escapeHtml(packageLabel)} per head</p>
                        </div>
                      </td>
                      <td style="width:50%;vertical-align:top;">
                        <div style="border-radius:20px;background:linear-gradient(180deg, #ffffff 0%, #fffaf4 100%);padding:16px;border:1px solid #e2e8f0;box-shadow:0 8px 26px rgba(15, 23, 42, 0.04);min-height:102px;">
                          <p style="${labelStyle}">Guests</p>
                          <p style="${valueStyle}">${escapeHtml(guestCount)}</p>
                          <p style="${noteStyle}">Estimated for your event size</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="width:50%;vertical-align:top;">
                        <div style="border-radius:20px;background:linear-gradient(180deg, #ffffff 0%, #fffaf4 100%);padding:16px;border:1px solid #e2e8f0;box-shadow:0 8px 26px rgba(15, 23, 42, 0.04);min-height:102px;">
                          <p style="${labelStyle}">Budget</p>
                          <p style="${valueStyle}">${escapeHtml(budgetRange)}</p>
                          <p style="${noteStyle}">Approximate range for this package</p>
                        </div>
                      </td>
                      <td style="width:50%;vertical-align:top;">
                        <div style="border-radius:20px;background:linear-gradient(180deg, #ffffff 0%, #fffaf4 100%);padding:16px;border:1px solid #e2e8f0;box-shadow:0 8px 26px rgba(15, 23, 42, 0.04);min-height:102px;">
                          <p style="${labelStyle}">Submitted by</p>
                          <p style="${valueStyle}">${escapeHtml(fullName || 'Guest')}</p>
                          <p style="${noteStyle}">${escapeHtml(email)}</p>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td colspan="2" style="padding:14px 0 0 0;vertical-align:top;">
                  <div style="border:1px solid #e2e8f0;border-radius:20px;padding:14px 16px;background:rgba(255,255,255,0.92);">
                    <p style="${labelStyle}">Contact</p>
                    <table style="width:100%;border-collapse:collapse;margin-top:10px;">
                      <tr>
                        <td style="width:50%;vertical-align:top;padding-right:10px;">
                          <p style="${labelStyle}">Mobile</p>
                          <p style="margin:5px 0 0;font-size:12px;font-weight:700;color:#0f172a;line-height:1.45;word-break:break-word;">${escapeHtml(phone)}</p>
                        </td>
                        <td style="width:50%;vertical-align:top;padding-left:10px;">
                          <p style="${labelStyle}">Email</p>
                          <p style="margin:5px 0 0;font-size:12px;font-weight:700;color:#0f172a;line-height:1.45;word-break:break-word;">${escapeHtml(email)}</p>
                        </td>
                      </tr>
                    </table>
                  </div>
                </td>
              </tr>

              <tr>
                <td colspan="2" style="padding:14px 0 0 0;vertical-align:top;">
                  <div style="border-radius:20px;background:linear-gradient(180deg, #fff7ed 0%, #ffffff 100%);border:1px solid #e2e8f0;padding:14px 16px;min-height:218px;">
                    <p style="${labelStyle}">Notes</p>
                    <p style="margin:8px 0 0;color:#334155;font-size:12px;line-height:1.55;white-space:pre-wrap;word-break:break-word;max-height:166px;overflow:hidden;">${escapeHtml(notes || 'No notes provided.')}</p>
                  </div>
                </td>
              </tr>

              <tr>
                <td colspan="2" style="padding-top:12px;vertical-align:bottom;">
                  <table style="width:100%;border-collapse:collapse;border-top:1px solid #e2e8f0;padding-top:12px;">
                    <tr>
                      <td style="font-size:10px;line-height:1.5;color:#94a3b8;">Generated from the Sri Annapoorna booking flow.</td>
                      <td style="text-align:right;font-size:10px;line-height:1.5;color:#f97316;font-weight:700;">${submittedAt}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </main>
        </div>
      </body>
    </html>
  `;
};
