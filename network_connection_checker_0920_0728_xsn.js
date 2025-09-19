// 代码生成时间: 2025-09-20 07:28:18
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkConnectionChecker {
  private networkSubscription: Subscription;

  constructor(private network: Network, private platform: Platform) {
    this.initializeNetworkMonitoring();
  }

  // 初始化网络监测
  private initializeNetworkMonitoring() {
    // 只有在移动平台（cordova环境）下才启用
    if (this.platform.is('cordova')) {
      this.networkSubscription = this.network.onChange().subscribe(details => {
        if (details.connection) {
          console.log('Network connection available:', details.connection);
        } else {
          console.log('Network connection lost.');
        }
      });
    } else {
      console.log('Network monitoring is not supported on this platform.');
    }
  }

  // 检查网络连接状态
  checkNetworkConnection() {
    return new Promise((resolve, reject) => {
      this.platform.ready().then(() => {
        if (this.platform.is('cordova')) {
          if (this.network.type === 'none') {
            reject('No network connection available.');
          } else {
            resolve('Network connection available.');
          }
        } else {
          reject('Network monitoring is not supported on this platform.');
        }
      }, reject);
    });
  }

  // 销毁网络监测订阅
  ngOnDestroy() {
    if (this.networkSubscription) {
      this.networkSubscription.unsubscribe();
    }
  }
}
