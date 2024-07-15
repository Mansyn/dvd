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
      this.events = events.filter( (event) => this.isPreviousDay(event.start, new Date()) );;
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

  private normalizeDate(date: Date): Date {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
}

private isPreviousDay(date1: Date, date2: Date): boolean {
    const normalizedDate1 = this.normalizeDate(date1);
    const normalizedDate2 = this.normalizeDate(date2);
    
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    
    return normalizedDate1.getTime() === normalizedDate2.getTime() - oneDayInMilliseconds;
}

}
