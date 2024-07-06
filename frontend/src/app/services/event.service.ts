import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../models/calendar';
import { AUTH_API, httpOptions } from '../utils/constants';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${AUTH_API}event`,
      httpOptions);
  }

  getEvent(id: number): Observable<Event> {
    return this.http.get<Event>(`${AUTH_API}event/${id}`,
      httpOptions);
  }

  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${AUTH_API}event`, event,
      httpOptions);
  }

  updateEvent(id: number, event: Event): Observable<Event> {
    return this.http.patch<Event>(`${AUTH_API}event/${id}`, event,
      httpOptions);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${AUTH_API}event/${id}`,
      httpOptions);
  }
}
