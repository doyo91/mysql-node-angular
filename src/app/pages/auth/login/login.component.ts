import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: [''],
    password: [''],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userData = {
      username: 'doyo@test.com',
      password: '123456',
    };

    this.authService.login(userData).subscribe((res) => console.log(res));
  }

  handleSubmit(): void {
    const formValue = this.loginForm.value;
    this.authService.login(formValue).subscribe((res) => {
      res && this.router.navigate(['/']);
    });
  }
}
