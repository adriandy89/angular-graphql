import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  getJSON(key: string) {
    return JSON.parse(localStorage.getItem(key) || '{}') || {};
  }

  setJSON(key: string, value: any): boolean {
    localStorage.removeItem(key);
    localStorage.setItem(key, JSON.stringify(value));

    return true;
  }

  get(key: string): string | null {
    return localStorage.getItem(key);
  }

  set(key: string, value: string): boolean {
    localStorage.setItem(key, value);

    return true;
  }

  has(key: string): boolean {
    return !!localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}

export class MemoryStorageService {
  private store: { [k: string]: string } = {};

  get(key: string) {
    return JSON.parse(this.store[key] || '{}') || {};
  }

  set(key: string, value: any): boolean {
    this.store[key] = JSON.stringify(value);
    return true;
  }

  has(key: string): boolean {
    return !!this.store[key];
  }

  remove(key: string) {
    delete this.store[key];
  }

  clear() {
    this.store = {};
  }
}
