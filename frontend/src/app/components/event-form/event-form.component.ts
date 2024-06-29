import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Event } from '../../models/calendar';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule,MatCheckboxModule, MatDatepickerModule, MatDialogClose, MatInputModule, ReactiveFormsModule, FormsModule, MatButtonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './event-form.component.html',
  styleUrl: './event-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventFormComponent implements OnInit {
  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EventFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { event: Event }
  ) {
    this.eventForm = this.fb.group({
      title: [data.event.title, Validators.required],
      description: [data.event.description],
      start: [data.event.start, Validators.required],
      end: [data.event.end],
      allDay: [data.event.allDay],
      text: [data.event.text],
      link: [data.event.link],
    });
  }

  ngOnInit(): void { }

  onCancel(): void {
    this.dialogRef.close();
  }
}
