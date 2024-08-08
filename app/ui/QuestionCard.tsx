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
    <div className={`p-4 bg-white rounded shadow-md w-[450px] h-80 flex flex-col justify-between
    ${props.visible ? 'block' : 'hidden'}`}>

      {props.childComponent}
      
      <div className="flex justify-between mt-4">
          {!props.isFirst && <Button onClick={props.onBack}>Back</Button>}
          {props.isLast ? (
            <Button onClick={props.onSubmit}>Submit</Button>
          ) : (
            <Button className="ml-auto" onClick={props.onNext}>Next</Button>
          )}
      </div>
    </div>
  );
}
