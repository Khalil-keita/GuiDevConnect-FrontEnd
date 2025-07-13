import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout').then(m => m.MainLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./modules/shared/components/home/home').then(m => m.Home),
        title: 'Accueil'
      },
      {
        path: 'about',
        loadComponent: () => import('./modules/shared/components/about/about').then(m => m.About),
        title: 'A propos'
      },
      {
        path: 'contact',
        loadComponent: () => import('./modules/shared/components/contact/contact').then(m => m.Contact),
        title: 'Contact'
      },
      {
        path: 'profile',
        loadComponent: () => import('./modules/shared/components/profil/profil').then(m => m.Profil),
        title: 'Profil utilisateur'
      },
      {
        path: 'discussions',
        loadComponent: () => import('./modules/shared/pages/topic/topic').then(m => m.Topic),
        title: 'Discussions'
      },
      {
        path: 'detail-discussion',
        loadComponent: () => import('./modules/shared/pages/topic/topic-detail/topic-detail').then(m => m.TopicDetail),
        title: 'Detail Discussion'
      }
    ]
  },
  // Auth routes
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./modules/auth/components/login/login').then(m => m.Login),
        title: 'Connexion'
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./modules/auth/components/reset-password/reset-password').then(m => m.ResetPassword),
        title: 'Réinitialisation mot de passe'
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./modules/auth/components/forgot-password/forgot-password').then(m => m.ForgotPassword),
        title: 'Mot de passe oublié'
      },
      {
        path: 'register',
        loadComponent: () => import('./modules/auth/components/register/register').then(m => m.Register),
        title: 'Inscription'
      },
    ]
  }
];
