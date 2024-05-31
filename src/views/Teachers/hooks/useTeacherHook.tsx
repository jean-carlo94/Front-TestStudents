import { useEffect } from "react";
import { useTeacher } from "../../../store";


export const useTeacherHook = () => {
  
    const isLoading = useTeacher((state) => state.isLoading );
    const teachers = useTeacher((state) => state.teachers );
    const getTeachers = useTeacher((state) => state.getTeachers );

    useEffect(() => {
        getTeachers()
    }, [])

    return {
        isLoading,
        teachers
    };
}
