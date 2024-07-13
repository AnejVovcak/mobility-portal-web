'use client';

import React from 'react';

interface CustomCardProps {
  childComponent?: React.ReactNode;
  visible: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  onNext: () => void;
  onBack: () => void;
}

//custom card gets the question and options as props
//make the questions part of radio form
export default function CustomCard(props: CustomCardProps) {
	return (
		<div style={{ display: props.visible ? 'block' : 'none' }}>
			{props.childComponent}
			
			{!props.isFirst && <button onClick={props.onBack}>Back</button>}
			{!props.isLast && <button onClick={props.onNext}>Next</button>}
	  </div>
  );
}