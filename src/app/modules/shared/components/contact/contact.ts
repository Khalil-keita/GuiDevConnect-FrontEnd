import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements OnInit {

  ngOnInit(): void {
    this.initFaqAccordion();
  }

  private initFaqAccordion(): void {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach((button: Element) => {
      button.addEventListener('click', () => {
        const answer = button.nextElementSibling as any;
        const isOpen = button.classList.contains('active');

        // Ferme toutes les autres réponses
        faqQuestions.forEach((item: Element) => {
          if (item !== button) {
            item.classList.remove('active');
            (item.nextElementSibling as any).style.maxHeight = null;
          }
        });

        // Ouvre/ferme la réponse actuelle
        if (!isOpen) {
          button.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
          button.classList.remove('active');
          answer.style.maxHeight = null;
        }
      });
    });
  }

}
