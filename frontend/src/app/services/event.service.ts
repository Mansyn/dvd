import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Event } from '../models/calendar';
import { httpOptions } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.API}event`,
      httpOptions);
  }

  getEvent(id: number): Observable<Event> {
    return this.http.get<Event>(`${environment.API}event/${id}`,
      httpOptions);
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${environment.API}event`, event,
      httpOptions);
  }

  updateEvent(id: number, event: Event): Observable<Event> {
    return this.http.patch<Event>(`${environment.API}event/${id}`, event,
      httpOptions);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.API}event/${id}`,
      httpOptions);
  }
}
