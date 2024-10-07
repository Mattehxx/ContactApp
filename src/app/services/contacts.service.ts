import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Injectable({
	providedIn: 'any'
})
export class ContactsService {
	private _http = inject(HttpClient);
	private _env = 'https://localhost:7023/api/Contact/';

	public contacts$ = new BehaviorSubject<Array<Contact>>([]);
	public updated$: Subject<void> = new Subject<void>();

	get(dontDie$: Subject<void>) {
		this._http.get<Array<Contact>>(`${this._env}`)
			.pipe(takeUntil(dontDie$))
			.subscribe((res) => {
				this.contacts$.next(res);
			});
	}

	getSingle(dontDie$: Subject<void>, contactId: number) {
		this._http.get<Array<Contact>>(`${this._env}${contactId}`)
			.pipe(takeUntil(dontDie$))
			.subscribe((res) => {
				this.contacts$.next(res);
			});
	}

	create(dontDie$: Subject<void>, model: Contact) {
		this._http.post<Contact>(`${this._env}`, model)
			.pipe(takeUntil(dontDie$))
			.subscribe((res) => {
				this.contacts$.value.push(res);
				this.updated$.next();
			});
	}

	update(dontDie$: Subject<void>, model: Contact) {
		this._http.put<Contact>(`${this._env}${model.contactId}`, model)
			.pipe(takeUntil(dontDie$))
			.subscribe((res) => {
				let oldContact = this.contacts$.value.find(c => c.contactId === model.contactId);
				oldContact = res;
				this.updated$.next();
			});
	}

	delete(dontDie$: Subject<void>, id: number) {
		this._http.delete<Contact>(`${this._env}${id}`)
			.pipe(takeUntil(dontDie$))
			.subscribe((res) => {
				this.contacts$.next(this.contacts$.value.filter(c => c.contactId !== res.contactId));
			});
	}
}
