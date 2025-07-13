import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  protected menuOpen = false;
  protected menuUserOpen = false;
  protected user: any;
  protected isAuthenticated: boolean = false;

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
