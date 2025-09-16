// 代码生成时间: 2025-09-16 14:57:37
import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';

@Injectable({
  providedIn: 'root'
})
export class ExcelGeneratorService {

  constructor() {
  }

  /**
   * Generate an Excel workbook with a specified data array.
   * @param {string} filename - The name of the Excel file to be created.
   * @param {Array<any>} data - The data array to be written into the Excel file.
   * @returns {Promise<void>} - A promise that resolves when the file is created.
   */
  generateExcel(filename: string, data: Array<any>): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');

        // Assuming data is an array of objects with the same structure
        data.forEach((row, index) => {
          if (index === 0) {
            // Add headers based on the keys of the first row
            const headers = Object.keys(row);
            headers.forEach((header, colIndex) => {
              worksheet.getColumn(colIndex + 1).header = header;
            });
          }
          // Add row data
          worksheet.addRow(row);
        });

        // Write the workbook to a file
        workbook.xlsx.writeFile(`./${filename}.xlsx`)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });

      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Error handling function to show error messages to the user.
   * @param {Error} error - The error object to process.
   */
  handleError(error: Error) {
    console.error('An error occurred:', error.message);
    // Here you can add more sophisticated error handling,
    // such as showing error messages to the user.
  }
}

// Usage example in a component:
/*
@Component({
  selector: 'app-excel-generator',
  templateUrl: './excel-generator.component.html',
  styleUrls: ['./excel-generator.component.scss'],
})
export class ExcelGeneratorComponent {
  constructor(private excelService: ExcelGeneratorService) {}

  exportToExcel() {
    const data = [
      { name: 'John Doe', age: 30, email: 'john@example.com' },
      { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
      // ... other rows
    ];
    this.excelService.generateExcel('MyExcelFile', data)
      .then(() => console.log('Excel file created successfully.'))
      .catch((error) => this.excelService.handleError(error));
  }
}
*/