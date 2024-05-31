import { AxiosError } from "axios";

export const validApiErrors = (error:unknown, arrayEnum: string[]) => {
    const errorsDef: string[] = [];

    if(error instanceof AxiosError){

        if(error.response?.data?.errors){
            const apiErrors = error.response?.data?.errors as object;
            const errorsKeys = Object.keys(apiErrors);

            for (const desEnum of arrayEnum) {
                if(!errorsKeys.includes(desEnum)) continue;
                errorsDef.push(desEnum);
            }

        }
    }
    
    return errorsDef;
}