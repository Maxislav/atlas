import { Injectable } from '@angular/core';

export class LocalStorage {

  private readonly prefix: string;

  constructor(prefix: string) {
    this.prefix = 'bike-atlas' + '-' + prefix;
    const item = localStorage.getItem(this.prefix);
    if (!item) {
      localStorage.setItem(this.prefix, JSON.stringify({}));
    }
  }

  getItem(key: string): any {
    const obj = this.getGlobalItem();
    return obj[key];
  }

  setItem(key: string, data: any) {
    const obj = this.getGlobalItem();
    obj[key] = data;
    const value = JSON.stringify(obj);
    localStorage.setItem(this.prefix, value);
  }

  private getGlobalItem() {
    let obj = {};
    try {
      obj = JSON.parse(localStorage.getItem(this.prefix));
    } catch (e) {
      console.warn(e);
    }
    return obj;
  }
}


@Injectable()
export class LocalStorageService {
  create(name: string): LocalStorage {
    return new LocalStorage(name);
  }
}
