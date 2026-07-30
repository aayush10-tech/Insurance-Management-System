import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/**
 * Generic PDF Export Utility
 *
 * @param {Object} options
 * @param {string} options.title - Title displayed in PDF
 * @param {Array} options.columns - Table headers
 * @param {Array} options.rows - Table data
 * @param {string} [options.fileName] - Output filename
 */
export const exportPdf = ({
  title,
  columns,
  rows,
  fileName = "report.pdf",
}) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.setTextColor(40);
  doc.text(title, 14, 20);

  // Generated date
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    28
  );

  // Table
  autoTable(doc, {
    startY: 35,
    head: [columns],
    body: rows,
    styles: {
      fontSize: 9,
      cellPadding: 3,
      overflow: "linebreak",
      valign: "middle",
    },
    headStyles: {
      fillColor: [37, 99, 235], // Blue
      textColor: 255,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
    margin: {
      left: 10,
      right: 10,
    },
  });

  doc.save(fileName);
};