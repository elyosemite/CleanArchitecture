import IParkingLotRepository from "../Interfaces/IParkingLotRepository";

export default class GetParkingLotUseCase {
    parkingLotRepository: IParkingLotRepository;

    constructor(parkingLotRepository: IParkingLotRepository) {
        this.parkingLotRepository = parkingLotRepository;
    }

    async execute(code: string) {
        return await this.parkingLotRepository.getParkingLot(code);
    }
}