import { general_account, general_app } from '@context';

type App_Template_Props = {
	children: React.ReactNode;
};

export const AppTemplate: React.FC<App_Template_Props> = ({ children }) => {
	return (
		<>
			<general_account.Provider>
				<general_app.Provider>{children}</general_app.Provider>
			</general_account.Provider>
		</>
	);
};

export default AppTemplate;
