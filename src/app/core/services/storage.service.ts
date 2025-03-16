import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  session_credentials,
  session_headerSearch,
  session_rememberMe,
  session_userId,
  session_userImage,
  session_userName,
  session_userRole,
  session_usertoken,
} from '../constants/storage-keys';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private platFormTypeSource = new BehaviorSubject<number>(1);
  currentPlatFormTypeSource = this.platFormTypeSource.asObservable();

  setHeaderSearch(value: any) {
    localStorage.setItem(session_headerSearch, JSON.stringify(value));
  }

  removeHeaderSearch() {
    localStorage.removeItem(session_headerSearch);
  }

  get getUserId() {
    return localStorage.getItem(session_userId);
  }

  setUserId(value: any) {
    localStorage.setItem(session_userId, value);
  }

  get getUserName() {
    return localStorage.getItem(session_userName);
  }

  setUserName(value: any) {
    localStorage.setItem(session_userName, value);
  }

  get getUserRole() {
    return localStorage.getItem(session_userRole);
  }

  setUserRole(value: any) {
    localStorage.setItem(session_userRole, value);
  }

  get getToken() {
    const token = localStorage.getItem(session_usertoken);
    return token !== null ? token : ''; // Return an empty string if token is null
  }

  setToken(value: any) {
    localStorage.setItem(session_usertoken, value);
  }

  get getRememberMe() {
    var RememberMe = localStorage.getItem(session_rememberMe);
    return RememberMe ? JSON.parse(RememberMe) : null;
  }

  setRememberMe(value: any) {
    localStorage.setItem(session_rememberMe, JSON.stringify(value));
  }

  removeRememberMe() {
    localStorage.removeItem(session_rememberMe);
  }

  setCredentials(value: any) {
    localStorage.setItem(session_credentials, JSON.stringify(value));
  }

  get getCredentials() {
    var credentials = localStorage.getItem(session_credentials);
    return credentials ? JSON.parse(credentials) : null;
  }

  removeCredentials() {
    localStorage.removeItem(session_credentials);
  }

  get getUserProfile() {
    return localStorage.getItem(session_userImage)
      ? localStorage.getItem(session_userImage)
      : '/assets/images/user-profile.png';
  }

  setUserProfile(value: any) {
    localStorage.setItem(session_userImage, value);
  }

  clearSession() {
    localStorage.clear();
  }
}
