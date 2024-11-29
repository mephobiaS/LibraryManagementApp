import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  login(email: string, role: string): void {
    localStorage.setItem('member', JSON.stringify({ email, role }));
  }

  logout(): void {
    localStorage.removeItem('member');
    this.router.navigate(['/login']);
  }

  getMember(): { email: string; role: string } | null {
    const member = localStorage.getItem('member');
    return member ? JSON.parse(member) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getMember();
  }

  getMemberRole(): string | null {
    const member = this.getMember();
    return member ? member.role : null;
  }
}
