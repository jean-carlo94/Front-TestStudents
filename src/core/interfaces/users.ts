export interface IUser {
    id?:            string;
    firsName:       string;
    lastName:       string;
    email:          string;
    is_active?:     boolean;
    version?:       number;
    created_at?:    Date;
    updated_at?:    Date;
}

export interface ITeacher extends IUser {}
export interface IStudent extends IUser {}