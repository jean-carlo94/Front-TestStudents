import { useEffect } from "react";
import { useStudent } from "../../../store/students/useStudent";

export const useStudentsHook = () => {
    const isLoading = useStudent((state) => state.isLoading );
    const students = useStudent((state) => state.students );
    const getStudents = useStudent((state) => state.getStudents );

    useEffect(() => {
        getStudents()
    }, [])

    return {
        isLoading,
        students
    };
}
