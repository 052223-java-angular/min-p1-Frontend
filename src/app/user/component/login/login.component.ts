import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { LoginPayload } from 'src/app/models/LoginPayload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formGroup: FormGroup;
  username: AbstractControl;
  password: AbstractControl;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.formGroup = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.username = this.formGroup.controls['username'];
    this.password = this.formGroup.controls['password'];
  }

  submitForm() {
    if (this.formGroup.invalid) {
      return;
    }

    const payload: LoginPayload = {
      username: this.formGroup.controls['username'].value,
      password: this.formGroup.controls['password'].value,
    };

    this.userService.login(payload).subscribe({
      next: principal => {
        sessionStorage.setItem('id', principal.id);
        sessionStorage.setItem('username', principal.username);
        sessionStorage.setItem('role', principal.role);
        sessionStorage.setItem('token', principal.token);
        this.router.navigate([`/user/${principal.username}`])
      },
      error: error => {
        console.log("failed");
        // Handle the error response
        // TODO: Add code for handling error response
      }
    })

  }
}
