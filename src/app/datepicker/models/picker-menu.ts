// tslint:disable-next-line: no-empty-interface
export interface IPickerMenu {}

export interface IDatepickerMenu extends IPickerMenu {
	display: string;
	month: string;
	year: number;
}

export interface IDaterangepickerMenu extends IPickerMenu {
	leftMenu: IDatepickerMenu;
	rightMenu: IDatepickerMenu;
}
