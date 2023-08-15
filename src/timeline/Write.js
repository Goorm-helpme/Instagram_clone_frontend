import React, { useState, useRef } from 'react';
import "./Write.css";
import { useNavigate } from "react-router-dom";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'; // 프리뷰 끄는 아이콘
import axios from 'axios';

function Write({ addPost }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [userName, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const fileInput = useRef(); // useRef를 사용하여 ref를 생성
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result);
      };

      reader.readAsDataURL(file);
      setImage(file);
    } else {
      setPreview(null);
      setImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button was clicked'); // <-- Add this line


    if (!image) {
      console.error("이미지를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('https://your-api-endpoint/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('업로드 성공:', response.data);

      const newPost = {
        user: userName,
        poseImage: preview,
        likes: 0,
        hates: 0,
        timestamp: "just now",
        description: description
      };

      addPost(newPost);

      navigate('/'); 

    } catch (error) {
      console.error("이미지 업로드 중 에러 발생:", error);
    }
  };

  const handleRemovePreview = () => {
    setImage(null);
    setPreview(null);
    if (fileInput.current) {
      fileInput.current.value = ""; // 첨부된 파일 초기화
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result);
      };

      reader.readAsDataURL(file);
      setImage(file);
    }
  };


 
  return (
    <div className='makingFeed'>
      <div className='write__container'>

        <div
          className="photo__dragBox"
          //오버랑 엔터는 디폴트루가는데 왜? 드랍은함수가있고..
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDrop={handleDrop}
        >
          <input
            className="photo__inputFile"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInput} // fileInput이 useRef로 생성된 ref이므로, 이렇게 설정합니다.
            />

          {/* 이미지가 첨부되지 않은 상태에서만 아이콘과 텍스트 표시 */}
          {!preview && (
            <>
            {/* null방지 */}
              {/* <IconButton onClick={() => fileInput.current.click()}> */}
              <IconButton onClick={() => fileInput.current && fileInput.current.click()}>
              <ControlPointIcon className="photo__dragBoxIcon" />
              </IconButton>
              <p className="dragBox__text">drag or choose your image to share</p>
            </>
          )}

          {preview &&
            <>
              <img
                className='photo__dragBoxImage'
                src={preview}
              />
              <IconButton className='photo__previewDeleteBtn' onClick={handleRemovePreview} ><CloseIcon /></IconButton>
            </>
          }

        </div>
        <div className="write__send">
          <div className="write__inputs">
            <input 
                className="write__userName" 
                type="text" 
                placeholder='name' 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}   
              />
            <textarea 
              className="write__textarea" 
              type="text" 
              placeholder='write something...'  
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              />
          </div>            
          <button className="write__button" onClick={handleSubmit}>
            SEND
          </button>
        </div>
      </div>
    </div>
  );
        }


export default Write;
