// Acknowledgement
// https://stackoverflow.com/questions/41878838/how-do-i-set-multipart-in-axios-with-react

import React, { Component } from 'react'
import axios, { post } from 'axios'


class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      file: null,
      response: null
    }
    
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  
  onChange(e) {
    this.setState({ file: e.target.files[0] })
  }
  
  onSubmit(e) {
    e.preventDefault();
    const { file } = this.state;
    if (file) {
      this.fileUpload(file).then(({ data }) => {
        this.setState({ response: data });
      })
    }
  }
  
  fileUpload(file){
    const url = '/api/fileanalyse';
    const formData = new FormData();
    formData.append('upfile', file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData, config)
  }
  
  render() {
    let { response } = this.state;
    
    if (!response) {
      return (
        <React.Fragment>
          <div className="display">
            <h3>
              Upload a file
            </h3>
          </div>
          <form onSubmit={this.onSubmit} onChange={this.onChange}>
            <input id="inputfield" type="file" name="upfile" />
            <input id="button" type="submit" value="Upload" />
          </form>
        </React.Fragment>
      )
    }
    
    response = JSON.stringify(response);
    
    return (
      <React.Fragment>
        <div className="display">
          <h3>
            Response:
          </h3>
          <p>{ response }</p>
        </div>
        <form onSubmit={this.onSubmit} onChange={this.onChange}>
          <input id="inputfield" type="file" name="upfile" />
          <input id="button" type="submit" value="Upload" />
        </form>
      </React.Fragment>
    )
  }
}

export default App