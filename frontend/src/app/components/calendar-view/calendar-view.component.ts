import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { addDays, format, isAfter, isBefore } from 'date-fns';
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
        .filter(event => !this.hasPassed(event, now));
      this.groupAndFilterEvents();
    });
  }

  private groupAndFilterEvents() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const twoWeeksFromNow = addDays(today, 14);

    const grouped = this.events
      .filter(event => {
        const eventStart = event.start;
        return !isBefore(eventStart, today) && !isAfter(eventStart, twoWeeksFromNow);
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

  private hasPassed(event: Event, now: Date): boolean {
    // For events with an end time, check if the end time has passed
    if (event.end) {
      return isBefore(event.end, now);
    }
    // For events with only a start time, check if the start time has passed
    return isBefore(event.start, now);
  }

}
