import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        throw new Error("Method not implemented.");
    }
    
}