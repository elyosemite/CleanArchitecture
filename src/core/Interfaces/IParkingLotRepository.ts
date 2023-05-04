import ParkingLot from "../Entity/ParkingLot";

export default interface IParkingLotRepository {
    getParkingLot(code: string): Promise<ParkingLot>
    saveParkedCar(code: string, plate: string, date: Date): Promise<void>
}