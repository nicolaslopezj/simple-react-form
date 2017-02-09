import filter from 'lodash/filter'

export default function (fields) {
  return filter(fields, field => {
    const props = field.component.props
    return !props.disabled
  }).map(field => field.field)
}
