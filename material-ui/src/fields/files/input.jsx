import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import LinearProgress from 'material-ui/lib/linear-progress';
import Paper from 'material-ui/lib/paper';
import Colors from 'material-ui/lib/styles/colors';

import {FieldType, registerType} from 'simple-react-form';

import UploadButton from './upload-button';
import Preview from './preview';
import styles from '../../styles';

const propTypes = {
  /**
   * A function that recieves { file, onProgress, onReady, onError }.
   * onProgress input is progress, a number from 0 to 1.
   * onReady inputs are { url, meta },
   * 		url is the url of the file, meta is a object with whatever you want.
   * onError input is message.
   */
  upload: React.PropTypes.func.isRequired,
  /**
   * A function that recieves { file, onReady, onError }.
   * file is the information of the file (includes the meta from before).
   * onReady is a function with no input.
   * onError input is message.
   */
  delete: React.PropTypes.func.isRequired,
  /**
   * Only accept images
   */
  image: React.PropTypes.bool,
  /**
   * Accept multiple files. If you are using simple-schema and this is true,
   * you must set [Object] to the type.
   */
  multi: React.PropTypes.bool,

  /**
   * Pass the styles props to the preview
   */
  previewStyles: React.PropTypes.object,
};

const defaultProps = {
  image: false,
  multi: false,
  previewStyles: {},
};

export default class Component extends FieldType {

  constructor(props) {
    super(props);
    this.state = {};
    this.uploads = [];
    this.toDelete = [];
    this.limbo = [];

    $(window).unload(() => {
      this.componentWillUnmount();
    });
  }

  onSuccess() {
    this.toDelete.map((file) => {
      this.props.delete({
        file,
        onReady: () => {},

        onError: (message) => {
          alert(message);
        },
      });
    });
    this.toDelete = [];
    this.limbo = [];
  }

  componentWillUnmount() {
    if (!this.limbo.length) return;
    this.limbo.map((file) => {
      this.props.delete({
        file,
        onReady: () => {},

        onError: (message) => {
          alert(message);
        },
      });
    });
  }

  onReady(upload, file) {
    if (this.props.multi) {
      var newValue = _.clone(this.props.value) || [];
      newValue.push(file);
      this.props.onChange(newValue);
    } else {
      this.props.onChange(file);
    }

    this.limbo.push(file);
  }

  startUpload(file, base64) {
    var upload = {
      key: _.uniqueId('uploadComponent'),
      file,
      base64,
      isUploading: true,
    };
    this.uploads.push(upload);
    this.forceUpdate();

    this.props.upload({
      file,
      onProgress: (progress) => {
        upload.progress = progress;
        this.forceUpdate();
      },

      onReady: ({ url, meta }) => {
        this.onReady(upload, { url, meta });
        const index = this.uploads.indexOf(upload);
        this.uploads.splice(index, 1);
        this.forceUpdate();
      },

      onError: (message) => {
        this.onError(upload, message);
        upload.isUploading = false;
        upload.error = message;
        this.forceUpdate();
      },
    });
  }

  deleteFile(file) {
    this.toDelete.push(_.clone(file));
    if (this.props.multi) {
      var value = _.clone(this.props.value);
      const index = value.indexOf(file);
      value.splice(index, 1);
      this.props.onChange(value);
    } else {
      this.props.onChange(null);
    }
  }

  renderPreviews() {
    const uploadingPreviews = this.uploads.map((upload, index) => {
      return <Preview
        key={upload.key}
        styles={this.props.previewStyles}
        base64={upload.base64}
        file={upload.file}
        isUploading={upload.isUploading}
        progress={upload.progress}
        isImage={!!this.props.image}
        onDelete={() => this.deleteFile(file)}
        />;
    });

    const value = this.props.multi ? (this.props.value || []) : this.props.value ? [this.props.value] : [];
    const previews = value.map((file, index) => {
      return <Preview
        key={`preview-${file.url}`}
        styles={this.props.previewStyles}
        url={file.url}
        isImage={!!this.props.image}
        deleteLabel='Delete'
        confirmDeleteText='Do you want to delete this file?'
        onDelete={() => this.deleteFile(file)}
        />;
    });

    return (
      <div>
        {previews}
        {uploadingPreviews}
      </div>
    );
  }

  renderUploadButton() {
    if (!this.props.multi && (this.props.value || this.uploads.length)) return;
    const props = {
      accept: this.props.image ? 'image/*' : '',
      label: this.props.image ? 'Upload image' : 'Upload file',
      multi: !!this.props.multi,
      onUpload: this.startUpload.bind(this),
      passBase64: !!this.props.image,
    };
    return <UploadButton {...props} />;
  }

  render() {
    return (
      <div style={{ paddingTop: 10, paddingBottom: 10 }}>
        <div style={styles.label}>
          {this.props.label}
        </div>
        {this.renderPreviews()}
        {this.renderUploadButton()}
        <div style={styles.errorMessage}>
          {this.props.errorMessage}
        </div>
      </div>
    );
  }
}

Component.propTypes = propTypes;
Component.defaultProps = defaultProps;

registerType({
  type: 'file',
  component: Component,
  allowedTypes: [Object, [Object]],
  description: 'File field.',
});
