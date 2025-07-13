import { Component } from '@angular/core';
import { Header } from "../../modules/shared/components/header/header";
import { Footer } from "../../modules/shared/components/footer/footer";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [Header, Footer, RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
  standalone: true
})
export class MainLayout {

}
