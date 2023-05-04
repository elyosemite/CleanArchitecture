import ParkingLotAdapter from "../../adapters/ParkingLotAdapter";
import ParkingLot from "../../core/Entity/ParkingLot";
import IParkingLotRepository from "../../core/Interfaces/IParkingLotRepository";

import db from "../database/postgreSQLConfig";

export default class ParkingLotPostgreSQLRepository implements IParkingLotRepository {

    async getParkingLot(code: string): Promise<ParkingLot> {
        const parkingLotData = await db.oneOrNone("select *, (select count(*)::int from example.parking_car pc where pc.code = pl.code) as occupied_spaces from example.parking_lot pl where pl.code = $1", [code]);
        return ParkingLotAdapter.create(parkingLotData.code, parkingLotData.capacity, parkingLotData.open_hour, parkingLotData.close_hour, parkingLotData.occupied_spaces);
    }

    async saveParkedCar(code: string, plate: string, date: Date): Promise<void> {
        await db.none("insert into example.parking_car (code, plate, date) values ($1, $2, $3)", [code, plate, date]);
    }
}