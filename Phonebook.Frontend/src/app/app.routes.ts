import { Routes } from '@angular/router';
import { ContactList } from './components/contact-list/contact-list';
import { ContactDetails } from './components/contact-details/contact-details';

export const routes: Routes = [
  { path: '', component: ContactList },
  { path: 'contact/:id', component: ContactDetails },
  { path: '**', redirectTo: '' }
];