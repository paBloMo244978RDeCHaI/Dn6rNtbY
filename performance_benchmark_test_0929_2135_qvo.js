// 代码生成时间: 2025-09-29 21:35:06
 * @returns {Promise} - A promise that resolves after a specified delay.
 */
function heavyComputation() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('Heavy computation completed.');
      resolve();
    }, 1000); // Simulate a 1 second delay.
  });
}

/**
 * Function to measure performance.
 * @param {Function} operation - The operation to be benchmarked.
 * @returns {void}
 */
function measurePerformance(operation) {
  const start = performance.now();
  operation().then(() => {
    const end = performance.now();
    console.log(`Operation completed in ${end - start} milliseconds.`);
  });
}

/**
 * Main function to run the benchmark test.
 * @returns {void}
 */
async function runBenchmarkTest() {
  try {
    // Start the benchmark test by calling measurePerformance with heavyComputation.
    measurePerformance(heavyComputation);
  } catch (error) {
    // Handle any errors that may occur during the benchmarking process.
    console.error('An error occurred during the benchmark test:', error);
  }
}

// Run the benchmark test when the script is executed.
runBenchmarkTest();