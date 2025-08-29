import {ValueContext} from '../Contexts'

export interface Props {
  children: (value: any) => JSX.Element
}

export default function WithValue(props: Props) {
  return <ValueContext.Consumer>{value => {
     // value should be at least an empty object. This means the context is not mounted yet
    if (!value) return null
    return props.children(value)
  }}</ValueContext.Consumer>
}
