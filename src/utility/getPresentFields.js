import _ from 'underscore'

export default function (fields) {
  return _.filter(fields, field => {
    const props = field.component.props
    return !props.disabled
  }).map(field => field.field)
}
