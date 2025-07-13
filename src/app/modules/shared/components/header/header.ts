import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  protected menuOpen = false;
  protected menuUserOpen = false;
  protected user: any;
  protected isAuthenticated: boolean = true;

  url = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="%23ccc"><circle cx="50" cy="35" r="20"/><path d="M50,65 C30,65 10,80 10,100 L90,100 C90,80 70,65 50,65 Z"/></svg>';

  public toggleMenu() {
    this.menuOpen = !this.menuOpen;

    // Bloquer le scroll quand le menu est ouvert
    if (this.menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  public toggleUserMenu() {
    this.menuUserOpen = !this.menuUserOpen;
  }

  public logout() {
    throw new Error('Method not implemented.');
  }

}
