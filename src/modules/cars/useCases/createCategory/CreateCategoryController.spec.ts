import { hash } from "bcryptjs";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;

describe("Create Category Controller", () => {
	beforeAll(async () => {
		connection = await createConnection();
		// Antes de cada teste roda as migrations
		await connection.runMigrations();

		const id = uuidv4();
		const password = await hash("admin", 8);

		await connection.query(
			`INSERT INTO USERS (id, name, email, password, "IsAdmin", created_at, driver_license)
		VALUES ('${id}','admin','admin@rentx.com','${password}',true,'now()', '1234567')
			 `
		);
	});

	afterAll(async () => {
		await connection.dropDatabase();
		await connection.close();
	});

	it("Should be able to create a new category", async () => {
		const responseToken = await request(app).post("/sessions").send({
			email: "admin@rentx.com",
			password: "admin",
		});

		const { token } = responseToken.body;

		const response = await request(app)
			.post("/categories")
			.send({
				name: "Category Supertest",
				description: "Category Supertest Description",
			})
			.set({ Authorization: `Bear ${token}` });

		expect(response.status).toBe(201);
	});

	it("Should not be able to create a new Category when category already exists", async () => {
		const responseToken = await request(app).post("/sessions").send({
			email: "admin@rentx.com",
			password: "admin",
		});

		const { token } = responseToken.body;

		const response = await request(app)
			.post("/categories")
			.send({
				name: "Category Supertest",
				description: "Category Supertest Description",
			})
			.set({ Authorization: `Bear ${token}` });

		expect(response.status).toBe(400);
	});
});
