import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

function CameraCapture() {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const capture = () => {
    const imgSrc = webcamRef.current.getScreenshot();
    setImage(imgSrc);
  };

  const uploadImage = async () => {
    const blob = await fetch(image).then(res => res.blob());
    const formData = new FormData();
    formData.append("image", blob, "plant.jpg");

    const response = await axios.post(
      "http://127.0.0.1:8000/api/predict/",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    setResult(response.data);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🌿 Plant Disease Detection</h2>

      {!image && (
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={300}
        />
      )}

      {image && <img src={image} alt="preview" width={300} />}

      <br />

      {!image ? (
        <button onClick={capture}>📸 Capture</button>
      ) : (
        <>
          <button onClick={() => setImage(null)}>🔄 Retake</button>
          <button onClick={uploadImage}>🚀 Predict</button>
        </>
      )}

      {result && (
        <div>
          <h3>Result</h3>
          <p><b>Disease:</b> {result.prediction}</p>
          <p><b>Confidence:</b> {result.confidence}</p>
          <p><b>Suggestion:</b> {result.suggestion}</p>
        </div>
      )}
    </div>
  );
}

export default CameraCapture;