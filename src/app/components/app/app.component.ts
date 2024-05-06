import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { contact } from '../../models/contact';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, CommonModule, FormsModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	title = 'ContactApp';
	contacts: Array<contact>;
	contactToEdit: contact | undefined;
	contactToAdd: contact | undefined;
	isViewMode = true;
	isAddPanelVisible = false;

	constructor() {
		this.contacts = [
			{
				name: 'Matteo',
				surname: 'Rovellini',
				age: 20,
				phoneNumber: '+39 3921087749',
				isViewMode: true
			},
			{
				name: 'Simone',
				surname: 'Ciapparelli',
				age: 18,
				phoneNumber: '+39 3885478946',
				isViewMode: true
			},
			{
				name: 'Mattia',
				surname: 'Marassi',
				age: 19,
				phoneNumber: '+39 3332785416',
				isViewMode: true
			}
		];
	}

	toggleViewMode(contatto: contact) {
		if(this.isViewMode) {
			this.contactToEdit = {
				name: contatto.name,
				surname: contatto.surname,
				age: contatto.age,
				phoneNumber: contatto.phoneNumber,
				isViewMode: contatto.isViewMode
			};
		} else {
			this.contactToEdit = undefined;
		}

		contatto.isViewMode = !contatto.isViewMode;
		this.isViewMode = contatto.isViewMode;
	}

	toggleAddPanel() {
		if(this.isAddPanelVisible) {
			this.contactToAdd = undefined;
		} else {
			this.contactToAdd = {
				name: '',
				surname: '',
				age: 18,
				phoneNumber: '',
				isViewMode: false
			}
		}

		this.isAddPanelVisible = !this.isAddPanelVisible;
	}

	salvaContatto(contatto: contact) {
		contatto.name = this.contactToEdit!.name;
		contatto.surname = this.contactToEdit!.surname;
		contatto.age = this.contactToEdit!.age;
		contatto.phoneNumber = this.contactToEdit!.phoneNumber;
		this.toggleViewMode(contatto);
	}

	eliminaContatto(contatto: contact) {
		this.contacts.splice(this.contacts.indexOf(contatto), 1);
	}

	aggiungiContatto() {
		this.contacts.push({
			name: this.contactToAdd!.name,
			surname: this.contactToAdd!.surname,
			age: this.contactToAdd!.age,
			phoneNumber: this.contactToAdd!.phoneNumber,
			isViewMode: true
		});

		this.toggleAddPanel();
	}
}
