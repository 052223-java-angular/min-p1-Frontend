import { Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationComponent } from './user/component/navigation/navigation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokemon';

  dialogRef: any = null;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'Escape') {
      // Your row selection code
      this.toggleNav();
    }
  }

  constructor(private dialog: MatDialog) { }

  toggleNav() {
    if (!this.dialogRef) {
      this.dialogRef = this.dialog.open(NavigationComponent, {
        data: null,
      });


    } else {
      this.dialogRef.close();
      this.dialogRef = null;
    }

  }
}
