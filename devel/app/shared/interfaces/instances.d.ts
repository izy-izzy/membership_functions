declare interface IMembershipFunction{
	name: string,
	lowerStart: number,
	lowerTop1: number,
	lowerTop2: number,
	lowerEnd: number,
	upperStart: number,
	upperTop1: number,
	upperTop2: number,
	upperEnd: number
}

declare interface IMembershipFunctionProcessed extends IMembershipFunction{
	start : number;
	middleOne: number;
	middleTwo: number;
	end: number;
	isSelected: boolean;
}

declare interface IMembershipFunctionStatistics{
	minimum: number;
	maximum: number;
	range: number;
}