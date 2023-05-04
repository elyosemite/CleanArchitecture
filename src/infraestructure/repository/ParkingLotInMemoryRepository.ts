import ParkingLotAdapter from "../../adapters/ParkingLotAdapter";
import ParkingLot from "../../core/Entity/ParkingLot";
import IParkingLotRepository from "../../core/Interfaces/IParkingLotRepository";

export default class ParkingLotInMemoryRepository implements IParkingLotRepository {
    
    parkingLots = [
        {
            code: "shopping",
            capacity: 1,
            open_hour: 8,
            close_hour: 22
        }
    ];

    parkedCars = [];
    
    async getParkingLot(code: string): Promise<ParkingLot> {
        const parkingLotData = this.parkingLots.find(parkingLot => parkingLot.code === code);
        
        const occupiedSpaces = this.parkedCars.length;

        const parkingLot = ParkingLotAdapter.create(parkingLotData.code, parkingLotData.capacity, parkingLotData.open_hour, parkingLotData.close_hour, occupiedSpaces);

        return Promise.resolve(parkingLot);
    }

    async saveParkedCar(code: string, plate: string, date: Date): Promise<void> {
        this.parkedCars.push({ code, plate, date});
    }
}