import { CHANGE_CATA_INDEX } from '../actions/header'
import { fromJS } from 'immutable'

const defaultData = fromJS({
  index: '0'
})

export default function headerData(state = defaultData, action) {
  switch(action.type){
    case CHANGE_CATA_INDEX:
      return state.set('index', action.num)
    default:
      return state
  }
}
