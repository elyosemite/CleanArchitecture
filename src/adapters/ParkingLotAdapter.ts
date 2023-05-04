import ParkingLot from "../core/Entity/ParkingLot";

export default class ParkingLotAdapter {
    static create(code: string, capacity: number, opneHour: number, closeHour: number, occupiedSpaces: number) {
        return new ParkingLot(code, capacity, opneHour, closeHour, occupiedSpaces);
    }
}