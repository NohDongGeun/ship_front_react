export interface ISearchItem {
    name: string;
    value: string | number;
    id: string | number;
}

export interface ICheckItem {
    id: string | number;
    name: string;
    value: string;
    isChecked: boolean;
}
