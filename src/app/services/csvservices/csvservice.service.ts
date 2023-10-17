import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvserviceService {


  private url = 'http://127.0.0.1:5000/get_csv'

  constructor(private http: HttpClient) { }

  getCSV(): Observable<any> {
    const url = `${this.url}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
