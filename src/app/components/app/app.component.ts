import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { contact } from '../../models/contact';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContattiService } from '../../services/contatti.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { login, register } from '../../models/auth.model';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule],
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
	loginUser: login | undefined;
	isLogged: boolean;
	isloginView = true;
	registerUser: register;

	constructor(public _cs: ContattiService, public _as: AuthService) {
		this.isLogged = _as.isUserLogged();
		if(!this.isLogged) {
			this.loginUser = {
				username: '',
				password: ''
			}
		}
		this.registerUser = {
			username: '',
			email: '',
			password: '',
			confirmPassword: ''
		}

		this.contacts = [];
		/* this.contacts = [
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
		]; */

		this._cs.getAll().subscribe({
			next: (contattiArray) => {
				//quì ci sarà la response della chiamata http
				this.contacts = contattiArray.map(p => {
					p.isViewMode = true;
					return p;
				});
			} 
		})
	}

	login() {
		this._as.login(this.loginUser!).subscribe({
			next: () => {
				this.isLogged = true;
			}
		});
	}

	register() {
		this._as.register(this.registerUser).subscribe({
			next: () => {
				this.isloginView = true;
			}
		})
	}

	toggleViewMode(contatto: contact) {
		if(this.isViewMode) {
			this.contactToEdit = {
				id: contatto.id,
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
				id: "",
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
		this._cs.put(this.contactToEdit!).subscribe({
			next: () => {
				contatto.id = this.contactToEdit!.id;
				contatto.name = this.contactToEdit!.name;
				contatto.surname = this.contactToEdit!.surname;
				contatto.age = this.contactToEdit!.age;
				contatto.phoneNumber = this.contactToEdit!.phoneNumber;
				this.toggleViewMode(contatto);
			}
		});
	}

	eliminaContatto(contatto: contact) {
		this._cs.delete(contatto).subscribe({
			next: (model) => {
				this.contacts.splice(this.contacts.findIndex(c => c.id == model.id), 1);
			}
		});
	}

	aggiungiContatto() {
		this._cs.post(this.contactToAdd!).subscribe({
			next: (model) => {
				this.contacts.push({
					id: this.contactToAdd!.id,
					name: this.contactToAdd!.name,
					surname: this.contactToAdd!.surname,
					age: this.contactToAdd!.age,
					phoneNumber: this.contactToAdd!.phoneNumber,
					isViewMode: true
				});
		
				this.toggleAddPanel();
			},
			error: (error) => {
				console.error(error);
			}
		});
	}
}
