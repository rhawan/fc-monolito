import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import ProductRepository from "./product.repository";

jest.setTimeout(10000); // Increase the timeout to 10 seconds globally

describe("ProductRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        try {
            // Initialize Sequelize with in-memory SQLite
            sequelize = new Sequelize({
                dialect: "sqlite",
                storage: ":memory", // In-memory storage for testing
                logging: false,
                sync: { force: true }
            });

            await sequelize.addModels([ProductModel]);
            console.log("Syncing database...");
            await sequelize.sync(); // Wait for sync to finish
            console.log("Database synced.");
        } catch (error) {
            console.error("Error setting up Sequelize:", error);
        }
    });

    afterEach(async () => {
        try {
            console.log("Closing Sequelize connection...");
            await sequelize.close();
            console.log("Sequelize connection closed.");
        } catch (error) {
            console.error("Error closing Sequelize connection:", error);
        }
    });

    it("should create a product", async () => {
        const productProps = {
            id: new Id("1"),
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 1
        };
        const product = new Product(productProps);
        const productRepository = new ProductRepository();
        await productRepository.add(product);

        const productDb = await ProductModel.findOne({
            where: { id: productProps.id.id }
        });

        expect(productProps.id.id).toEqual(productDb.id);
        expect(productProps.name).toEqual(productDb.name);
        expect(productProps.description).toEqual(productDb.description);
        expect(productProps.purchasePrice).toEqual(productDb.purchasePrice);
        expect(productProps.stock).toEqual(productDb.stock);
    });

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        
        // Ensure creation is awaited
        await ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    
        const product = await productRepository.find("1");
    
        expect(product.id.id).toEqual("1");
        expect(product.name).toEqual("Product 1");
        expect(product.description).toEqual("Product 1 description");
        expect(product.purchasePrice).toEqual(100);
        expect(product.stock).toEqual(10);
    });
});
