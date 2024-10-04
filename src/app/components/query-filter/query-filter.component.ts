import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DxFilterBuilderComponent, DxFilterBuilderModule } from 'devextreme-angular';

export type Condition = Condition[] | string | number;
export type Fields = Record<string, string | number>[];

const fields: Fields = [
	{
		caption: 'Id',
		dataField: 'ContactId',
		dataType: 'number',
	}, {
		dataField: 'Name',
		dataType: 'string',
	}, {
		dataField: 'Surname',
		dataType: 'number',
	}, {
		dataField: 'Phone',
		dataType: 'number'
	}, {
		dataField: 'Age',
		dataType: 'number'
	}
];

@Component({
	selector: 'app-query-filter',
	standalone: true,
	imports: [DxFilterBuilderModule],
	templateUrl: './query-filter.component.html',
	styleUrl: './query-filter.component.scss'
})
export class QueryFilterComponent implements OnInit, OnChanges, DoCheck, OnDestroy, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {
	@ViewChild(DxFilterBuilderComponent)
	filterBuilderInstance: DxFilterBuilderComponent | undefined;
	
	private _name = 'QueryFilterComponent';
	private _filter: Condition = [];

	public fields: Fields = fields;

	@Input()
	get filter() { return this._filter; }
	set filter(value: Condition) {
		console.log(this._name, {previous: JSON.parse(JSON.stringify(this._filter)), next: value});
		this._filter = value;
	}

	@Output()
	apply: EventEmitter<Condition> = new EventEmitter<Condition>;

	applyFilter() {
		this.apply.emit(this.filter);
	}

	loadFilter() {
		this.filter = [
			"Name",
			"contains",
			"Matteo"
		];
	}

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