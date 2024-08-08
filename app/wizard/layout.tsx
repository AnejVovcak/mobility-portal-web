import {NavBar} from "@/app/ui/NavBar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-svh">
            <NavBar/>
            {children}
        </div>
    );
}