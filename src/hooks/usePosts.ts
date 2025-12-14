import { useContext } from "react"

import { PostsContext } from "../context/PostsProvider"

{/* Use post context from PostsProvider file */}
export function usePosts() {

    const context = useContext(PostsContext)

    if (!context) {
        throw new Error("usePosts must be used within PostsProvider");
    }

    return context;
}