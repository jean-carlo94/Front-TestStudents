import { create } from 'zustand';

import ApiTestV2 from '../../core/libs/apiTest';
import { IPagination, ITeacher, ROUTES_API, validApiErrors } from '../../core';

enum teachersErrors {
    firsName = 'first_name',
    lastName = 'last_name',
    email = 'email',
    is_active = 'is_active',
}

interface State {
    //States
    teacher: ITeacher | undefined;
    teachers: ITeacher[];
    errors: teachersErrors[];
    isLoading: boolean;
    isError: boolean;
}

interface Actions {
    //Methods
    setTeachers: (teachers: ITeacher[]) => void;
    setTeacher: (teacher: ITeacher | undefined) => void;
    setErrors: (errors: string[]) => void;
    setLoading: (isLoading: boolean) => void;
    getTeachers: () => Promise<void>;
    getTeacher: (id: string) => Promise<void>;
    createTeacher: (teacherData: ITeacher) => Promise<boolean>;
    updateTeacher: (id: string, teacherData: ITeacher) => Promise<boolean>;
    deleteTeacher: (id: string) => Promise<boolean>;
    reset: () => void;
}

const initialState: State = {
    teacher: undefined,
    teachers: [],
    errors: [],
    isLoading: false,
    isError: false,
}

export const useTeacher = create<State & Actions>()((set, get) => ({
    //States
    ...initialState,
    //Methods
    setTeachers: (teachers: ITeacher[]) => {
        set(() => ({ teachers }));
    },

    setTeacher: (teacher: ITeacher | undefined) => {
        set(() => ({ teacher }));
    },

    setErrors: (errors: string[]) => {
        set(() => ({ errors: errors as teachersErrors[]}));
    },

    setLoading: (isLoading: boolean) => {
        set(() => ({ isLoading }));
    },

    getTeachers: async () => {
        set(() => ({ isLoading: true}));

        try {
            const { data: pagination } = await ApiTestV2.get<IPagination<ITeacher>>(`${ROUTES_API.TEACHERS}`);
            
            set(() => ({ teachers: pagination.data }));
        } catch (error) {
            console.log(error);
        }
        set(() => ({ isLoading: false}));
    },

    getTeacher: async (id: string) => { 
        set(() => ({ isLoading: true}));

        try {
            const { data: teacher } = await ApiTestV2.get<ITeacher>(`${ROUTES_API.TEACHERS}/${id}`);
            
            set(() => ({ teacher }));
        } catch (error) {
            set(() => ({ teacher: undefined }));
            set(() => ({ isError: true}));
        }

        set(() => ({ isLoading: false}));
        setTimeout(() => {
            set(() => ({ isError: false}));
            set(() => ({ errors: []}));
        }, 4000);
    },

    createTeacher: async (teacherData: ITeacher) => {
        let result = true;
        set(() => ({ isLoading: true}));

        try {
            const { data: teacher } = await ApiTestV2.post<ITeacher>(`${ROUTES_API.TEACHERS}`, teacherData);

            set(() => ({ teacher }));
        } catch (error) {
            result = false;
            const descEnums = Object.values(teachersErrors) as string[];
            const errors = validApiErrors(error, descEnums);

            set(() => ({ teacher: undefined }));
            set(() => ({ isError: true}));

            if(errors?.length >= 1){
                set(() => ({ errors: errors as teachersErrors[]}));
            }
        }

        set(() => ({ isLoading: false}));
        setTimeout(() => {
            set(() => ({ isError: false}));
            set(() => ({ errors: []}));
        }, 4000);

        return result;
    },

    updateTeacher: async (id:string, teacherData: ITeacher) => {
        let result = true;
        const teacherState = get().teacher;
        set(() => ({ isLoading: true}));

        try {
            const { data: teacher } = await ApiTestV2.patch<ITeacher>(`${ROUTES_API.TEACHERS}/${id}`, teacherData);

            set(() => ({ teacher }));
        } catch (error) {
            result = false;
            const descEnums = Object.values(teachersErrors) as string[];
            const errors = validApiErrors(error, descEnums);

            set(() => ({ teacher: teacherState }));
            set(() => ({ isError: true}));

            if(errors?.length >= 1){
                set(() => ({ errors: errors as teachersErrors[]}));
            }
        }

        set(() => ({ isLoading: false}));
        setTimeout(() => {
            set(() => ({ isError: false}));
            set(() => ({ errors: []}));
        }, 4000);

        return result;
    },

    deleteTeacher: async (id: string) => {
        let result = true;
        set(() => ({ isLoading: true}));

        try {
            await ApiTestV2.delete<ITeacher>(`${ROUTES_API.TEACHERS}/${id}`);

            set(() => ({ teacher:undefined }));
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