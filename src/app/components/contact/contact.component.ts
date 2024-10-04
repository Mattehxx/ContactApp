import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';
import { Subject } from 'rxjs';
import { ExponentialPipe } from '../../pipes/exponential.pipe';

@Component({
	selector: 'app-contact',
	standalone: true,
	imports: [CommonModule, FormsModule, ExponentialPipe],
	templateUrl: './contact.component.html',
	styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnChanges, DoCheck, OnDestroy, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {
	private _name = 'ContactComponent';
	private _dontDie$: Subject<void> = new Subject();
	private _cs = inject(ContactsService);

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

	ngOnInit() {
		console.log(`${this._name} - On Init`);
	}

	ngOnChanges(changes: SimpleChanges): void {
		console.log(`${this._name} - On Changes`, changes);
	}

	ngDoCheck(): void {
		console.log(`${this._name} - Do Check`);
	}

	ngOnDestroy(): void {
		console.log(`${this._name} - On Destroy`);
		this._dontDie$.next();
	}

	ngAfterContentInit(): void {
		console.log(`${this._name} - After Content Init`);
	}

	ngAfterContentChecked(): void {
		console.log(`${this._name} - After Content Checked`);
	}

	ngAfterViewInit(): void {
		console.log(`${this._name} - After View Init`);
	}

	ngAfterViewChecked(): void {
		console.log(`${this._name} - After View Checked`);
	}

	toggleViewMode() {
		if (this.isInEdit) this.saveModification();
		if (this.contact.contactId !== 0) this.isInEdit = !this.isInEdit;
	}

	saveModification() {
		if (this.contact.contactId === 0) {
			this._cs.create(this._dontDie$, this.contact);
			this.contact = {
				contactId: 0,
				name: '',
				surname: '',
				age: 0,
				phone: ''
			};
		}
		this._cs.update(this._dontDie$, this.contact);
	}

	removeContact() {
		if (this.isInEdit) {
			this.isInEdit = !this.isInEdit;
		} else {
			this._cs.delete(this._dontDie$, this.contact.contactId);
		}
	}
}
