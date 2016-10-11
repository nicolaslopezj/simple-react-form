import React from 'react'
import _ from 'underscore'
import ArrayComponent from '../Array'
import ObjectComponent from '../Object'
import DotObject from 'dot-object'
import {docToModifier} from '../utility'
import generateInputsForKeys from '../utility/generateInputsForKeys'
import getPresentFields from '../utility/getPresentFields'

const propTypes = {
  /**
   * The object that has the values of the form.
   */
  state: React.PropTypes.object,
  /**
   * Alias of state
   */
  doc: React.PropTypes.object,

  /**
   * A callback that fires when the form value changes.
   * The argument will be the value.
   */
  onChange: React.PropTypes.func,

  /**
   * The Mongo Collection for the form.
   */
  collection: React.PropTypes.object,

  /**
   * The simple schema for the form.
   */
  schema: React.PropTypes.object,

  /**
   * The type of the form. insert or update.
   */
  type: React.PropTypes.oneOf(['insert', 'update', 'function']),

  /**
   * Set to true to enable automatic form submission for a type="update" form.
   * When the form change event is emitted, the change will be automatically
   * saved to the database.
   */
  autoSave: React.PropTypes.bool,

  /**
   * Set to false for an insert or update form to keep empty string values when
   * cleaning the form document.
   */
  removeEmptyStrings: React.PropTypes.bool,

  /**
   * Set to false for an insert or update form to skip filtering out unknown
   * properties when cleaning the form document.
   */
  filter: React.PropTypes.bool,

  /**
   * Set to false for an insert or update form to keep leading and trailing
   * spaces for string values when cleaning the form document.
   */
  trimStrings: React.PropTypes.bool,

  /**
   * Set to false for an insert or update form to skip autoconverting property
   * values when cleaning the form document.
   */
  autoConvert: React.PropTypes.bool,

  /**
   * Replace the current document if the one in the props changes.
   */
  replaceOnChange: React.PropTypes.bool,

  /**
   * Clear the form after a successful insert.
   * Only works on insert and function types.
   */
  clearOnSuccess: React.PropTypes.bool,

  /**
   * Keep arrays when updating.
   */
  keepArrays: React.PropTypes.bool,

  /**
   * A function that is called when the form action finished with success.
   */
  onSuccess: React.PropTypes.func,

  /**
   * A function that is called when the form action error.
   */
  onError: React.PropTypes.func,
  /**
   * A function that is called when the form is submitted.
   */
  onSubmit: React.PropTypes.func,

  /**
   * Id of the form.
   */
  formId: React.PropTypes.string,

  /**
   * The component for the array wrapper
   */
  arrayComponent: React.PropTypes.any,

  /**
   * The component for the object wrapper
   */
  objectComponent: React.PropTypes.any,

  /**
   * Show errors in the console
   */
  logErrors: React.PropTypes.bool,

  /**
   * Commit only changes
   */
  commitOnlyChanges: React.PropTypes.bool,

  /**
   * Minimum wait time between auto saves
   */
  autoSaveWaitTime: React.PropTypes.number,

  /**
   * Fields to be omited
   */
  omit: React.PropTypes.arrayOf(React.PropTypes.string),

  /**
   * Validate schema. Only for onSubmit
   */
  validate: React.PropTypes.bool,

  /**
   * The child components
   */
  children: React.PropTypes.any,

  /**
   * Render form tag
   */
  useFormTag: React.PropTypes.bool
}

const defaultProps = {
  type: 'function',
  keepArrays: true,
  autoSave: false,
  removeEmptyStrings: true,
  trimStrings: true,
  autoConvert: true,
  filter: true,
  replaceOnChange: true,
  clearOnSuccess: false,
  formId: 'defaultFormId',
  arrayComponent: ArrayComponent,
  objectComponent: ObjectComponent,
  logErrors: true,
  commitOnlyChanges: false,
  autoSaveWaitTime: 500,
  omit: [],
  validate: true,
  useFormTag: true
}

