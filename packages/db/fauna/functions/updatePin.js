import {
  Lambda,
  Let,
  Query,
  Select,
  Var,
  Create,
  Ref,
  Collection,
  Foreach,
  Map,
  Update,
} from 'faunadb'
import { findOrCreate } from '../utils/common'

export default {
  name: 'updatePin',
  body: Query(
    Lambda(
      ['id', 'data'],
      Let(
        {
          pinRef: Ref(Collection('Pin'), Var('id')),
          pinLocations: Map(
            Select('locations', Var('data')),
            Lambda(
              'location',
              findOrCreate(
                'unique_PinLocation_peerId',
                Select('peerId', Var('location')),
                Create('PinLocation', {
                  data: Var('location'),
                })
              )
            )
          ),
          relationPinLocation: Foreach(
            Var('pinLocations'),
            Lambda(
              'locationRef',
              findOrCreate(
                'pinLocation_pins_by_pin_and_pinLocation',
                [Var('pinRef'), Var('locationRef')],
                Create('pinLocation_pins', {
                  data: {
                    pinID: Var('pinRef'),
                    pinLocationID: Var('locationRef'),
                  },
                })
              )
            )
          ),
        },
        // TODO update needs needs to be explicit or extra data will be saved like the locations array
        Update(Var('pinRef'), { data: Var('data') })
      )
    )
  ),
}
