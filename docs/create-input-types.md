# Create Input Types

React Simple Form is built from the idea that you can create custom components easily.

Basically this consist in a component that have the prop ```value``` and the prop ```onChange```. 
You must render the ```value``` and call ```onChange``` passing the new value
when the value has changed.

You can also pass props to this components setting them in the srf parameter of 
the simple-schema object:

```
Post.attachSchema({
  picture: {
    type: String,
    srf: {
      type: 'my-upload-picture',
      squareOnly: true,
    },
  },
});
```

Or simply in the field while rendering:

```jsx
<Field fieldName="picture" type="my-upload-picuture" squareOnly={true}/>
```

### Creating field types

You must create a React component that extends ```FieldType```
and register the field type

```jsx
import { FieldType, registerType } from 'simple-react-form';

class MyUploadPicture extends FieldType {
  render() {
    return (
      <div>
        <p>
          {this.props.label}
        </p>
        <img src={this.props.value} />
        <TextField
        value={this.props.value}
        hintText='Image Url'
        onChange={(event) => this.props.onChange(event.target.value)} />
        <p>
          {this.props.errorMessage}
        </p>
      </div>  
    );
  }
}

registerType({
  type: 'textarea',
  component: MyUploadPicture,
});
```

You can view the full list of props [here](https://github.com/nicolaslopezj/simple-react-form/blob/master/form/src/field.jsx#L9).
