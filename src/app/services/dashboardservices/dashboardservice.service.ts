import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardserviceService {

  private url = 'http://127.0.0.1:5000/';
  public filename: string = '';
  constructor(private http: HttpClient) { }

  uploadFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.url + 'upload_file', formData);
  }

  get_pie_data(file_name: string) {
    console.log('service -> ' + file_name);
    return this.http.get(this.url + 'real_price_pie/' + file_name);
  }

  get_price_data_bar(file_name: string) {
    console.log('service -> ' + file_name);
    return this.http.get(this.url + 'real_price_bar/' + file_name);
  }

  get_price_data(file_name: string, real: string) {
    console.log('service -> ' + file_name);
    return this.http.get(this.url + 'real_price_bar/' + file_name + '/' + real);
  }
}
