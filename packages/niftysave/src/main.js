import dotenv from 'dotenv'
export const main = async () => {
  const url = new URL(`./${process.argv[2]}.js`, import.meta.url)
  dotenv.config()
  const task = await import(url.href)
  await task.spawn({
    batchSize: Number(process.env['BATCH_SIZE'] || 50),
    budget: Number(process.env['TIME_BUDGET'] || 30) * 1000,
  })
}

main()
