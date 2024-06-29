import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Employee } from '../models/staff';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
})
export class StaffComponent {
  employees: Employee[] = [];

  constructor() {
    this.employees = [{
      name: 'John Doe',
      position: 'Brewmaster',
      description: 'Expert in brewing techniques and quality control.',
      imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      name: 'Jane Smith',
      position: 'Sales Manager',
      description: 'Manages client relations and sales strategies.',
      imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      name: 'Michael Johnson',
      position: 'Operations Manager',
      description: 'Oversees daily operations and logistics.',
      imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      name: 'Emily Davis',
      position: 'Marketing Specialist',
      description: 'Develops and executes marketing campaigns.',
      imageUrl: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    {
      name: 'Jane Smith',
      position: 'Sales Manager',
      description: 'Manages client relations and sales strategies.',
      imageUrl: 'https://randomuser.me/api/portraits/women/25.jpg'
    },
    {
      name: 'Michael Johnson',
      position: 'Operations Manager',
      description: 'Oversees daily operations and logistics.',
      imageUrl: 'https://randomuser.me/api/portraits/men/33.jpg'
    },
    {
      name: 'Emily Davis',
      position: 'Marketing Specialist',
      description: 'Develops and executes marketing campaigns.',
      imageUrl: 'https://randomuser.me/api/portraits/women/45.jpg'
    },
    {
      name: 'Michael Johnson',
      position: 'Operations Manager',
      description: 'Oversees daily operations and logistics.',
      imageUrl: 'https://randomuser.me/api/portraits/men/22.jpg'
    }]
  }
}
