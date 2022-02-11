import { putOnProcessorBus } from './utils'

async function doGetMetaData(data) {
  // TODO
  return true
}

export async function getMetaData(event) {
  const data = event.detail

  console.log(data)

  if (doGetMetaData(data)) {
    putOnProcessorBus('getMetaData', data)
  } else {
    putOnProcessorBus('failure', data)
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: Get MetaData' + data,
    }),
  }
}

const exampleRecord = {
  last_processed: 'Thu Feb 10 2022 21:17:30 GMT-0600 (Central Standard Time)',
  contract_supports_eip721_metadata: true,
  contract_symbol: 'MAB007',
  mint_time: '1559377209',
  contract_id: '0x45862289631b8935dc124ea26e035eee03bc8382',
  owner_id: '0xfd5873b0e11dfa1f848995e34fc017de9f5a3d98',
  block_hash:
    '0xc118a46ee828668fa37fdc420f98b0e7896d6b1166871cbc063a07de6ebe434b',
  block_number: 7872641,
  created_at: 1644549453877,
  contract_name: "Cravus 'The Pede' Longbody",
  token_uri:
    'https://www.etherlegends.com/metadata/menandbeasts/007_Cravus.json',
  token_id: '2',
  updated_at: 'Thu Feb 10 2022 21:17:30 GMT-0600 (Central Standard Time)',
  id: '0x45862289631b8935dc124ea26e035eee03bc8382_2',
  inserted_at: 'Thu Feb 10 2022 21:17:30 GMT-0600 (Central Standard Time)',
  steps: ['consume_from_preprocessor_queue', 'analyze'],
}
