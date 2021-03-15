import { Button } from '@material-ui/core'
import React, {useState} from 'react'
import {storage, db} from './firebase';
import firebase from 'firebase';
import './ImageUpload.css'
function ImageUpload({ username}) {
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);

    const handleChange = (event) =>{
        if(event.target.value) {
            setImage(event.target.files[0]);
        }
    }
 
    const handleUpload = ( ) =>{
         const uploadTask = storage.ref(`images/${image.name}`).put(image);
         uploadTask.on(
             "state_changed",
             (snapshot) => {
                 const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                 );
                setProgress(progress);
             },
             ( error) =>{
                 console.log(error);
                 alert(error);
             },
              () => {
                  storage
                  .ref("images")
                  .child( image.name)
                  .getDownloadURL()
                  .then( url => {
                      db.collection("posts").add( {
                          timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                          caption : caption,
                          imageUrl : url,
                          username : username
                      })
                    setProgress(0);
                    setCaption("");
                    setImage(null);
                  })
                  .catch((error) => (console.log(error)))
              }
         )
    }

    return (
        <div className = "ImageUpload">
            <progress className = "ImageUpload_progress" value = {progress} max = "100" />
            <input type="text" className = "ImageUpload_caption" value = {caption} placeholder="Caption........."  onChange = { event=> setCaption(event.target.value)  } />
            <input type = "file" className = "ImageUpload_file" onChange = {handleChange} />
            <Button onClick = { handleUpload} >
                Upload
            </Button>

        </div>
    )
}

export default ImageUpload
