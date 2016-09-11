# Changelog

### vNEXT

- Better warning when field has no field type.

### v1.6.15

- Fix bug created by using dot-object as a dependency instead of including the code.

### v1.6.14

- Use dot-object as a dependency instead of including the code.
- Create tests for clean fields function.
- Put utility functions into different files.

### v1.6.13

- Set the prop clearOnSuccess default to false.

### v1.6.12

- Clears the form (insert and function types) when onSuccess is called. By [@fermuch](https://github.com/fermuch) at [#28](https://github.com/nicolaslopezj/simple-react-form/pull/28).

### v1.6.11

- Nulls are also filtered when updating.

### v1.6.10

- Set changes to blank before passing the onSuccess callback. Fixes [#4](https://github.com/nicolaslopezj/simple-react-form/issues/4).

### v1.6.9

- Better error handling when getting errors from the server.

### v1.6.8

- Improve the algorithm that was implemented in 1.6.6. This fixes when fields that
are object are removed from the update object.

### v1.6.6

- Disabled fields don't count as registered fields when passing to modifiers.

### v1.6.5

- ```keepArrays``` is now ```true``` by default.
- ```commitOnlyChanges``` is now ```false``` by default.
- When updating a document, only fields that are present in the form (registered
  in the main form component) will be passed to the modifiers.

### v1.6.4

- Accept any type of label in field.

### v1.6.3

- Fix a bug with object or array fields in nested array with simple schema.

### v1.6.1

- ```keepArrays``` prop is now default ```false```.

### v1.6

- Array and object components are fields now.


### v1.5

- Field types should be passed in the type prop of the Field component.

### v1.4.1

- Support for React Native.
- Add useFormTag option.

### v1.4

- Use context instead of cloning elements.
