export interface IPagination<T> {
    data: T[];
    meta: IMeta;
}

export interface IMeta {
    page:            number;
    take:            number;
    itemCount:       number;
    pageCount:       number;
    hasPreviousPage: boolean;
    hasNextPage:     boolean;
}
