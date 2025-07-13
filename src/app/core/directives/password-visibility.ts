// password-visibility.directive.ts
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPasswordVisibility]'
})
export class PasswordVisibility {
  private isVisible = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('click')
  onClick() {
    this.isVisible = !this.isVisible;
    const input = this.el.nativeElement.previousElementSibling;
    const icon = this.el.nativeElement.querySelector('i');

    if (input) {
      this.renderer.setAttribute(input, 'type', this.isVisible ? 'text' : 'password');
      if (icon) {
        icon.classList.toggle('fa-eye-slash', this.isVisible);
        icon.classList.toggle('fa-eye', !this.isVisible);
      }
    }
  }
}
