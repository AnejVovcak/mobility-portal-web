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
    <div className={`question-card ${props.visible ? 'block' : 'hidden'}`}>
      {props.childComponent}
      
      <div className="button-group">
          {!props.isFirst && <Button onClick={props.onBack}>Back</Button>}
          {props.isLast ? (
            <Button onClick={props.onSubmit}>Submit</Button>
          ) : (
            <Button className="button ml-auto" onClick={props.onNext}>Next</Button>
          )}
      </div>
    </div>
  );
}
