import IParkingLotRepository from "../core/Interfaces/IParkingLotRepository";
import GetParkingLotUseCase from "../core/UseCase/GetParkingLotUseCase";
import ParkingLotPostgreSQLRepository from "../infraestructure/repository/ParkingLotPostgreSQLRepository";

export default class ParkingLotController {
    static async getParkingLot(params, body) {
        const repository: IParkingLotRepository = new ParkingLotPostgreSQLRepository();
        const getParkingLot = new GetParkingLotUseCase(repository);
        const parkingLot = await getParkingLot.execute(params.code);
        return parkingLot;
    }
}