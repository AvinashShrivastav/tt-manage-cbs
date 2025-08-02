const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const generateTimetablePdf = async (timetableData) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Construct HTML content for the PDF
  let htmlContent = `
    <html>
    <head>
        <title>Timetable</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .header img { max-width: 100px; margin-bottom: 10px; }
            .header h1 { font-size: 24px; color: #003366; margin: 0; }
            .header p { font-size: 14px; color: #555; margin: 5px 0; }
            .timetable-info { margin-bottom: 20px; font-size: 16px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
            th { background-color: #f2f2f2; color: #333; }
            .footer { text-align: center; font-size: 12px; color: #888; }
        </style>
    </head>
    <body>
        <div class="header">
            <img src="data:image/png;base64,${fs.readFileSync(path.join(__dirname, '../../public/logo.png')).toString('base64')}" alt="College Logo">
            <h1>Shaheed Sukhdev College of Business Studies</h1>
            <p>University of Delhi</p>
            <p>Timetable for ${timetableData.course} ${timetableData.year} Year - Semester ${timetableData.semester} - Section ${timetableData.section}</p>
        </div>
        <div class="timetable-info">
            <p><strong>Course:</strong> ${timetableData.course}</p>
            <p><strong>Year:</strong> ${timetableData.year}</p>
            <p><strong>Semester:</strong> ${timetableData.semester}</p>
            <p><strong>Section:</strong> ${timetableData.section}</p>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                </tr>
            </thead>
            <tbody>
  `;

  const timeSlots = [
    "9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-1:00",
    "1:00-2:00", "2:00-3:00", "3:00-4:00", "4:00-5:00",
  ];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  timeSlots.forEach(timeSlot => {
    htmlContent += `<tr><td>${timeSlot}</td>`;
    days.forEach(day => {
      const entry = timetableData.entries.find(e => e.day === day && e.timeSlot === timeSlot);
      if (entry) {
        htmlContent += `<td>${entry.subject.name}<br/>${entry.faculty.name}<br/>${entry.room.name}</td>`;
      } else {
        htmlContent += `<td></td>`;
      }
    });
    htmlContent += `</tr>`;
  });

  htmlContent += `
            </tbody>
        </table>
        <div class="footer">
            <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>
    </body>
    </html>
  `;

  await page.setContent(htmlContent);
  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();
  return pdfBuffer;
};

module.exports = { generateTimetablePdf };
