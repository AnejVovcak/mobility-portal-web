'use client';

import React from 'react';
import { useState } from 'react';
import CustomCard from '../ui/CustomCard';
import WhereAreYouFrom from '../ui/questions/WhereAreYouFrom';
import { suportedCountries } from '../lib/countries';

export default function WizardPage() {
	const questions = [
		{
			question: "Where are you from?",
			options: ['Red', 'Green', 'Blue'],
		},
		{
			question: "Where are you going?",
			options: ['Dog', 'Cat', 'Bird'],
		},
		{
			question: "How long are you going to stay in ... ?",
			options: ['Pizza', 'Pasta', 'Burger'],
		},
		{
			question: "What's your nationality as shown on your passport or travel document?",
			options: ['Pizza', 'Pasta', 'Burger'],
		},
		{
			question: "Where are you currently employed?",
			options: ['Pizza', 'Pasta', 'Burger'],
		},
		{
			question: "Where are you going to be employed?",
			options: ['Pizza', 'Pasta', 'Burger'],
		},
		{
			question: "Where are you currently ensured?",
			options: ['Pizza', 'Pasta', 'Burger'],
		},
		{
			question: "What is your tax residence?",
			options: ['Pizza', 'Pasta', 'Burger'],
		}
	];
	
	//index of the question
	// Use useState to manage the index of the question
	const [index, setIndex] = useState(0);

	//function for the next button
	const handleNext = () => {
		setIndex(index + 1);
	};

	//function for the back button
	const handleBack = () => {
		setIndex(index - 1);
	};

	return (
		//foor loop trough the questions
		<div>
			{questions.map((question, i) => (
				<CustomCard
					key={i}
					childComponent={WhereAreYouFrom( {countries: suportedCountries} )}
					visible={index === i}
					isFirst={i === 0}
					isLast={i === questions.length - 1}
					onNext={handleNext}
					onBack={handleBack}
				/>
			))}
		</div>
	);
}