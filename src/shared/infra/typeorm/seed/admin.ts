import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import createConnection from "../index";

async function create() {
	const connection = await createConnection("localhost");

	const id = uuidv4();
	const password = await hash("admin", 8);

	await connection.query(`INSERT INTO USERS (id, name, email, password, "IsAdmin", created_at, driver_license)
	VALUES ('${id}','admin','admin@rentx.com','${password}',true,'now()', '1234567')
		 `);
	await connection.close();
}

create().then(() => console.log("User admin created!"));
