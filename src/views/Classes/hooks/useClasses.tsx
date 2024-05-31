import { useEffect } from "react";
import { useClass } from "../../../store";

export const useClasses = () => {
    const isLoading = useClass((state) => state.isLoading );
    const classes = useClass((state) => state.classes );
    const getClasses = useClass((state) => state.getClasses );

    useEffect(() => {
        getClasses()
    }, [])

    return {
        isLoading,
        classes
    };
}
