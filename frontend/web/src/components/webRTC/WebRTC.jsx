import React, { useRef, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  initOpenVidu,
  leaveSession,
  mainStreamManager,
  toggleAudio,
  toggleVideo,
} from "../../util/openvidu";
import styled from "styled-components";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import MicNoneIcon from "@mui/icons-material/MicNone";
import MicOffIcon from "@mui/icons-material/MicOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import Button from "../elements/Button";
import "./WebRTC.css";

const WebRTC = () => {
  const [muted, setMuted] = useState(true);
  const [cameraOff, setCameraOff] = useState(true);

  // 상대방 스트림 상태 관리
  const [remoteStream, setRemoteStream] = useState(null);
  const navigate = useNavigate();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  //remoteVideo 자체를 state로 관리

  const handleMuteClick = () => {
    const enabled = toggleAudio();
    setMuted(enabled);
  };

  const handleCameraClick = () => {
    const enabled = toggleVideo();
    setCameraOff(enabled);
  };

  useEffect(() => {
    const user = { username: "myname", userno: 1 }; // 실제 사용자 정보로 대체
    const sessionId = sessionStorage.getItem("memberId"); // 실제 세션 ID로 대체

    initOpenVidu(sessionId, user).then(() => {
      console.log("OpenVidu Init 시작!");

      if (mainStreamManager) {
        const videoStream = new MediaStream(
          // 비디오 트랙만 가지고 오기
          mainStreamManager.stream.getMediaStream().getVideoTracks()
        );
        console.log("여기확인하세요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        localVideoRef.current.srcObject = videoStream;
      }
      console.log("OpenVidu Init 성공!");
    });

    const handleStreamCreated = (event) => {
      console.log("상대방 접속 시작!");
      console.log("만약 상대방이 먼저 접속해 있으면 이 이벤트 작동하나?", event.detail.subscriber)
      const subscriber = event.detail.subscriber;
      if (subscriber) {
        setTimeout(() => {
          const stream = subscriber.stream.getMediaStream();
          console.log("상대방 MediaStream정보 : ", stream);
          if (stream) {
            setRemoteStream(stream);
            console.log("상대방 MediaStream 연결 완료");
          }
        }, 1000);
      }
    };

    window.addEventListener("streamCreated", handleStreamCreated);
    
    return () => {
      leaveSession();
    };
  }, []);

  const onClickCallEnd = async () => {
    try {
      await leaveSession(); // leaveSession 호출이 끝난 후 리다이렉트
      localStorage.removeItem("reportData")
      navigate("/main", { replace: true });
    } catch (error) {
      console.error("Error while ending the call: ", error);
      navigate("/main", { replace: true }); // 오류가 발생해도 안전하게 메인으로 이동
    }
  };

  useEffect(() => {
    if (remoteStream) {
      if (remoteVideoRef.current) {
        console.log("상대방 Stream 현재 연결 정보:", remoteVideoRef.current);
        remoteVideoRef.current.srcObject = remoteStream;
      }
    }
  }, [remoteStream]);

  return (
    <VideoContainer>
      <div className="remote-position">
        <Video ref={remoteVideoRef} autoPlay playsInline />
        <div className="local-position">
          <LocalVideo ref={localVideoRef} autoPlay playsInline />
        </div>
      </div>
      <div className="control-panel">
        <div className="rtc-btn">
          <Button
            _onClick={handleCameraClick}
            $bg={{
              default: "var(--white-color-100)",
              hover: "var(--bg-baige-color)",
            }}
            $width="70px"
            $height="70px"
            $radius="40px"
            $border="none"
          >
            {cameraOff ? (
              <VideocamIcon style={{ fontSize: "36px" }} />
            ) : (
              <VideocamOffIcon style={{ fontSize: "36px" }} />
            )}
          </Button>
        </div>
        <div className="rtc-btn">
          <Button
            _onClick={onClickCallEnd}
            $bg={{
              default: "var(--button-red-color)",
              hover: "var(--bg-baige-color)",
            }}
            $width="70px"
            $height="70px"
            $radius="40px"
          >
            <CallEndIcon style={{ fontSize: "36px" }} />
          </Button>
        </div>
        <div className="rtc-btn">
          <Button
            _onClick={handleMuteClick}
            $bg={{
              default: "var(--white-color-100)",
              hover: "var(--bg-baige-color)",
            }}
            $width="70px"
            $height="70px"
            $radius="40px"
            $border="none"
          >
            {muted ? (
              <MicNoneIcon style={{ fontSize: "36px" }} />
            ) : (
              <MicOffIcon style={{ fontSize: "36px" }} />
            )}
          </Button>
        </div>
      </div>
    </VideoContainer>
  );
};

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
`;

const LocalVideo = styled.video`
  width: 350px;
  height: 300px;
  z-index: 4;
`;

export default WebRTC;
