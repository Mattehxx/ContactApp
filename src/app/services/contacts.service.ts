import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Contact } from '../models/contact.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class ContactsService {
  private http = inject(HttpClient);
  private env = 'https://localhost:7023/api/Contact/';
  public contacts$ = new BehaviorSubject<Array<Contact>>([]);

  constructor() {
    this.get();
  }

  get() {
    this.http.get<Array<Contact>>(`${this.env}`).subscribe((res) => {
      this.contacts$.next(res);
    });
  }

  getSingle(contactId: number) {
    this.http.get<Array<Contact>>(`${this.env}${contactId}`).subscribe((res) => {
      this.contacts$.next(res);
    });
  }

  create(model: Contact) {
    this.http.post<Contact>(`${this.env}`, model).subscribe((res) => {
      this.contacts$.value.push(res);
    });
  }

  update(model: Contact) {
    this.http.put<Contact>(`${this.env}${model.contactId}`, model).subscribe((res) => {
      let oldContact = this.contacts$.value.find(c => c.contactId === model.contactId);
      oldContact = res;
    });
  }

  delete(id: number) {
    this.http.delete<Contact>(`${this.env}${id}`).subscribe((res) => {
      this.contacts$.next(this.contacts$.value.filter(c => c.contactId !== res.contactId));
    });
  }
}
