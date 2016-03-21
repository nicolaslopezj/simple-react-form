import React from 'react';
import AutoComplete from 'material-ui/lib/auto-complete';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Colors from 'material-ui/lib/styles/colors';
import {FieldType, registerType} from 'simple-react-form';
import styles from '../styles';

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

    this.throttledSearch = _.throttle(this.search.bind(this), this.mrf.throttleTime || 200, { leading: false });
  }

  componentDidMount() {
    this.updateLabel(this.props.value);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
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
      var labelMethodName = this.mrf.labelMethodName;
      var connection = this.mrf.connection || Meteor;
      var labelsMethod = this.mrf.multi ? missingLabels : missingLabels[0];
      connection.call(labelMethodName, labelsMethod, (error, response) => {
        if (error) {
          console.log(`[select-with-method] Recieved error from "${labelMethodName}"`, error);
        } else {
          if (this.mrf.multi) {
            missingLabels.map((value, index) => {
              knownLabels[value] = response[index];
            });
          } else {
            knownLabels[labelsMethod] = response;
            console.log('setting to response', response);
            this.refs.input.setState({ searchText: response });
          }

          this.setState({ knownLabels });
        }
      });
    } else {
      if (!this.mrf.multi) {
        console.log('setting to known label', knownLabels[values]);
        this.refs.input.setState({ searchText: knownLabels[values] });
      }
    }
  }

  updateLabel(value) {
    if (!this.mrf.multi && !value) {
      console.log('clean on update');
      this.refs.input.setState({ searchText: '' });
      return;
    }

    this.updatedSelectedItems(value);
  }

  search(text) {
    console.log('searching with text', text);
    this.setState({ selected: null, isCalling: true });

    if (!this.mrf.multi) {
      this.props.onChange(null);
    }

    var methodName = this.props.fieldSchema.mrf.methodName;
    var connection = this.props.fieldSchema.mrf.connection || Meteor;
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
        this.setState({ dataSource });
      }
    });
  }

  onUpdateText(text) {
    this.throttledSearch(text);
  }

  onItemSelected(item, index) {
    var selected = this.state.response[index];
    if (this.mrf.multi) {
      console.log('clean on item selected');
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
    console.log('on focus');
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

registerType({
  type: 'select-with-method',
  component: SelectWithMethodComponent,
  allowedTypes: [String, Number, [String], [Number]],
  description: 'A select input that connects to a Meteor Method to fetch data.',
  optionsDefinition: {
    multi: React.PropTypes.bool,
    methodName: React.PropTypes.string.isRequired,
    labelMethodName: React.PropTypes.string.isRequired,
    connection: React.PropTypes.any,
    throttleTime: React.PropTypes.number,
  },
  optionsDescription: {
    multi: 'Allow to select multiple items',
    methodName: 'Meteor method that recieves the search string and returns an array of items with ```label``` and ```value```.',
    labelMethodName: 'Meteor method that recieves the value and must return the label. If ```multi``` is set to true, it will recieve an array and it must return an with the labels in the same order.',
    connection: 'A Meteor connection.',
    throttleTime: 'Minimum time between 2 calls to ```methodName```. Defaults to 200.',
  },
});
