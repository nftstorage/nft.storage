const createAction = async (route, data) =>
  await fetch(route, {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then((r) => r.json())

export const defaultTimeCommand = {
  timesliceSize: 6000000,
  rangeStartTime: '2019-6-1',
  rangeEndTime: '2019-6-2',
  source: 'the-graph',
}

export const sendTimeRangeToSlicer = (apiUrl, data = {}) =>
  createAction(`${apiUrl}/ingest/slice-queue/fill`, {
    ...data,
    ...defaultTimeCommand,
  })

export const purgeTimeSliceSQS = (apiUrl, data = {}) =>
  createAction(`${apiUrl}/ingest/slice-queue/purge`, data)

export const purgeFetchedRecordsSQS = (apiUrl, data = {}) =>
  createAction(`${apiUrl}/ingest/records/purge`, data)

export const purgePreprocessorSQS = (apiUrl, data = {}) =>
  createAction(`${apiUrl}/ingest/preprocessor/purge`, data)

export const purgePostProcessorSQS = (apiUrl, data = {}) =>
  createAction(`${apiUrl}/ingest/postprocessor/purge`, data)

export const getHealthReport = (apiUrl, data = {}) =>
  createAction(`${apiUrl}/report/health`, data)
