import { Injectable } from "@angular/core";
import { contact } from "../models/contact";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "any" //serve come per creare un singleton
})

export class ContattiService {
    constructor(private http: HttpClient, private as: AuthService) {
        
    }

    getAll(): Observable<Array<contact>> {
        return this.http.get<Array<contact>>('https://664212903d66a67b343619c6.mockapi.io/contact/ContactApi', { 
            headers: new HttpHeaders("Authorization: " + this.as.getAuthHeader())
        });
    }

    put(model: contact): Observable<contact> {
        return this.http.put<contact>(`https://664212903d66a67b343619c6.mockapi.io/contact/ContactApi/${model.id}`, model);
    }

    delete(model: contact): Observable<contact> {
        return this.http.delete<contact>(`https://664212903d66a67b343619c6.mockapi.io/contact/ContactApi/${model.id}`);
    }

    post(model: contact): Observable<contact> {
        return this.http.post<contact>(`https://664212903d66a67b343619c6.mockapi.io/contact/ContactApi/`, model);
    }
}