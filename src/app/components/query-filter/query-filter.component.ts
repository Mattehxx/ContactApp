import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DxFilterBuilderModule } from 'devextreme-angular';

export type Condition = Condition[] | string | number;
export type Fields = Record<string, string | number>[];

const filter: Condition = [];

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
export class QueryFilterComponent {
	fields: Fields = fields;
	filter: Condition = filter;

	@Output()
	apply: EventEmitter<Condition> = new EventEmitter<Condition>;

	applyFilter() {
		this.apply.emit(this.filter);
	}
}