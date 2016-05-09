import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import * as Colors from 'material-ui/styles/colors';
import {FieldType, registerType} from 'simple-react-form';
import styles from '../styles';

const propTypes = {
  /**
   * Allow to select multiple items.
   */
  multi: React.PropTypes.bool,
  /**
   * Meteor method that recieves the search string and returns an array of items
   * with "label" and "value" attributes.
   */
  methodName: React.PropTypes.string.isRequired,
  /**
   * Meteor method that recieves the value and must return the label. If
   * ```multi``` is set to true, it will recieve an array and it must return an
   * with the labels in the same order.
   */
  labelMethodName: React.PropTypes.string.isRequired,
  /**
   * A Meteor connection.
   */
  connection: React.PropTypes.any,
  /**
   * Time with no changes that activates the search.
   */
  waitTime: React.PropTypes.number,
  /**
   * A function that creates a document and pass the value in a callback
   */
  create: React.PropTypes.func,
  /**
   * A function that returns the create label
   */
  createLabel: React.PropTypes.func,
  /**
   * A function that returns if a value can be created
   */
  canCreate: React.PropTypes.func,
};

const defaultProps = {
  multi: false,
  waitTime: 200,
  createLabel: (search) => `Create "${search}"`,
  canCreate: () => true,
};

class SelectWithMethodComponent extends FieldType {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      selected: null,
      items: [],
      knownLabels: [],
      response: [],
      isCalling: false,
      hasTitleFor: null,
    };

    this.throttledSearch = _.throttle(this.search.bind(this), this.props.waitTime, { leading: false });
  }

  componentDidMount() {
    this.updateLabel(this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    //Console.log('will recieve props', nextProps);
    if (this.props.value !== nextProps.value && nextProps.value) {
      this.updateLabel(nextProps.value);
    }
  }

  updatedSelectedItems(values) {
    var missingLabels = [];
    var selectedItems = [];
    var knownLabels = this.state.knownLabels;
    var valueArray = _.isArray(values) ? values : [values];

    if (!values) return;

    valueArray.map((value) => {
      if (!this.state.knownLabels[value]) {
        missingLabels.push(value);
      }
    });

    if (missingLabels.length > 0) {
      var labelMethodName = this.props.labelMethodName;
      var connection = this.props.connection || Meteor;
      var labelsMethod = this.props.multi ? missingLabels : missingLabels[0];
      connection.call(labelMethodName, labelsMethod, (error, response) => {
        if (error) {
          console.log(`[select-with-method] Recieved error from "${labelMethodName}"`, error);
        } else {
          if (this.props.multi) {
            missingLabels.map((value, index) => {
              knownLabels[value] = response[index];
            });
          } else {
            knownLabels[labelsMethod] = response;

            //Console.log('setting to response', response);
            this.refs.input.setState({ searchText: response });
          }

          this.setState({ knownLabels });
        }
      });
    } else {
      if (!this.props.multi) {
        //Console.log('setting to known label', knownLabels[values]);
        this.refs.input.setState({ searchText: knownLabels[values] });
      }
    }
  }

  updateLabel(value) {
    if (!this.props.multi && !value) {
      //Console.log('clean on update');
      this.refs.input.setState({ searchText: '' });
      return;
    }

    this.updatedSelectedItems(value);
  }

  search(text) {
    //Console.log('searching with text', text);
    this.setState({ selected: null, isCalling: true });

    if (!this.props.multi) {
      this.props.onChange(null);
    }

    var methodName = this.props.methodName;
    var connection = this.props.connection || Meteor;
    connection.call(methodName, text, (error, response) => {
      if (error) {
        console.log(`[select-with-method] Recieved error from "${methodName}"`, error);
      } else {
        response = response || [];
        this.setState({ response, isCalling: false });
        var dataSource = response.map((item) => {
          return {
            text: item.value,
            value: <MenuItem primaryText={item.label} />,
          };
        });
        if (_.isFunction(this.props.create) && text && this.props.canCreate(text)) {
          dataSource.push({
            text: text,
            value: <MenuItem primaryText={this.props.createLabel(text)} />,
          })
        }
        this.setState({ dataSource });
      }
    });
  }

  onUpdateText(text) {
    this.throttledSearch(text);
  }

  createItem(item) {
    this.props.create(item, (value) => {
      if (this.props.multi) {
        this.refs.input.setState({ searchText: '' });
        if (_.contains(this.props.value || [], value)) {
          return;
        }
        this.props.onChange(_.union(this.props.value || [], [value]));
      } else {
        this.props.onChange(value);
      }
    });
  }

  onItemSelected(item, index) {
    if (index == this.state.response.length && _.isFunction(this.props.create)) {
      return this.createItem(item);
    }
    var selected = this.state.response[index];
    if (this.props.multi) {
      //Console.log('clean on item selected');
      this.refs.input.setState({ searchText: '' });
      if (_.contains(this.props.value || [], selected.value)) return;
      this.props.onChange(_.union(this.props.value || [], [selected.value]));
    } else {
      this.props.onChange(selected ? selected.value : null);
    }

    if (selected) {
      this.state.knownLabels[selected.value] = selected.label;
      this.setState({ knownLabels: this.state.knownLabels });
    }
  }

  removeItem(value) {
    this.props.onChange(_.without(this.props.value || [], value));
  }

  onFocus() {
    //Console.log('on focus');
    this.setState({ open: true });
    this.search('');
  }

  onBlur() {
    this.setState({ open: false });
    if (!this.props.value) {
      //This.refs.input.setState({ searchText: '' });
    }
  }

  renderItems() {
    return (_.isArray(this.props.value) ? this.props.value : []).map((value, index) => {
      var label = this.state.knownLabels[value] || 'Loading...';
      return (
        <div onClick={() => this.removeItem(value)} key={value} style={styles.tag}>
          {label}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <AutoComplete
          ref='input'
          fullWidth={true}
          searchText=''
          dataSource={this.state.dataSource}
          filter={AutoComplete.noFilter}
          onUpdateInput={this.onUpdateText.bind(this)}
          floatingLabelText={this.props.useHint ? null : this.props.label}
          hintText={this.props.useHint ? this.props.label : null}
          onNewRequest={this.onItemSelected.bind(this)}
          errorText={this.props.errorMessage}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
          open={this.state.open}
          triggerUpdateOnFocus={true}
          disabled={this.props.disabled}
          {...this.passProps} />
        <div>
          {this.renderItems()}
        </div>
      </div>
    );
  }
}

SelectWithMethodComponent.propTypes = propTypes;
SelectWithMethodComponent.defaultProps = defaultProps;

registerType({
  type: 'select-with-method',
  component: SelectWithMethodComponent,
  description: 'A select input that connects to a Meteor Method to fetch data.',
});
