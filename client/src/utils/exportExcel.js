import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/**
 * Generic Excel Export Utility
 *
 * @param {Object} options
 * @param {string} options.fileName
 * @param {Array<Object>} options.data
 * @param {Object} options.columnMapping
 */
export const exportExcel = ({
  fileName = "report",
  data = [],
  columnMapping = {},
}) => {
  const formattedData = data.map((item) => {
    const row = {};

    Object.entries(columnMapping).forEach(([header, key]) => {
      if (typeof key === "function") {
        row[header] = key(item);
      } else {
        row[header] = item[key];
      }
    });

    return row;
  });

  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(file, `${fileName}.xlsx`);
};