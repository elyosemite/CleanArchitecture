import ParkedCar from "../Entity/ParkedCar";
import IParkingLotRepository from "../Interfaces/IParkingLotRepository";

export default class EnterParkingLotUseCase {
    parkingLotRepository: IParkingLotRepository;

    constructor(parkingLotRepository: IParkingLotRepository) {
        this.parkingLotRepository = parkingLotRepository;
    }

    async execute(code: string, plate: string, date: Date) {
        // Localizamos o ParkingLot
        const parkingLot = await this.parkingLotRepository.getParkingLot(code);

        const parkedCar = new ParkedCar(code, plate, date);

        if (!parkingLot.isOpen(parkedCar.date)) throw new Error("The parking lot is close!");

        if (parkingLot.isFull()) throw new Error("The parking lot is full!");

        await this.parkingLotRepository.saveParkedCar(parkedCar.code, parkedCar.plate, parkedCar.date);

        return parkingLot;
    }
}