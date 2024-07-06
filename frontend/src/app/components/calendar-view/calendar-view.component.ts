import { Component } from '@angular/core';
import { format } from 'date-fns';
import { Event } from '../../models/calendar';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'calendar-view',
  standalone: true,
  imports: [],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.scss'
})
export class CalendarViewComponent {

  events: Event[] = [];
  
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
    });
  }

  public displayDay(date: Date) {
    return format(date, 'do');
  }

  public displayMonth(date: Date) {
    return format(date, 'LLLL');
  }
  
  public displayYear(date: Date) {
    return format(date, 'yyyy');
  }
    
  public displayTime(date: Date) {
    return format(date, "h:mm aaaaa'm'");
  }
}
