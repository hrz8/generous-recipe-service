import { set as _set } from 'lodash'
import { ServiceBroker } from 'moleculer'
import HealthCheckService from '../../../src/services/health.service'

jest.mock('../../../src/utils/response/success', () => ({
    SuccessResponse: jest.fn().mockImplementation((v) => ({
        meta: {},
        result: v,
    })),
}))

describe("Test 'health check' service", () => {
    const broker = new ServiceBroker({
        logger: false,
    })

    broker.createService(HealthCheckService)

    beforeAll(() => broker.start())
    afterAll(() => broker.stop())

    describe("Test 'health-check.check' action", () => {
        it("should return with '[ { result: 1 } ]'", async () => {
            _set(
                broker,
                'dbService.query',
                jest.fn(async () => [{ result: 1 }])
            )
            const res = await broker.call(
                'health-check.check'
            )
            expect(res).toEqual({
                result: [{ result: 1 }],
                meta: {},
            })
        })
    })
})
