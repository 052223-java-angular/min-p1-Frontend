import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { UserService } from "../../service/user.service";
import { RegisterPayload } from "src/app/models/RegisterPayload";

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
  confirmedPassword:AbstractControl;

  constructor(private fb: FormBuilder, private userService:UserService){
    this.formGroup = fb.group({
      username: ['', [Validators.required, Validators.pattern('(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}')]],
      confirmedPassword: ['', [Validators.required]],
    });
    this.formGroup.controls['confirmedPassword'].addValidators(
      this.samePasswordValidator(
        this.formGroup.controls['password'], 
        this.formGroup.controls['confirmedPassword']
      )
    );
    this.username = this.formGroup.controls['username'];
    this.email = this.formGroup.controls['email'];
    this.password = this.formGroup.controls['password'];
    this.confirmedPassword = this.formGroup.controls['confirmedPassword'];
  }

  samePasswordValidator(
    passwordControl: AbstractControl, 
    confirmedPasswordControl: AbstractControl
  ) : ValidatorFn {
    return () => {
      return passwordControl?.value === confirmedPasswordControl?.value ? null : { notSame: true };
    };
  }

  submitForm() {
    console.log("payload");
    if (this.formGroup.invalid) {
      return;
    }
    
    const payload: RegisterPayload = {
      username: this.formGroup.controls['username'].value,
      password: this.formGroup.controls['password'].value,
      email: this.formGroup.controls['email'].value,
      confirmedPassword: this.formGroup.controls['confirmedPassword'].value,
    };
    
    this.userService.register(payload).subscribe({
      next: value =>{
        console.log("success");
        // Handle the success response
        // TODO: Add code for handling success response
      },
      error: error =>{
        console.log("failed");
        // Handle the error response
        // TODO: Add code for handling error response
      }
    })
    
  }
}
