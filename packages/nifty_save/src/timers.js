export const sleep = async (time) =>
  await new Promise((resolve) => setTimeout(resolve, time))
