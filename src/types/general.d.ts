//------------------------------ Action Callbacks ------------------------------//
declare type Action_Callbacks<T> = {
	statusChangeCB?: (status: Service_Status) => unknown;
	failCB?: (res?: T) => unknown;
	okCB?: (res?: T) => unknown;
};

//------------------------------ Any Object ------------------------------//
type Any_Object = { [key: string | number | symbol]: unknown };

//------------------------------ Service Status ------------------------------//
declare type Service_Status = 'initial' | 'loading' | 'failure' | 'success';
