//-------------------------------- Action_Callbacks --------------------------------//
declare type Action_Callbacks = {
	statusChangeCB?: (status: Service_Status) => unknown;
	failCB?: (res?: unknown) => unknown;
	okCB?: (res?: unknown) => unknown;
};

//-------------------------------- Any_Object --------------------------------//
type Any_Object = { [key: string | number | symbol]: unknown };

//-------------------------------- Service_Status --------------------------------//
declare type Service_Status = 'initial' | 'loading' | 'failure' | 'success';
