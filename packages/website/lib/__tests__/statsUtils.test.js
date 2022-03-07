import decorateAdditionalCalculatedValues, {
  calcuateGrowthRate,
} from '../statsUtils'

const fakeData = {
  ok: true,
  data: {
    uploads_past_7_total: 2001137,
    uploads_nft_total: 685281,
    uploads_multipart_total: 1447292,
    uploads_remote_total: 11067087,
    uploads_blob_total: 12406191,
    uploads_car_total: 17425593,
  },
}

describe('Stats Utils unit tests', () => {
  it('Should calculate growth rate correctly', () => {
    expect(parseFloat(calcuateGrowthRate(100, 50))).toBe(100.0)
  })

  it('Should decorate upload totals correctly, given fake data', () => {
    const stats = decorateAdditionalCalculatedValues(fakeData.data)
    expect(stats.growthRate).toBe('4.88')
    expect(stats.totalUploads).toBe(43031444)
  })
})
