import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title: string = 'datepicker';

	date: Date = new Date();

	button(): void {
		const date: Date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
		console.log(date);
	}

}
