import { NgIf, NgForOf, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-profil',
  imports: [FormsModule, NgIf, NgForOf, RouterLink, RouterLinkActive, DatePipe],
  templateUrl: './profil.html',
  styleUrl: './profil.css'
})
export class Profil {
  @Input() user: any;
  @Input() isCurrentUser: boolean = false;

  editingBio: boolean = false;
  editingSocialLinks: boolean = false;
  originalBio: string = '';
  originalSocialLinks: any[] = [];

  tabs = [
    { label: 'Activité', link: '/profile' },
    { label: 'Badges', link: '/profile/badges' },
    { label: 'Publications', link: '/profile/posts' },
    { label: 'Commentaires', link: '/profile/comments' },
    { label: 'Enregistrés', link: '/profile/saved' }
  ];

  date = new Date()

  ngOnInit() {
    // Initialiser les copies pour l'annulation
    this.originalBio = this.user?.bio ?? "Super bio de l'utilisateur";
    this.originalSocialLinks = [
      { platform: 'website', url: '', displayText: '' }];
  }

  editBio() {
    this.editingBio = true;
  }

  saveBio() {
    // Ici, ajouter la logique pour sauvegarder en base de données
    this.editingBio = false;
  }

  cancelEditBio() {
    this.user.bio = this.originalBio;
    this.editingBio = false;
  }

  editSocialLinks() {
    this.editingSocialLinks = true;
  }

  saveSocialLinks() {
    // Sauvegarder les liens sociaux
    this.originalSocialLinks = [...this.user.socialLinks];
    this.editingSocialLinks = false;
  }

  cancelEditSocialLinks() {
    this.user.socialLinks = [...this.originalSocialLinks];
    this.editingSocialLinks = false;
  }

  addSocialLink() {
    this.user.socialLinks.push({ platform: 'website', url: '', displayText: '' });
  }

  removeSocialLink(index: number) {
    this.user.socialLinks.splice(index, 1);
  }

  hasSocialLinks(): boolean {
    return this.user?.socialLinks && this.user?.socialLinks.some((link: any) => link.url.trim() !== '');
  }

  toggleFollow() {
    this.user.isFollowing = !this.user.isFollowing;
    // Ajouter la logique pour suivre/ne plus suivre
  }

  editProfile() {
    // Navigation vers la page d'édition complète
  }
}
