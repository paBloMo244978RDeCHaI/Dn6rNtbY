// 代码生成时间: 2025-09-16 01:07:37
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

/**
 * 文件备份和同步工具
 * @param {string} sourcePath - 源文件夹路径
 * @param {string} backupPath - 备份文件夹路径
 */
function backupAndSyncFiles(sourcePath, backupPath) {
  // 检查源路径和备份路径是否存在
  if (!fs.existsSync(sourcePath)) {
    console.error('源路径不存在:', sourcePath);
    return;
  }

  if (!fs.existsSync(backupPath)) {
    fs.mkdirSync(backupPath, { recursive: true });
  }

  // 读取源路径下所有文件和文件夹
  fs.readdir(sourcePath, (err, items) => {
    if (err) {
      console.error('读取源路径失败:', err);
      return;
    }

    items.forEach((item) => {
      const sourceItemPath = path.join(sourcePath, item);
      const backupItemPath = path.join(backupPath, item);

      // 检查是文件还是文件夹
      fs.stat(sourceItemPath, (err, stats) => {
        if (err) {
          console.error('获取文件状态失败:', err);
          return;
        }

        if (stats.isDirectory()) {
          // 如果是文件夹，则递归备份和同步
          backupAndSyncFiles(sourceItemPath, backupItemPath);
        } else {
          // 如果是文件，则复制到备份路径
          fs.copyFileSync(sourceItemPath, backupItemPath);
          console.log('文件已同步:', item);
        }
      });
    });
  });
}

/**
 * 使用示例
 */
const sourcePath = '/path/to/source';
const backupPath = '/path/to/backup';
backupAndSyncFiles(sourcePath, backupPath);
