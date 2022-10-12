import { useCallback, useState } from "react";

export const useToggle = (initialValue = false): [boolean, () => void] => {
    const [value, setValue] = useState<boolean>(initialValue);

    const toggle = useCallback(() => setValue(!value), [value]);
    return [value, toggle];
};
