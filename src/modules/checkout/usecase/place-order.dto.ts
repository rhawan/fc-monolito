export interface PlaceOrderInputDto {
    clientId: string;
    products: {
      productId: string;
    }[];
  }
  
  export interface PlaceOrderOutputDto {
    id: string;
    total: number;
    status: string,
    products: {
      productId: string;
    }[];
  }