'use client';

import React from 'react';

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
          {!props.isFirst && <button className="button" onClick={props.onBack}>Back</button>}
          {props.isLast ? (
            <button className="button" onClick={props.onSubmit}>Submit</button>
          ) : (
            <button className="button ml-auto" onClick={props.onNext}>Next</button>
          )}
      </div>
    </div>
  );
}
