import { Component, inject, Input } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';

@Component({
	selector: 'app-contact',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './contact.component.html',
	styleUrl: './contact.component.scss'
})
export class ContactComponent {
	private cs = inject(ContactsService);

	@Input()
	contact: Contact = {
		contactId: 0,
		name: '',
		surname: '',
		age: 0,
		phone: ''
	};
	@Input()
	isInEdit: boolean = false;

	constructor () {}

	toggleViewMode() { 
		if (this.isInEdit) this.saveModification();
		if (this.contact.contactId !== 0) this.isInEdit = !this.isInEdit;
	}

	saveModification() {
		if (this.contact.contactId === 0) {
			this.cs.create(this.contact);
			this.contact = {
				contactId: 0,
				name: '',
				surname: '',
				age: 0,
				phone: ''
			};
		}
		this.cs.update(this.contact);
	}

	removeContact() {
		if (this.isInEdit) {
			this.isInEdit = !this.isInEdit;
		} else {
			this.cs.delete(this.contact.contactId);
		}
	}
}
