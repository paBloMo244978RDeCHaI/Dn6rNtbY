// 代码生成时间: 2025-09-17 18:10:54
// sorting_algorithm_ionic_app.js
// This file contains the sorting algorithm implementation in Ionic framework using JavaScript.

// Import necessary Ionic components
import { Component } from '@angular/core';

// Define the SortingAlgorithmComponent
@Component({
  selector: 'app-sorting-algorithm',
  templateUrl: './sorting-algorithm.component.html',
  styleUrls: ['./sorting-algorithm.component.scss'],
})
export class SortingAlgorithmComponent {
  // Array to hold the numbers
  numbers: number[] = [];
  // Sorted numbers array
  sortedNumbers: number[] = [];
  // Error message
  errorMessage: string = "";

  // Constructor
  constructor() {
    this.numbers = this.generateRandomArray(100); // Generate 100 random numbers
  }

  // Generate a random array of numbers
  generateRandomArray(length: number): number[] {
    const array: number[] = [];
    for (let i = 0; i < length; i++) {
      array.push(Math.floor(Math.random() * 100)); // Generate random numbers between 0 and 99
    }
    return array;
  }

  // Perform sorting using a simple bubble sort algorithm
  sort(): void {
    try {
      if (!this.numbers) {
        throw new Error("The numbers array is empty.");
      }

      const length = this.numbers.length;
      for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i - 1; j++) {
          if (this.numbers[j] > this.numbers[j + 1]) {
            // Swap the elements
            const temp = this.numbers[j];
            this.numbers[j] = this.numbers[j + 1];
            this.numbers[j + 1] = temp;
          }
        }
      }

      // Copy the sorted numbers to the sortedNumbers array
      this.sortedNumbers = [...this.numbers];
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  // Reset the numbers array and sorted numbers array
  reset(): void {
    this.numbers = this.generateRandomArray(100);
    this.sortedNumbers = [];
    this.errorMessage = "";
  }
}
