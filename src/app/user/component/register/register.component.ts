import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../service/user.service";
import { RegisterPayload } from "src/app/models/RegisterPayload";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private userService:UserService){}

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submitForm() {
    if (this.formGroup.invalid) {
      return;
    }
  
    const payload: RegisterPayload = {
      username: this.formGroup.controls['username'].value,
      password: this.formGroup.controls['password'].value,
      email: this.formGroup.controls['email'].value,
      confirmPassword: this.formGroup.controls['confirmPassword'].value,
    };

    this.userService.register(payload).subscribe({
      next: value =>{
        // Handle the success response
        // TODO: Add code for handling success response
      },
      error: error =>{
        // Handle the error response
        // TODO: Add code for handling error response
      }
    })
    
  }
}
