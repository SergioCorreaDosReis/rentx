import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
} from "typeorm";

export class CreateSpecificationsCars1624477615202
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "specifications_cars",
				columns: [
					{ name: "car_id", type: "uuid" },
					{ name: "specification_id", type: "uuid" },
					{ name: "created_at", type: "timestamp", default: "now()" },
				],
			})
		);
		// outro jeito de criar ForeignKeys
		await queryRunner.createForeignKey(
			"specifications_cars",
			new TableForeignKey({
				name: "FKSpecifications",
				referencedTableName: "specifications",
				referencedColumnNames: ["id"],
				columnNames: ["specification_id"],
				onDelete: "SET NULL",
				onUpdate: "SET NULL",
			})
		);
		await queryRunner.createForeignKey(
			"specifications_cars",
			new TableForeignKey({
				name: "FKSpecificationsCar",
				referencedTableName: "cars",
				referencedColumnNames: ["id"],
				columnNames: ["car_id"],
				onDelete: "SET NULL",
				onUpdate: "SET NULL",
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey("specifications_cars", "FKSpecifications");

		await queryRunner.dropForeignKey(
			"specifications_cars",
			"FKSpecificationsCar"
		);
		await queryRunner.dropTable("specifications_cars");
	}
}