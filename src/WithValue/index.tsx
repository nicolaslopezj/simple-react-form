import {ValueContext} from '../Contexts'

export interface Props {
  children: (value: any) => JSX.Element
}

export default function WithValue(props: Props) {
  return <ValueContext.Consumer>{value => props.children(value)}</ValueContext.Consumer>
}
