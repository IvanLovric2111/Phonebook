import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // Dodaj ChangeDetectorRef
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { PhoneTypeService } from '../../services/phonetype.service';
import { PhoneType } from '../../models/phonetype.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.css'
})
export class ContactDetails implements OnInit {
  contact? : Contact;
  phoneTypes: PhoneType[] = [];
  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    private phoneTypeService: PhoneTypeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadContact();
    this.loadPhoneTypes();
  }

  loadContact(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.contactService.getContactById(id).subscribe({
      next: (data) => {
        this.contact = data;
        this.isEditMode = false;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error getting contact:', err)
    });
  }

  loadPhoneTypes(): void {
    this.phoneTypeService.getPhoneTypes().subscribe(types => {
      this.phoneTypes = types;
      this.cdr.detectChanges();
    });
  }

  getTypeName(id: number | undefined): string {
    if (id === undefined) return 'Unknown';
    const type = this.phoneTypes.find(t => t.id === id);
    return type ? type.name : 'Unknown';
  }

  addPhoneNumber() : void {
    if (this.contact) {
      const isFirst = !this.contact.phoneNumbers || this.contact.phoneNumbers.length === 0;
      this.contact.phoneNumbers.push({
        number: '',
        phoneTypeId: 1,
        isDefault: isFirst
      });
    }  
  }

  removePhoneNumber(index: number) : void{
    if (confirm('Are you sure you want to delete this number?')) {
      if (this.contact) {
        const wasDefault = this.contact.phoneNumbers[index].isDefault;
        this.contact.phoneNumbers.splice(index, 1);
        if (wasDefault && this.contact.phoneNumbers.length > 0) {
          this.contact.phoneNumbers[0].isDefault = true;
        }
        this.cdr.detectChanges();
      }
    }
  }

  setDefaultNumber(index: number) {
   if (this.contact) {
      this.contact.phoneNumbers.forEach(pn => pn.isDefault = false);
      this.contact.phoneNumbers[index].isDefault = true;
      this.cdr.detectChanges();
    }
  }
  
  loadNumbersForEdit() {
    this.isEditMode = true;
  }

  cancelChanges() {
    this.isEditMode = false;
    this.loadContact();
    this.cdr.detectChanges();
  }

  saveChanges(): void {
    if (this.contact) {
      this.contactService.updateContact(this.contact.id, this.contact).subscribe({
        next: () => {
          alert('Changes saved!');
          this.isEditMode = false;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error saving changes:', err)
      });
    }
  }
}