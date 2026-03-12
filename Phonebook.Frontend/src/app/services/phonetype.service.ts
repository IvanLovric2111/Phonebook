import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PhoneType } from '../models/phonetype.model';

@Injectable({ providedIn: 'root' })
export class PhoneTypeService {
  private apiUrl = 'https://localhost:7075/api/PhoneTypes';
  constructor(private http: HttpClient) {}

  getPhoneTypes(): Observable<PhoneType[]> {
    return this.http.get<PhoneType[]>(this.apiUrl);
  }
}