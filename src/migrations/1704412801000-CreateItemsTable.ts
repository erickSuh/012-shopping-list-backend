import { QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateItemsTable1704412801000 {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'items',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'quantity',
            type: 'int',
            default: 0,
          },
          {
            name: 'isChecked',
            type: 'boolean',
            default: false,
          },
          {
            name: 'listId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'items',
      new TableForeignKey({
        columnNames: ['listId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'lists',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('items');
    const foreignKey = table?.foreignKeys.find((fk) =>
      fk.columnNames.includes('listId'),
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('items', foreignKey);
    }
    await queryRunner.dropTable('items');
  }
}
