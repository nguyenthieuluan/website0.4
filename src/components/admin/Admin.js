import React, { Component } from 'react';
import firebase from '../../config/firebaseConfig';
import {connect} from 'react-redux';
import {uploadFile} from '../../store/actions/adminAction';
import {Redirect} from "react-router-dom";


class Admin extends Component {
    state = {
        file: '',
        fileUpload: {
            name: 'test',
            url: 'aaa'
        },
        percentate: 0
    }
    handleChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileUpload: {
                ...this.state.fileUpload,
                name: e.target.files[0].name
            }
        })
        console.log(JSON.stringify(this.state.uploadFile))
      };

    handleUpload = () => {
        //create a storage ref
        const storageRef = firebase.storage().ref('musics/' + this.state.file.name);

        //upload file
        const task = storageRef.put(this.state.file);
        //update progress
        task.on('state_changed', snappshot => {
            const progress = (snappshot.bytesTransferred / snappshot.totalBytes) * 100;
            this.setState({
                percentate: progress
            })
        }, error => {
            console.log(error);
        }, () => {

            const storage = firebase.storage().ref();
            storage.child('musics/'+ this.state.file.name).getDownloadURL().then((url) => {
                this.setState({
                    fileUpload: {
                        ...this.state.fileUpload,
                        url: url
                    }
                });

                console.log('xxx' +this.state.fileUpload.url);
                this.props.uploadFile(this.state.fileUpload);
            }).catch((error) => {});
        })
        

        // console.log(this.state.fileUpload)
        // this.props.uploadFile(this.state.fileUpload);

    }


    handleDownload = () => {
        const storageRef = firebase.storage().ref();
        storageRef.child('musics/vertu.mp3').getDownloadURL().then(function(url) {
            const win = window.open(url, '_blank');
            win.focus();
            // var xhr = new XMLHttpRequest();
            // xhr.responseType = 'blob';
            // xhr.onload = function(event) {
            //   var blob = xhr.response;
            // };
            // xhr.open('GET', url);
            // xhr.send();
            // var img = document.getElementById('myimg');
            // img.src = url;

          }).catch(function(error) {
            // Handle any errors
          });
    }
  render() {
    const {auth} = this.props;
    if (!auth.uid) {
      return <Redirect to='/signin' />
    }
    return (
      <div>
        <progress value={this.state.percentate} max="100">0%</progress>
        <input type="file" onChange={this.handleChange}/>
        <button onClick={this.handleUpload}>Upload</button>
        <button onClick={this.handleDownload}>Download</button>
      </div>
    )
  }
}

const initMapStateToProps = (state) => {
    return {
      auth: state.firebaseReducer.auth
    }
  };
const initMapDispatchToProps = (dispatch) => {
    return {
      uploadFile: (file) => dispatch(uploadFile(file))
    }
  };

export default connect(initMapStateToProps, initMapDispatchToProps) (Admin);