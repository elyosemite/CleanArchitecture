import IParkingLotRepository from "../src/core/Interfaces/IParkingLotRepository";
import EnterParkingLotUseCase from "../src/core/UseCase/EnterParkingLotUseCase";
import GetParkingLotUseCase from "../src/core/UseCase/GetParkingLotUseCase";
import ParkingLotInMemoryRepository from "../src/infraestructure/repository/ParkingLotInMemoryRepository";
import ParkingLotPostgreSQLRepository from "../src/infraestructure/repository/ParkingLotPostgreSQLRepository";

test("Should enter parking lot", async function() {
    //const parkingLotRepository: IParkingLotRepository = new ParkingLotInMemoryRepository();
    const parkingLotRepository: IParkingLotRepository = new ParkingLotPostgreSQLRepository();
    const enterParkingLot = new EnterParkingLotUseCase(parkingLotRepository);
    const getParkingLot = new GetParkingLotUseCase(parkingLotRepository);

    const parkingLotBeforeEnter = await getParkingLot.execute("shopping");
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);

    await enterParkingLot.execute("shopping", "MMM-0001", new Date("2023-02-05:14:32:09"));

    const parkingLotAfterEnter = await getParkingLot.execute("shopping");

    expect(parkingLotAfterEnter.occupiedSpaces).toBe(1);
});

test("Should get parking lot", async function() {
    const parkingLotRepository: IParkingLotRepository = new ParkingLotPostgreSQLRepository();
    const getParkingLot = new GetParkingLotUseCase(parkingLotRepository);

    const parkingLot = await getParkingLot.execute("shopping");
    console.log(parkingLot);    
});

test.skip ("Should be closed", async function () {
    const repository: IParkingLotRepository = new ParkingLotInMemoryRepository();
    const getParkingLot = new GetParkingLotUseCase(repository);
    const enterParkingLot = new EnterParkingLotUseCase(repository);

    const parkingLotBeforeEnter = await getParkingLot.execute("shopping");

    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);

    await enterParkingLot.execute("shopping", "MMM-0090", new Date("2023-02-05:23:48:00"));

    const parkingLotAfterEnter = await getParkingLot.execute("shopping");

    expect(parkingLotAfterEnter.occupiedSpaces).toBe(1);
});

test.skip ("Should be full", async function () {
    const repository: IParkingLotRepository = new ParkingLotInMemoryRepository();
    const getParkingLot = new GetParkingLotUseCase(repository);
    const enterParkingLot = new EnterParkingLotUseCase(repository);

    const parkingLotBeforeEnter = await getParkingLot.execute("shopping");

    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);

    await enterParkingLot.execute("shopping", "MMM-0090", new Date("2023-02-05:09:48:00"));

    const parkingLotAfterEnter = await getParkingLot.execute("shopping");

    //expect(parkingLotAfterEnter.isFull).toBe(true);
    await expect(enterParkingLot.execute("shopping", "QWE-0986", new Date("2023-02-05:09:50:00"))).rejects.toThrow("The parking lot is full!");
});