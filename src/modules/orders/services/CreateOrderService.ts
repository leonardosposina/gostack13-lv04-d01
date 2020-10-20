import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customerExists = await this.customersRepository.findById(customer_id);

    if (!customerExists) throw new AppError('This user does not exists', 400);

    const existingProducts = await this.productsRepository.findAllById(
      products,
    );

    if (products.length !== existingProducts.length)
      throw new AppError('Invalid product(s) found in this order', 400);

    const productsWithInvalidQuantity = existingProducts.filter(
      productInStock =>
        productInStock.quantity <
        products.filter(
          productInOrder => productInOrder.id === productInStock.id,
        )[0].quantity,
    );

    if (productsWithInvalidQuantity.length)
      throw new AppError('Invalid product quantity found in this order', 400);

    const productsList = products.map(productInOrder => ({
      product_id: productInOrder.id,
      quantity: productInOrder.quantity,
      price: existingProducts.filter(
        productInStock => productInStock.id === productInOrder.id,
      )[0].price,
    }));

    const order = this.ordersRepository.create({
      customer: customerExists,
      products: productsList,
    });

    const updatedProductsQuantity = products.map(productInOrder => ({
      id: productInOrder.id,
      quantity:
        existingProducts.filter(
          productInStock => productInStock.id === productInOrder.id,
        )[0].quantity - productInOrder.quantity,
    }));

    await this.productsRepository.updateQuantity(updatedProductsQuantity);

    return order;
  }
}

export default CreateOrderService;
