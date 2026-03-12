import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { PhoneTypeService } from '../../services/phonetype.service';
import { PhoneType } from '../../models/phonetype.model';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.css'
})
export class ContactList implements OnInit {
  contacts: Contact[] = [];
  newContact: any = { 
    firstName: '', 
    lastName: '', 
    address: null,
    email: null, 
    phoneNumbers: [] 
  };
  phoneTypes: PhoneType[] = [];
  selectedTypeId: number | null = null;
  tempPhoneNumber: string = '';
  searchTerm: string = '';
  isEditMode: boolean = false;
  
  constructor(
    private contactService: ContactService,
    private phoneTypeService: PhoneTypeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.contactService.getContacts().subscribe({
      next: (data: Contact[]) => {
        this.contacts = data;
        this.cdr.detectChanges();
        console.log('Data received in component:', this.contacts);
      },
      error: (err: any) => console.error('Error fetching contacts:', err)
    });

    this.phoneTypeService.getPhoneTypes().subscribe(types => {
      this.phoneTypes = types;
      if (this.phoneTypes.length > 0) {
          const mobileType = this.phoneTypes.find(t => t.name === 'Mobile');
          this.selectedTypeId = mobileType ? mobileType.id : this.phoneTypes[0].id;
          this.cdr.detectChanges();
      }
    });
  }

  deleteContact(id: number): void {
    if (confirm('Are you sure you want to delete this contact?')) {
      this.contactService.deleteContact(id).subscribe({
        next: () => {
          this.contacts = this.contacts.filter(c => c.id !== id);
          this.cdr.detectChanges();
          console.log('Contact deleted successfully!');
        },
        error: (err: any) => console.error('Error deleting contact:', err)
      });
    }
  }

  addContact(contactForm: NgForm): void {
    if (this.newContact.firstName && this.newContact.lastName && this.tempPhoneNumber) {
      const contactToSave : any = {
        firstName: this.newContact.firstName,
        lastName: this.newContact.lastName,
        address: this.newContact.address || null,
        email: this.newContact.email || null,
        phoneNumbers: [
          { 
            number: this.tempPhoneNumber, 
            phoneTypeId: this.selectedTypeId
          }
        ]
      };
      
      this.contactService.addContact(contactToSave).subscribe({
        next: (createdContact: Contact) => {
          this.contacts = [...this.contacts, createdContact];
          this.finishFormAction(contactForm);
          console.log('Contact added successfully!');
        },
        error: (err: any) => console.error('Error adding contact:', err)
      });
    }
  }

  loadContactForEdit(contact: Contact): void {
    this.isEditMode = true;
    this.newContact = { ...contact };
    if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
        this.tempPhoneNumber = contact.phoneNumbers[0].number;
        this.selectedTypeId = contact.phoneNumbers[0].phoneTypeId || (this.phoneTypes[0]?.id || null);
    }
    const element = document.querySelector('form'); 
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  cancelEdit(contactForm: NgForm): void {
    this.finishFormAction(contactForm);
  }

  updateContact(contactForm: NgForm): void {
    if (this.newContact.id) {
      if (this.tempPhoneNumber) {
          this.newContact.phoneNumbers = [
            { 
              number: this.tempPhoneNumber, 
              phoneTypeId: this.selectedTypeId 
            }
         ];
      }

      if (this.newContact.email === '') {
        this.newContact.email = null;
      }

      this.contactService.updateContact(this.newContact.id, this.newContact).subscribe({
        next: () => {
          const index = this.contacts.findIndex(c => c.id === this.newContact.id);
          if (index !== -1) {
            this.contacts[index] = { ...this.newContact };
            this.contacts = [...this.contacts];
          }
          
          this.finishFormAction(contactForm);
        },
        error: (err) => console.error('Error updating contact:', err)
      });
    }
  }

  getDefaultNumber(contact: Contact): string {
    const defaultPhone = contact.phoneNumbers.find(pn => pn.isDefault);
    return defaultPhone ? defaultPhone.number : (contact.phoneNumbers[0]?.number || '-');
  }

  get filteredContacts(): Contact[] {
    if (!this.searchTerm) {
      return this.contacts;
    }

    const lowerSearchTerm = this.searchTerm.toLowerCase();

    return this.contacts.filter(contact =>
      contact.firstName.toLowerCase().includes(lowerSearchTerm) ||
      contact.lastName.toLowerCase().includes(lowerSearchTerm) ||
      contact.phoneNumbers?.some(p => p.number?.includes(lowerSearchTerm))
    );
  }

  private finishFormAction(contactForm: NgForm): void {
    this.isEditMode = false;
    this.tempPhoneNumber = '';
    this.newContact = { 
      firstName: '', 
      lastName: '', 
      address: null, 
      email: null, 
      phoneNumbers: [] 
    };

    if (this.phoneTypes.length > 0) {
      const mobileType = this.phoneTypes.find(t => t.name === 'Mobile');
      this.selectedTypeId = mobileType ? mobileType.id : this.phoneTypes[0].id;
    }

    contactForm.resetForm({
      phoneTypeId: this.selectedTypeId,
      firstName: '',
      lastName: '',
      address: null,
      email: null
    });
    this.cdr.detectChanges();
  }
}