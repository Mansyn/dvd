import { Component } from '@angular/core';
import { format, isAfter, parseISO } from 'date-fns';
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
    const now = new Date();
    this.eventService.getEvents().subscribe(_events => {
      this.events = _events.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()).filter( (target) => this.hasPassed(target, now) );;
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

  private hasPassed(_event: Event, _now: Date): boolean {
    const startDate = parseISO(_event.start.toString());  // Parse start date
    const endDate = _event.end ? parseISO(_event.end.toString()) : null;  // Parse end date if it exists
    
    if (_event.allDay) {
      // For all-day events, check if the start date is after the current date
      return isAfter(startDate, _now);
    } else {
      // For other events, check if the end date is after the current date
      return endDate ? isAfter(endDate, _now) : true;
    }
  }

}
