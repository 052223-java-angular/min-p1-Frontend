import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModifySignaturePayload } from 'src/app/models/ModifySignaturePayload';
import { ProfileComponent } from '../profile/profile.component';
import { UserService } from '../../service/user.service';
import { take } from 'rxjs';
import { PopupComponent } from 'src/app/utility/component/popup/popup.component';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css']
})
export class SignatureComponent {
  payload: ModifySignaturePayload = {
    userId: sessionStorage.getItem('id') || '',
    signature: ''
  }

  constructor(private userService: UserService, public dialogRef: MatDialogRef<ProfileComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) {
    this.payload.signature = data
  }
  saveSignature() {
    this.userService.modifySignature(this.payload).pipe(take(1)).subscribe({
      next: comment => {
        console.log("success");
        this.dialogRef.close();
        // Handle the sucsess response
        // TODO: Add code for handling success response
      },
      error: error => {
        console.log("failed");
        const dialogRef = this.dialog.open(PopupComponent, {
          data: error.error.message,
        });;
        // Handle the error response
        // TODO: Add code for handling error response
      }
    })

  }
}
