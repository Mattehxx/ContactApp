import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, inject, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContactsService } from '../../services/contacts.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ContactComponent } from "../contact/contact.component";
import { Subject } from 'rxjs';
import { Condition, QueryFilterComponent } from "../query-filter/query-filter.component";
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, ContactComponent, QueryFilterComponent, HighlightDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnChanges, DoCheck, OnDestroy, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {
  private _name = 'AppComponent';
  get name() { return this._name; }
  private _appColor = 'red';
  get appColor() { return this._appColor; }
  private _dontDie$: Subject<void> = new Subject();

  public cs = inject(ContactsService);
  public appFilter: Condition = [];

  applyFilterOnApp(filter: Condition) {
    console.log(filter);
  }

  ngOnInit() {
    console.log(`${this._name} - On Init`);
    this.cs.get(this._dontDie$);
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
}
