'use client';

import React from 'react';
import {Button} from "@/app/ui/button";

interface QuestionCardProps {
    childComponent?: React.ReactNode;
    visible: boolean;
    isFirst?: boolean;
    isLast?: boolean;
    onNext: () => void;
    onBack: () => void;
    onSubmit: () => void;
}

export default function QuestionCard(props: QuestionCardProps) {
    return (
        <div className={`flex flex-col space-y-10`}>
            <div className={`p-4 bg-card-background rounded shadow-md w-[600px] h-80 flex flex-col justify-between
    ${props.visible ? 'block' : 'hidden'}`}>
                {props.childComponent}
            </div>

            <div className={`flex flex-row ml-auto ${props.visible ? 'block' : 'hidden'}`}>
                {!props.isFirst && <Button className="secondary" onClick={props.onBack}>Back</Button>}
                {props.isLast ? (
                    <Button className="primary" onClick={props.onSubmit}>Submit</Button>
                ) : (
                    <Button className="primary" onClick={props.onNext}>Next</Button>
                )}
            </div>
        </div>
    )
        ;
}
