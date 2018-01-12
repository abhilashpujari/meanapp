import { Injectable } from '@angular/core';
import { ToastrService, ToastConfig } from 'ngx-toastr';

@Injectable()
export class NotificationService {

  constructor(private toastrService: ToastrService) { }

  success(title : string, message: string) {
    this.displayToast(title, message, 'success');
  }

  error(title : string, message: string) {
    this.displayToast(title, message, 'error');
  }

  info(title : string, message: string) {
    this.displayToast(title, message, 'info');
  }

  warning(title : string, message: string) {
    this.displayToast(title, message, 'warning');
  }

  private displayToast(title : string, message: string, type: string) {
    var timeout = 5000;

    var toastOptions: ToastConfig = {
      closeButton: true,
      timeout: timeout,
    };

    switch (type) {
      case 'info': this.toastrService.info(title, message, toastOptions); break;
      case 'success': this.toastrService.success(title, message, toastOptions); break;
      case 'error': this.toastrService.error(title, message, toastOptions); break;
      case 'warning': this.toastrService.warning(title, message, toastOptions); break;
    }
  }
}