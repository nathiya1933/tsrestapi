import  Product  from '../models/product.model';
import connection from '../config';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { OkPacket } from 'mysql2/promise';

class ProductRepository {
    async create(product: Product): Promise<Product> {
        const [result] = await connection.query<ResultSetHeader>(
            'INSERT INTO product (id, name, description, instockQuantity, price) VALUES (?,?, ?, ?, ?)',
            [product.id, product.name, product.description, product.instockQuantity, product.price]
        );
        console.log(product);
        return { id: result.insertId, ...product };
    }

    async findAll(): Promise<Product[]> {
        const [rows] = await connection.query('SELECT * FROM products');
        console.log(rows);
        return rows as Product[];
    }

    async findById(id: number): Promise<Product | undefined> {
        const [rows] = await connection.query<RowDataPacket[]>(
            'SELECT * FROM product WHERE id = ?',
            [id]
        );

        if (rows.length > 0) {
            return rows[0] as Product;
        } else {
            return undefined;
        }
    }

    async update(id: number, product: Product): Promise<number> {
        const [result] = await connection.query<OkPacket>(
            'UPDATE products SET name = ?, description = ?, instockQuantity = ?, price = ? WHERE id = ?',
            [product.name, product.description, product.instockQuantity, product.price, id]
        );
        return result.affectedRows;
    }

    async delete(id: number): Promise<number> {
        const [result] = await connection.query<ResultSetHeader>(
            'DELETE FROM products WHERE id = ?',
            [id]
        );
        return result.affectedRows;
    }
}

export default new ProductRepository();