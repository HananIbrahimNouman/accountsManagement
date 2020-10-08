import "dotenv/config";

import AccountModel from "./models/account";
import { accounts } from "./init_data";
import  { connectDb } from "./models";

connectDb();

const seedDBWithAccounts = async () => {
	for(var i =0; i<accounts.length;i++){
		const {balance,status}=accounts[i];
		const accountInstance = new AccountModel({
			balance,
			status,
		});
		await accountInstance.save();

	}
	process.exit(0);
};

seedDBWithAccounts()

