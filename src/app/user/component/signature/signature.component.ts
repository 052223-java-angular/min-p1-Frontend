import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModifySignaturePayload } from 'src/app/models/ModifySignaturePayload';
import { ProfileComponent } from '../profile/profile.component';
import { UserService } from '../../service/user.service';
import { take } from 'rxjs';

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

  constructor(private userService: UserService, public dialogRef: MatDialogRef<ProfileComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
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
        // Handle the error response
        // TODO: Add code for handling error response
      }
    })

  }
}
