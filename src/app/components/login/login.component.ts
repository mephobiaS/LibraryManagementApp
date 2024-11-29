import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}(\\.[a-zA-Z]{2,})?$'
      ),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@]).+$'),
    ]),
    role: new FormControl('', [Validators.required]),
  });
  constructor(private authService: AuthService, private router: Router) {}
  onSubmit() {
    const { email, password, role } = this.loginForm.value;

    if (
      role === 'librarian' &&
      email === 'librarian@gmail.com' &&
      password === 'Librarian@123'
    ) {
      this.authService.login(email, role);
      this.router.navigate(['/books'], { queryParams: { role } });
    } else if (role === 'member') {
      this.authService.login(email, role);
      this.router.navigate(['/books'], { queryParams: { role } });
    } else {
      alert('Invalid credentials or role  !');
    }
  }
}
