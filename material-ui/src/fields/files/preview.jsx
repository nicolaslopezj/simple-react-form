import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import LinearProgress from 'material-ui/lib/linear-progress';
import CircularProgress from 'material-ui/lib/circular-progress';
import Paper from 'material-ui/lib/paper';
import Colors from 'material-ui/lib/styles/colors';

const styles = {
  container: {
    marginBottom: 10,
    marginRight: 10,
    cursor: 'pointer',
    display: 'inline-block',
  },
  image: {
    maxHeight: 150,
    maxWidth: '100%',
    marginBottom: -5,
  },
  imageLoading: {
    maxHeight: 150,
    maxWidth: '100%',
    marginBottom: -5,
    opacity: 0.5,
  },
  progress: {
    margin: '0 auto',
    display: 'block',
    marginTop: -50,
  },
};

const propTypes = {
  base64: React.PropTypes.string,
  url: React.PropTypes.string,
  isImage: React.PropTypes.bool,
  isUploading: React.PropTypes.bool,
  progress: React.PropTypes.number,
  onDelete: React.PropTypes.func,
  deleteLabel: React.PropTypes.string,
  confirmDeleteText: React.PropTypes.string,
};

export default class FilesPreview extends React.Component {

  askDelete() {
    if (confirm(this.props.confirmDeleteText)) {
      this.props.onDelete();
    }
  }

  renderLoading() {
    return (
      <div style={{ marginBottom: 10 }}>
        <LinearProgress mode='determinate' value={this.props.progress * 100} />
      </div>
    );
  }

  renderBase64() {
    return (
      <Paper style={styles.container}>
        <img src={this.props.base64} style={styles.imageLoading}/>
        <CircularProgress style={styles.progress} mode='determinate' value={this.props.progress * 100} size={0.5} />
      </Paper>
    );
  }

  renderPreviewImage() {
    return (
      <Paper style={styles.container} onClick={this.askDelete.bind(this)}>
        <img src={this.props.url} style={styles.image}/>
      </Paper>
    );
  }

  renderPreview() {
    return (
      <div style={{ marginBottom: 10 }}>
        <a style={{ color: Colors.blue400 }} href={this.props.url} target='_blank'>{this.props.url}</a>
        <span style={{ color: Colors.red400, marginLeft: 5, cursor: 'pointer' }} onClick={this.props.onDelete.bind(this)}>{this.props.deleteLabel}</span>
      </div>
    );
  }

  render() {
    if (this.props.isUploading) {
      if (this.props.isImage) {
        return this.renderBase64();
      } else {
        return this.renderLoading();
      }
    } else {
      if (this.props.isImage) {
        return this.renderPreviewImage();
      } else {
        return this.renderPreview();
      }
    }
  }

}

FilesPreview.propTypes = propTypes;
