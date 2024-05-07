import { Products } from "@prisma/client";

export const calculateProductsTotalPrice = (products: Products): number => {
    if ( products.discountPercentage === 0) {
        return Number(products.price);
    };

    const discount = Number(products.price) * (products.discountPercentage / 100);

    return Number(products.price) - discount;
};

export const formatCurrency = (value: number): string => {
    return `R$${Intl.NumberFormat("pt-BR", {
        currency: "BRL",
        minimumFractionDigits: 2,
    }).format(value)}`;
};