import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'footer',
  standalone: true,
  imports: [MatDividerModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  public currentYear: number=new Date().getFullYear();
}
