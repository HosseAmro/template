//------------------------------ Deep Partial ------------------------------//
type Deep_Partial<T> =
	//
	T extends Array<infer U> // is Array
		? T // Return Array
		: T extends object // is Object
			? {
					[K in keyof T]?: Deep_Partial<T[K]>; // Partial Object
				}
			: T;

//------------------------------ Deep Required ------------------------------//
type Deep_Required<T> =
	//
	T extends Array<infer U> // is Array
		? T // Return Array
		: T extends object // is Object
			? {
					[K in keyof T]-?: Deep_Required<T[K]>; // Partial Object
				}
			: T;

//------------------------------ Not Empty Str ------------------------------//
type Not_Empty_Str<T> = T extends '' ? never : T extends string ? T : never;

//------------------------------ Part Type ------------------------------//
type Part_Type<I, P extends Paths<I> | null, T = Deep_Required<I>> =
	//
	P extends null // Return T
		? T
		: P extends `${infer K}.${infer Rest}` // Serching for .
			? K extends keyof T // is include T
				? Part_Type<T[K], Rest> // Call Deeper
				: never
			: P extends keyof T // is include T
				? T[P] // Return Part
				: never;

//------------------------------ Paths ------------------------------//
type Paths<I, T = Deep_Required<I>> =
	//
	T extends Array<infer A> // is Array
		? never
		: T extends object // is Object
			? {
					[K in keyof T]-?: K extends string | number // is not Symbol
						? T[K] extends object // is Object
							? `${K}.${Paths<T[K]>}` | `${K}` // Call Deeper
							: `${K}`
						: never;
				}[keyof T] // Return all keys
			: never;

//------------------------------ Prettify ------------------------------//
type Prettify<T> = { [K in keyof T]: T[K] };
