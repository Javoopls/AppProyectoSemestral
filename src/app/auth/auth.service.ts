import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userId = 'abc';

  get userId(){
    return this._userId;
  }

  constructor() { }
}
