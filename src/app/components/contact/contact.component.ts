import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';
import { Subject, takeUntil } from 'rxjs';
import { ExponentialPipe } from '../../pipes/exponential.pipe';
import { ForbiddenNamesDirective } from '../../directives/forbidden-names.directive';

@Component({
	selector: 'app-contact',
	standalone: true,
	imports: [CommonModule, FormsModule, ExponentialPipe, ForbiddenNamesDirective],
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
		phone: '',
		email: '',
		age: 0
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

	toggleViewMode(form: NgForm) {
		if (this.isInEdit) {
			this.saveModification();
		}
		if (this.contact.contactId !== 0) {
			this.isInEdit = !this.isInEdit;
		} else {
			form.reset();
		}
	}

	saveModification() {
		// this._cs.updated$.pipe(takeUntil(this._dontDie$)).subscribe({
		// 	next: () => {
				
		// 	}
		// });

		if (this.contact.contactId === 0) {
			this._cs.create(this._dontDie$, this.contact);
		} else {
			this._cs.update(this._dontDie$, this.contact);
		}
	}

	removeContact() {
		if (this.isInEdit) {
			this.isInEdit = !this.isInEdit;
		} else {
			this._cs.delete(this._dontDie$, this.contact.contactId);
		}
	}
}
