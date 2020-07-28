export interface Order {
    $key: string;
    nameOrder: string;
    linkOrder: string
    discount: number;
    createdBy:string;
    createdDate:Date;
}
