// To ingest anything:
// you need the scraping fetch (get stuff)
// you need the write post (write stuff)
// config
// 1. scrape batch size (read batch to inbox)  [inbox is the name of your one buffer]
// 2. write batchs size (write to db from inbox)
// 3. highwatermark - size you allow the buffer to be (working queue size)

// cursor - where you currently are in time (can be mintTime)
// needs to be ble to restart in the right place.

module.exports.run = function (event, context) {}
