import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedditserviceService {

  private url = 'http://127.0.0.1:5000/reddit_posts'

  constructor(private http: HttpClient) { }

  public get_reddit_posts(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