const childContextTypes = {
  schema: React.PropTypes.object,
  doc: React.PropTypes.object,
  onChange: React.PropTypes.func.isRequired,
  errorMessages: React.PropTypes.object,
  form: React.PropTypes.any.isRequired
}

export default class Form extends React.Component {

  constructor (props) {
    super(props)
    const state = this.props.state || this.props.doc || {}
    this.state = {
      doc: _.clone(state),
      changes: {},
      validationContext: this.getSchema() ? this.getSchema().newContext() : null,
      errorMessages: {}
    }
    this.fields = []
    this.autoSave = _.debounce(this.submit.bind(this), this.props.autoSaveWaitTime)
    this.errorMessages = {}
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onValueChange = this.onValueChange.bind(this)
  }

  getChildContext () {
    return {
      schema: this.getSchema(),
      doc: this.state.doc,
      onChange: this.onValueChange,
      errorMessages: this.state.errorMessages,
      form: this
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.replaceOnChange || this.props.formId !== nextProps.formId) {
      const state = this.props.state || this.props.doc || {}
      const nextState = nextProps.state || nextProps.doc || {}
      if (!_.isEqual(state, nextState)) {
        this.setState({ doc: _.clone(nextState), changes: {} })
      }
    }
  }

  componentDidUpdate (prevProps, prevState) {
    //  Console.log('did update form', prevProps, prevState)
  }

  getSchema () {
    if (this.props.schema) {
      return this.props.schema
    } else if (this.props.collection) {
      return this.props.collection.simpleSchema()
    } else {
      //  Throw new Error('no schema was specified.')
    }
  }

  /*
   * This is necesarry to allow the form to filter the fields when updating
   */
  registerComponent ({ field, component }) {
    this.fields.push({ field, component })
  }

  unregisterComponent (fieldName) {
    const index = _.findIndex(this.fields, ({field}) => field === fieldName)
    this.fields.splice(index, 1)
  }

  callChildFields ({ method, input }) {
    this.fields.map((field) => {
      if (_.isFunction(field.component[method])) {
        field.component[method](input)
      }
    })
  }

  onCommit (error, docId) {
    this.setState({ errorMessages: {} })
    if (error) {
      if (error.reason === 'INVALID') {
        this.handleServerError(error)
      } else {
        this.handleError()
      }
      if (this.props.logErrors) {
        console.log(`[form-${this.props.formId}-error]`, error)
      }

      if (this.props.onError) {
        this.props.onError(error)
      }
    } else {
      this.callChildFields({ method: 'onSuccess' })
      if (_.isFunction(this.props.onSuccess)) {
        this.props.onSuccess(docId)
      }
      if (this.props.clearOnSuccess) {
        this.clearForm()
      } else {
        // if clearOnSuccess is false, we still need to clear the changes
        this.setState({ changes: {} })
      }
    }
  }

  getValidationOptions () {
    return {
      validationContext: this.props.formId,
      filter: this.props.filter,
      autoConvert: this.props.autoConvert,
      removeEmptyStrings: this.props.removeEmptyStrings,
      trimStrings: this.props.trimStrings
    }
  }

  onFormSubmit (event) {
    event.preventDefault()
    this.submit()
  }

