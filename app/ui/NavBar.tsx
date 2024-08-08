'use client';
import {Logo} from "@/app/ui/Logo";

export const NavBar = () => {
    return (
        <div className="flex max-w-full justify-between items-center h-[74px] px-64 shadow-lg shadow-ligh-gray">
            <div className="flex items-center space-x-4">
                <div className="cursor-pointer" onClick={() => window.location.href = '/'}>
                    <Logo/>
                </div>
            </div>
        </div>
    );
}