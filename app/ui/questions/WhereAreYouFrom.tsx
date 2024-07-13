'use client';

interface WhereAreYouFromProps {
	countries: { [code: string]: string }[];
}

export default function WhereAreYouFrom(props: WhereAreYouFromProps) {
	return (
		<div>
			<h2>Where are you from?</h2>

			{/* Loop through the countries and use radio form */}
			<form>
				{props.countries.map((country) => {
					const code = Object.keys(country)[0];
					const name = country[code];
					return (
						<div key={code}>
							<input type="radio" id={code} name="country" value={code} />
							<label htmlFor={code}>{name}</label>
						</div>
					);
				})}
			</form>
			
		</div>
	);
}