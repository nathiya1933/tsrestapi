import { Request, Response } from 'express';
import ProductRepository from '../repository/product.repository';
import Product from '../models/product.model';

export default class ProductController {

    async create(req: Request, res: Response) {
        try {
            const product: Product = req.body;
            const createdProduct = await ProductRepository.create(product);
            res.status(201).json(createdProduct);
        } catch (error) {
            res.status(500).json({ message: 'Error creating product' });
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const products = await ProductRepository.findAll();
            res.status(200).json(products);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error retrieving products' });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const id: number = parseInt(req.params.id);
            const product = await ProductRepository.findById(id);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving product' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id: number = parseInt(req.params.id);
            const product: Product = req.body;
            const updatedRows = await ProductRepository.update(id, product);
            if (updatedRows > 0) {
                res.status(200).json({ message: 'Product updated successfully' });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating product' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id: number = parseInt(req.params.id);
            const deletedRows = await ProductRepository.delete(id);
            if (deletedRows > 0) {
                res.status(200).json({ message: 'Product deleted successfully' });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product' });
        }
    }
}