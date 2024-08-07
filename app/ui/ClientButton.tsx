"use client";

import React from 'react';
import { Button } from '@/app/ui/button';

interface ClientButtonProps {
    href?: string;
    text: string;
}

export default function ClientButton({ href, text }: ClientButtonProps) {
    const handleClick = () => {
        window.location.href = href || '/';
    };

    return (
        <Button onClick={handleClick}>
            {text}
        </Button>
    );
}
