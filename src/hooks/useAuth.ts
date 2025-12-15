import { onAuthStateChanged, User} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../services/firebase";

export function useAuth() {

    // use user and loading as state
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true)

    // change user and loading value if user change state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        })

        // stop onAuthStateChanged listener if app is closed
        return unsubscribe;
    }, []);

    return { user, loading };
}
