// 代码生成时间: 2025-10-08 22:21:39
// Import necessary Ionic modules
import { Injectable } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { Storage, StorageObject } from '@ionic/storage';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Injectable({
  providedIn: 'root'
})
export class DiskSpaceManager {
  // Reference to the file system
  rootDir: string;
  // Reference to the device storage paths
  storageInfo: any;
  
  constructor(
    private navCtrl: NavController,
    private storage: StorageObject,
    private transfer: FileTransfer,
    private file: File
  ) {
    // Initialize the root directory based on the platform
    this.rootDir = this.file.dataDirectory;
    // Get the storage information
    this.file.getFreeDiskSpace().then(
      (res: any) => {
        this.storageInfo = res;
      },
      (err: any) => {
        console.error('Error getting disk space:', err);
      }
    );
  }
  
  // Method to display disk usage information
  async displayDiskUsage() {
    try {
      const diskUsage = await this.getFileSystemInfo();
      console.log('Disk Usage:', diskUsage);
      // Display the disk usage information in the UI
      this.navCtrl.navigateForward('/disk-usage-page', { state: { diskUsage: diskUsage } });
    } catch (error) {
      console.error('Error displaying disk usage:', error);
    }
  }
  
  // Method to get file system information
  private async getFileSystemInfo() {
    const stats = await this.file.getFreeDiskSpace();
    return {
      freeSpace: stats.freeSpace,
      totalSpace: stats.totalSpace
    };
  }
  
  // Method to clear cache files
  async clearCache() {
    try {
      const cacheDir = this.storageInfo.externalCacheDirectory;
      await this.deleteDirectory(cacheDir);
      console.log('Cache cleared successfully');
      // Notify the user
      alert('Cache cleared successfully');
    } catch (error) {
      console.error('Error clearing cache:', error);
      // Notify the user
      alert('Error clearing cache: ' + error.message);
    }
  }
  
  // Method to delete a directory
  private async deleteDirectory(dirPath: string) {
    const files = await this.file.listDir(this.rootDir, dirPath);
    for (const file of files) {
      const filePath = `${dirPath}/${file}`;
      if (await this.file.isDirectory(this.rootDir, filePath)) {
        await this.deleteDirectory(filePath);
      } else {
        await this.file.removeFile(this.rootDir, filePath);
      }
    }
    await this.file.removeDir(this.rootDir, dirPath);
  }
}

/*
 * Ionic page component to display disk usage information
 */
import { Component } from '@angular/core';
import { IonicPage, NavController } from '@ionic/angular';
import { DiskSpaceManager } from './disk-space-manager.service';

@IonicPage()
@Component({
  selector: 'page-disk-usage',
  templateUrl: 'disk-usage.html',
})
export class DiskUsagePage {
  diskUsage: any;

  constructor(public navCtrl: NavController, public diskSpaceManager: DiskSpaceManager) {
    this.diskUsage = this.navCtrl.getCurrent().state.diskUsage;
  }
  
  // Method to go back to the previous page
  goBack() {
    this.navCtrl.pop();
  }
}
