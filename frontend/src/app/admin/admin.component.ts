import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { EventFormComponent } from '../components/event-form/event-form.component';
import { Event } from '../models/calendar';
import { AuthService } from '../services/auth.service';
import { EventService } from '../services/event.service';
import { StringToDatePipe } from '../utils/string-to-date.pipe';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatDialogModule, MatTableModule, StringToDatePipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  constructor(private authService: AuthService, private eventService: EventService) {}

  readonly dialog = inject(MatDialog);
  events: Event[] = [];
  displayedColumns: string[] = ['description', 'start', 'end', 'title', 'description', 'allDay'];

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '500px',
      data: { event: {} }
    });

    dialogRef.afterClosed().subscribe((result: Event) => {
      if (result) {
        this.eventService.createEvent(result).subscribe(() => {
          this.loadEvents();
        });
      }
    });
  }

  editEvent(event: Event): void {
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '500px',
      data: { event }
    });

    dialogRef.afterClosed().subscribe((result: Event) => {
      if (result) {
        this.eventService.updateEvent(event.id, result).subscribe(() => {
          this.loadEvents();
        });
      }
    });
  }

  deleteEvent(id: number): void {
    this.eventService.deleteEvent(id).subscribe(() => {
      this.loadEvents();
    });
  }
  
  logout() {
    this.authService.logout();
  }
}
