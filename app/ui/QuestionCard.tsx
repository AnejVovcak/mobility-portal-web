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

//custom card gets the question and options as props
//make the questions part of radio form
export default function QuestionCard(props: QuestionCardProps) {
	return (
		<div style={{ display: props.visible ? 'block' : 'none' }}>
			{props.childComponent}
			
			{!props.isFirst && <button onClick={props.onBack}>Back</button>}
			{!props.isLast && <button onClick={props.onNext}>Next</button>}

      {props.isLast && <button onClick={props.onSubmit}>Submit</button>}
	  </div>
  );
}