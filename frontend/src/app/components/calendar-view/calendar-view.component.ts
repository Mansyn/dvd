import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { format, isAfter, parseISO } from 'date-fns';
import { Event, GroupedEvents } from '../../models/calendar';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'calendar-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-view.component.html',
  styleUrl: './calendar-view.component.scss'
})
export class CalendarViewComponent {

  events: Event[] = [];
  groupedEvents: GroupedEvents[] = [];
  
  // newEvent: Event = {
  //   _id: 0,
  //   start: new Date("2024-11-19T19:25"),
  //   end: new Date("2024-11-19T21:25"),
  //   title: 'test',
  //   description: 'test',
  //   allDay: false
  // };
  
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    const now = new Date();
    this.eventService.getEvents().subscribe(_events => {
      this.events = _events
        .map(event => ({
          ...event,
          start: new Date(event.start),
          end: event.end ? new Date(event.end) : undefined
        }))
        .sort((a, b) => a.start.getTime() - b.start.getTime())
        .filter(target => this.hasPassed(target, now));
      this.groupAndFilterEvents();
    });
  }

  private groupAndFilterEvents() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const twoWeeksFromNow = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000); // Two weeks from today
    // this.events.push(this.newEvent);

    const grouped = this.events
      .filter(event => {
        const eventDate = new Date(event.start);
        return eventDate >= today && eventDate <= twoWeeksFromNow;
      })
      .reduce((acc, event) => {
        const date = new Date(event.start.getFullYear(), event.start.getMonth(), event.start.getDate());
        const dateString = date.toISOString();
        if (!acc[dateString]) {
          acc[dateString] = { date, allDayEvents: [], timedEvents: [] };
        }
        if (event.allDay) {
          acc[dateString].allDayEvents.push(event);
        } else {
          acc[dateString].timedEvents.push(event);
        }
        return acc;
      }, {} as Record<string, GroupedEvents>);

    this.groupedEvents = Object.values(grouped).sort((a, b) => a.date.getTime() - b.date.getTime());
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
    const startDate = _event.start.toString();  // Parse start date
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