  submit () {
    const data = this.props.commitOnlyChanges ? this.state.changes : this.state.doc
    if (this.props.type === 'insert') {
      const dot = DotObject.dot(this.state.doc)
      const doc = DotObject.object(dot)
      this.props.collection.insert(doc, this.getValidationOptions(), this.onCommit.bind(this))
    } else if (this.props.type === 'update') {
      const presentFields = getPresentFields(this.fields)
      var modifier = docToModifier(data, { keepArrays: this.props.keepArrays, fields: presentFields })
      if (!_.isEqual(modifier, {})) {
        this.props.collection.update(this.state.doc._id, modifier, this.getValidationOptions(), this.onCommit.bind(this))
      } else {
        this.callChildFields({ method: 'onSuccess' })
        if (_.isFunction(this.props.onSuccess)) {
          this.props.onSuccess()
        }
      }
    } else if (this.props.type === 'function') {
      const doc = DotObject.object(DotObject.dot(data))
      var isValid = true
      if (this.props.validate && this.getSchema()) {
        isValid = this.getSchema().namedContext(this.getValidationOptions().validationContext).validate(doc)
      }
      if (isValid) {
        if (!_.isFunction(this.props.onSubmit)) {
          throw new Error('You must pass a onSubmit function or set the form type to insert or update')
        }
        var success = this.props.onSubmit(doc)
        if (success === false) {
          this.onCommit('onSubmit error')
        } else {
          this.onCommit()
        }
      } else {
        this.onCommit('Validation error')
      }
    }
  }

  cleanErrorMessages () {
    this.errorMessages = {}
    this.setState({ errorMessages: {} })
  }

  clearForm () {
    this.setState({doc: {}, changes: {}})
  }

  setErrorMessage (fieldName, message) {
    const errorMessages = _.clone(this.errorMessages)
    errorMessages[fieldName] = message
    this.errorMessages = errorMessages
    this.setState({ errorMessages })
  }

  setErrorsWithContext (context) {
    var invalidKeys = context.invalidKeys()
    var errorMessages = {}
    invalidKeys.map((field) => {
      errorMessages[field.name] = context.keyErrorMessage(field.name)
    })

    if (this.props.logErrors) {
      console.log(`[form-${this.props.formId}-error-messages]`, errorMessages)
    }

    if (this.props.onError) {
      this.props.onError(errorMessages)
    }

    this.errorMessages = errorMessages
    this.setState({ errorMessages })
  }

  handleError () {
    var context = this.getSchema().namedContext(this.getValidationOptions().validationContext)
    this.setErrorsWithContext(context)
  }

  handleServerError (error) {
    const errors = JSON.parse(error.details)
    let errorMessages = {}
    errors.forEach(fieldError => {
      errorMessages[fieldError.name] = this.getSchema().messageForError(fieldError.type, fieldError.name, null, fieldError.value)
    })
    if (this.props.logErrors) {
      console.log(`[form-${this.props.formId}-error-messages]`, errorMessages)
    }

    if (this.props.onError) {
      this.props.onError(error)
    }

    this.errorMessages = errorMessages
    this.setState({ errorMessages })
  }

  isRN () {
    return navigator.product === 'ReactNative'
  }

  onValueChange (fieldName, newValue) {
    //  newValue = typeof newValue === 'undefined' ? null : newValue
    DotObject.del(fieldName, this.state.doc)
    var doc = DotObject.str(`val.${fieldName}`, newValue, { val: this.state.doc }).val
    DotObject.del(fieldName, this.state.changes)
    var changes = DotObject.str(`val.${fieldName}`, newValue, { val: this.state.changes }).val
    this.setState({ doc, changes })

    if (this.props.autoSave) {
      this.autoSave()
    }

    if (_.isFunction(this.props.onChange)) {
      this.props.onChange(this.state.doc, this.state.changes)
    }
  }

  generateChildren () {
    const schema = this.getSchema()
    if (!schema) {
      throw new Error('You must pass a schema or manually render the fields')
    }
    return generateInputsForKeys(schema._firstLevelSchemaKeys, '', schema, this.props.omit)
  }

  renderInsideForm () {
    if (!this.props.children) {
      return this.generateChildren()
    } else {
      return this.props.children
    }
  }

  render () {
    if (this.props.useFormTag) {
      return (
        <form onSubmit={this.onFormSubmit}>
          {this.renderInsideForm()}
        </form>
      )
    } else {
      if (this.isRN()) {
        return this.renderInsideForm()
      } else {
        return <div>{this.renderInsideForm()}</div>
      }
    }
  }
}

Form.propTypes = propTypes
Form.defaultProps = defaultProps
Form.childContextTypes = childContextTypes
