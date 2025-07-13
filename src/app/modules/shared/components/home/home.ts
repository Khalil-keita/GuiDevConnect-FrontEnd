import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home {
  searchQuery = '';
  searchInTitles = true;
  searchInContent = true;
  searchInTags = true;

  recentTopics = [
    {
      id: 1,
      title: 'Problème avec Angular HttpClient',
      author: 'JeanDupont',
      authorAvatar: 'https://i.pravatar.cc/40?img=1',
      date: 'Il y a 2 heures',
      replies: 5,
      views: 42,
      tags: ['Angular', 'HTTP']
    },
    {
      id: 2,
      title: 'Meilleures pratiques pour les composants React',
      author: 'MarieDev',
      authorAvatar: 'https://i.pravatar.cc/40?img=5',
      date: 'Il y a 5 heures',
      replies: 12,
      views: 87,
      tags: ['React', 'Frontend']
    },
    {
      id: 3,
      title: 'Comment optimiser une API Node.js ?',
      author: 'BackendMaster',
      authorAvatar: 'https://i.pravatar.cc/40?img=9',
      date: 'Hier',
      replies: 8,
      views: 65,
      tags: ['Node.js', 'Performance']
    },
    {
      id: 4,
      title: 'Guide complet pour les hooks Vue 3',
      author: 'VueLover',
      authorAvatar: 'https://i.pravatar.cc/40?img=7',
      date: 'Il y a 2 jours',
      replies: 15,
      views: 120,
      tags: ['Vue.js', 'Frontend']
    }
  ];

  constructor(private router: Router) { }

  search(event: Event) {
    event.preventDefault();

    if (!this.searchQuery.trim()) return;

    // Navigation vers la page de résultats avec les paramètres
    this.router.navigate(['/search'], {
      queryParams: {
        q: this.searchQuery,
        titles: this.searchInTitles,
        content: this.searchInContent,
        tags: this.searchInTags
      }
    });
  }
}
