import { RowDataPacket } from "mysql2";

export default interface Product extends RowDataPacket {
    id?: number;
    name: string;
    description: string;
    instockQuantity: number;
    price: number;
  }
  