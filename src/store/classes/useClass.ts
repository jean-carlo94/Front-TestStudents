import { create } from 'zustand';

import ApiTestV2 from '../../core/libs/apiTest';
import { IPagination, IClass, ROUTES_API, validApiErrors } from '../../core';

enum classesErrors {
    name = 'name',
}

interface State {
    //States
    classEntity: IClass | undefined;
    classes: IClass[];
    errors: classesErrors[];
    isLoading: boolean;
    isError: boolean;
}

interface Actions {
    //Methods
    setClasses: (classes: IClass[]) => void;
    setClass: (classEntity: IClass | undefined) => void;
    setErrors: (errors: string[]) => void;
    setLoading: (isLoading: boolean) => void;
    getClasses: () => Promise<void>;
    getClass: (id: string) => Promise<void>;
    createClass: (ClassData: IClass) => Promise<boolean>;
    updateClass: (id: string, ClassData: IClass) => Promise<boolean>;
    deleteClass: (id: string) => Promise<boolean>;
    reset: () => void;
}

const initialState: State = {
    classEntity: undefined,
    classes: [],
    errors: [],
    isLoading: false,
    isError: false,
}

export const useClass = create<State & Actions>()((set, get) => ({
    //States
    ...initialState,
    //Methods
    setClasses: (classes: IClass[]) => {
        set(() => ({ classes }));
    },

    setClass: (classEntity: IClass | undefined) => {
        set(() => ({ classEntity }));
    },

    setErrors: (errors: string[]) => {
        set(() => ({ errors: errors as classesErrors[]}));
    },

    setLoading: (isLoading: boolean) => {
        set(() => ({ isLoading }));
    },

    getClasses: async () => {
        set(() => ({ isLoading: true}));

        try {
            const { data: pagination } = await ApiTestV2.get<IPagination<IClass>>(`${ROUTES_API.CLASSES}`);
            
            set(() => ({ classes: pagination.data }));
        } catch (error) {
            console.log(error);
        }
        set(() => ({ isLoading: false}));
    },

    getClass: async (id: string) => { 
        set(() => ({ isLoading: true}));

        try {
            const { data: classEntity } = await ApiTestV2.get<IClass>(`${ROUTES_API.CLASSES}/${id}`);
            
            set(() => ({ classEntity }));
        } catch (error) {
            set(() => ({ classEntity: undefined }));
            set(() => ({ isError: true}));
        }

        set(() => ({ isLoading: false}));
        setTimeout(() => {
            set(() => ({ isError: false}));
            set(() => ({ errors: []}));
        }, 4000);
    },

    createClass: async (ClassData: IClass) => {
        let result = true;
        set(() => ({ isLoading: true}));

        try {
            const { data: classEntity } = await ApiTestV2.post<IClass>(`${ROUTES_API.CLASSES}`, ClassData);

            set(() => ({ classEntity }));
        } catch (error) {
            result = false;
            const descEnums = Object.values(classesErrors) as string[];
            const errors = validApiErrors(error, descEnums);

            set(() => ({ classEntity: undefined }));
            set(() => ({ isError: true}));

            if(errors?.length >= 1){
                set(() => ({ errors: errors as classesErrors[]}));
            }
        }

        set(() => ({ isLoading: false}));
        setTimeout(() => {
            set(() => ({ isError: false}));
            set(() => ({ errors: []}));
        }, 4000);

        return result;
    },

    updateClass: async (id:string, ClassData: IClass) => {
        let result = true;
        const classState = get().classEntity;
        set(() => ({ isLoading: true}));

        try {
            const { data: classEntity } = await ApiTestV2.patch<IClass>(`${ROUTES_API.CLASSES}/${id}`, ClassData);

            set(() => ({ classEntity }));
        } catch (error) {
            result = false;
            const descEnums = Object.values(classesErrors) as string[];
            const errors = validApiErrors(error, descEnums);

            set(() => ({ classEntity: classState }));          
            set(() => ({ isError: true}));

            if(errors?.length >= 1){
                set(() => ({ errors: errors as classesErrors[]}));
            }
        }

        set(() => ({ isLoading: false}));
        setTimeout(() => {
            set(() => ({ isError: false}));
            set(() => ({ errors: []}));
        }, 4000);

        return result;
    },

    deleteClass: async (id: string) => {
        let result = true;
        set(() => ({ isLoading: true}));

        try {
            await ApiTestV2.delete<IClass>(`${ROUTES_API.CLASSES}/${id}`);

            set(() => ({ classEntity:undefined }));
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