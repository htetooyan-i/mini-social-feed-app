import { Appearance, ColorSchemeName } from "react-native";
import { useEffect, useState } from "react";

export function useSystemTheme() {
    const [scheme, setScheme] = useState<ColorSchemeName>(Appearance.getColorScheme())

    useEffect(() => {
        const sub = Appearance.addChangeListener(({ colorScheme }) => {
            setScheme(colorScheme);
        })
        return () => sub.remove();
    }, []);

    return scheme;
}