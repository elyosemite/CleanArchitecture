import IParkingLotRepository from "../core/Interfaces/IParkingLotRepository";
import GetParkingLotUseCase from "../core/UseCase/GetParkingLotUseCase";
import ParkingLotPostgreSQLRepository from "../infraestructure/repository/ParkingLotPostgreSQLRepository";

export default class ParkingLotController {
    static async getParkingLot(params, body) {

        /**
         * Dica de Melhoria:
         * 
         *  - Você pode modificar e passar esse Repository via construtor.
         */
        const repository: IParkingLotRepository = new ParkingLotPostgreSQLRepository();
        const getParkingLot = new GetParkingLotUseCase(repository);

        /**
         * Há um acoplamento aqui com a entity chamada ParkingLot.
         * 
         * DICA: Uma excelente dica era você criar uma espécia de DTO (Data Transfer Object)
         * e retornar os dados. Ficaria mais ou menos assim:
         * 
         * Vamos supor que eu só quero as propriedades code & occupiedSpaces
         * 
         * class MyCustomParkingLotDTO {
         *    code: string;
         *    occupiedSpaces: number;
         * }
         * 
         * const parkingLot: MyCustomParkingLotDTO = await getParkingLot.execute(params.code);
         * 
         */ 
        const parkingLot = await getParkingLot.execute(params.code);
        return parkingLot;
    }
}
