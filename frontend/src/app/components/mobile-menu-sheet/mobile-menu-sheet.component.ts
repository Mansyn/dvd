import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Page } from '../../models/navigation';

@Component({
  selector: 'app-mobile-menu-sheet',
  standalone: true,
  imports: [MatIconModule, MatListModule],
  templateUrl: './mobile-menu-sheet.component.html'
})
export class MobileMenuSheetComponent {

  public pages: Page[]

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<MobileMenuSheetComponent>, 
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Page[]) {
      this.pages = data
    }

  // openLink(event: MouseEvent): void {
  //   this._bottomSheetRef.dismiss();
  //   event.preventDefault();
  // }
}
