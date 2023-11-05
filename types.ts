export type Producto = {
    id: string;
    name: string;
    stock: number;
    price: number;
    description: string;
  };

  export type Cliente = {
    id: string;
    name: string;
    cif: string;
  };

  export type Factura = {
    id: string;
    client: string;
    products: Producto[];
    total: number;
  };