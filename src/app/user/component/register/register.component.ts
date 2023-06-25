import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { UserService } from "../../service/user.service";
import { RegisterPayload } from "src/app/models/RegisterPayload";
import { Router } from "@angular/router";
import { take } from "rxjs";
import { PopupComponent } from "src/app/utility/component/popup/popup.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formGroup: FormGroup;
  username: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  confirmedPassword: AbstractControl;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private dialog: MatDialog) {
    this.formGroup = fb.group({
      username: ['', [Validators.required, Validators.pattern('(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}')]],
      confirmedPassword: ['', [Validators.required]],
    });
    this.formGroup.controls['confirmedPassword'].addValidators(
      userService.samePasswordValidator(
        this.formGroup.controls['password'],
        this.formGroup.controls['confirmedPassword']
      )
    );
    this.username = this.formGroup.controls['username'];
    this.email = this.formGroup.controls['email'];
    this.password = this.formGroup.controls['password'];
    this.confirmedPassword = this.formGroup.controls['confirmedPassword'];
  }



  submitForm() {
    if (this.formGroup.invalid) {
      return;
    }

    const payload: RegisterPayload = {
      username: this.formGroup.controls['username'].value,
      password: this.formGroup.controls['password'].value,
      email: this.formGroup.controls['email'].value,
      confirmedPassword: this.formGroup.controls['confirmedPassword'].value,
    };

    this.userService.register(payload).pipe(take(1)).subscribe({
      next: value => {
        this.router.navigate(['/login'])
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
