import { create } from 'zustand';

import ApiTestV2 from '../../core/libs/apiTest';
import { IPagination, IStudent, ROUTES_API, validApiErrors } from '../../core';

enum studentsErrors {
    firsName = 'first_name',
    lastName = 'last_name',
    email = 'email',
    is_active = 'is_active',
}

interface State {
    //States
    student: IStudent | undefined;
    students: IStudent[];
    errors: studentsErrors[];
    isLoading: boolean;
    isError: boolean;
}

interface Actions {
    //Methods
    setStudents: (students: IStudent[]) => void;
    setStudent: (student: IStudent | undefined) => void;
    setErrors: (errors: string[]) => void;
    setLoading: (isLoading: boolean) => void;
    getStudents: () => Promise<void>;
    getStudent: (id: string) => Promise<void>;
    createStudent: (studentData: IStudent) => Promise<boolean>;
    updateStudent: (id: string, studentData: IStudent) => Promise<boolean>;
    deleteStudent: (id: string) => Promise<boolean>;
    reset: () => void;
}

const initialState: State = {
    student: undefined,
    students: [],
    errors: [],
    isLoading: false,
    isError: false,
}

export const useStudent = create<State & Actions>()((set, get) => ({
    //States
    ...initialState,
    //Methods
    setStudents: (students: IStudent[]) => {
        set(() => ({ students }));
    },

    setStudent: (student: IStudent | undefined) => {
        set(() => ({ student }));
    },

    setErrors: (errors: string[]) => {
        set(() => ({ errors: errors as studentsErrors[]}));
    },

    setLoading: (isLoading: boolean) => {
        set(() => ({ isLoading }));
    },

    getStudents: async () => {
        set(() => ({ isLoading: true}));

        try {
            const { data: pagination } = await ApiTestV2.get<IPagination<IStudent>>(`${ROUTES_API.STUDENTS}`);
            
            set(() => ({ students: pagination.data }));
        } catch (error) {
            console.log(error);
        }
        set(() => ({ isLoading: false}));
    },

    getStudent: async (id: string) => { 
        set(() => ({ isLoading: true}));

        try {
            const { data: student } = await ApiTestV2.get<IStudent>(`${ROUTES_API.STUDENTS}/${id}`);
            
            set(() => ({ student }));
        } catch (error) {
            set(() => ({ student: undefined }));
            set(() => ({ isError: true}));
        }

        set(() => ({ isLoading: false}));
        setTimeout(() => {
            set(() => ({ isError: false}));
            set(() => ({ errors: []}));
        }, 4000);
    },

    createStudent: async (studentData: IStudent) => {
        let result = true;
        set(() => ({ isLoading: true}));

        try {
            const { data: student } = await ApiTestV2.post<IStudent>(`${ROUTES_API.STUDENTS}`, studentData);

            set(() => ({ student }));
        } catch (error) {
            result = false;
            const descEnums = Object.values(studentsErrors) as string[];
            const errors = validApiErrors(error, descEnums);

            set(() => ({ student: undefined }));
            set(() => ({ isError: true}));

            if(errors?.length >= 1){
                set(() => ({ errors: errors as studentsErrors[]}));
            }
        }

        set(() => ({ isLoading: false}));
        setTimeout(() => {
            set(() => ({ isError: false}));
            set(() => ({ errors: []}));
        }, 4000);

        return result;
    },

    updateStudent: async (id:string, studentData: IStudent) => {
        let result = true;
        const studentState = get().student;
        set(() => ({ isLoading: true}));

        try {
            const { data: student } = await ApiTestV2.patch<IStudent>(`${ROUTES_API.STUDENTS}/${id}`, studentData);

            set(() => ({ student }));
        } catch (error) {
            result = false;
            const descEnums = Object.values(studentsErrors) as string[];
            const errors = validApiErrors(error, descEnums);

            set(() => ({ student: studentState }));
            set(() => ({ isError: true}));

            if(errors?.length >= 1){
                set(() => ({ errors: errors as studentsErrors[]}));
            }
        }

        set(() => ({ isLoading: false}));
        setTimeout(() => {
            set(() => ({ isError: false}));
            set(() => ({ errors: []}));
        }, 4000);

        return result;
    },

    deleteStudent: async (id: string) => {
        let result = true;
        set(() => ({ isLoading: true}));

        try {
            await ApiTestV2.delete<IStudent>(`${ROUTES_API.STUDENTS}/${id}`);

            set(() => ({ student:undefined }));
        } catch (error) {
            result = false;
            set(() => ({ isError: true}));
        }

        set(() => ({ isLoading: false}));
        return result;
    },

    reset: () => {        
      set(initialState);
    },
}))