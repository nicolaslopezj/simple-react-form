import {useContext} from 'react'
import {ValueContext} from './Contexts'

export default function useValue() {
  return useContext(ValueContext)
}
