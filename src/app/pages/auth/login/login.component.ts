import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // private subscriptions: Subscription[] = [];
  private subscription: Subscription = new Subscription();

  loginForm = this.fb.group({
    username: [''],
    password: [''],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    // this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscription.unsubscribe();
  }

  handleSubmit(): void {
    const formValue = this.loginForm.value;
    this.subscription.add(
      this.authService.login(formValue).subscribe((res) => {
        if (res) this.router.navigate(['']);
      })
    );
    // this.subscription.push() = this.authService
    //   .login(formValue)
    //   .subscribe((res) => {
    //     res && this.router.navigate(['/']);
    //   });
  }
}
