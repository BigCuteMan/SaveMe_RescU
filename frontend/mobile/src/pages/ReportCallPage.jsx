import React, { useRef, useEffect, useState, forwardRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";
import MicNoneIcon from "@mui/icons-material/MicNone";
import MicOffIcon from "@mui/icons-material/MicOff";
import ForumIcon from "@mui/icons-material/Forum";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import SendIcon from "@mui/icons-material/Send";

import { Button, Input, Grid, Text } from "@components/elements";
import {
  socket,
  initSocketConnection,
  getMedia,
  getCameras,
  myPeerConnection,
  localStream,
  remoteVideoStream,
  handleSendMessage,
} from "@/util/socket";

const ReportCallPage = () => {
  //SECTION - user settings
  const userId = "userID";
  const [isChatting, setIsChatting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuAll, setShowMenuAll] = useState(false);

  const [muted, setMuted] = useState(true);
  const [cameraOff, setCameraOff] = useState(true);
  const [isCameraFront, setIsCameraFront] = useState(false);
  const [cameras, setCameras] = useState([]);

  const navigate = useNavigate();
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const handleMuteClick = () => {
    const enabled = !muted;
    localStream.getAudioTracks()[0].enabled = enabled;
    setMuted(enabled);
  };

  const handleCameraClick = () => {
    const enabled = !cameraOff;
    localStream.getVideoTracks()[0].enabled = enabled;
    setCameraOff(enabled);
  };

  const handleCameraChange = async () => {
    let index;
    //전면 1 후면 0
    if (isCameraFront) index = 0;
    else index = 1;
    setIsCameraFront(!isCameraFront);
    await getMedia(cameras[index].deviceId);
    if (myPeerConnection) {
      const videoTrack = localStream.getVideoTracks()[0];
      const videoSender = myPeerConnection
        .getSenders()
        .find((sender) => sender.track.kind === "video");
      videoSender.replaceTrack(videoTrack);
    }
  };
  const onClickScreen = () => {
    if (isChatting) {
      setShowMenu(true);
    } else {
      setShowMenuAll(true);
    }
  };
  const onClickMenu = () => {
    setShowMenu(false);
    setShowMenuAll(true);
  };

  useEffect(() => {
    if (showMenu) {
      const timer = setTimeout(() => {
        setShowMenu(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showMenu]);

  useEffect(() => {
    if (showMenuAll) {
      setShowMenu(false);

      const timer = setTimeout(() => {
        setShowMenuAll(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showMenuAll]);

  const startChatting = (event) => {
    event.stopPropagation();
    setIsChatting(true);
    setShowMenu(false);
    setShowMenuAll(false);
    localVideoRef.current.style.bottom = `70px`;
  };

  //SECTION - chatting
  const [chatBtnColor, setChatBtnColor] = useState();
  const [chat, setChat] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const changeChatBtnColor = () => {
    if (isChatArrive) {
      setChatBtnColor("var(--main-yellow-color)");
    } else {
      setChatBtnColor("var(--white-color-200)");
    }
  };
  useEffect(() => {
    //TODO - 새로운 메시지를 수신할 때마다 chat 상태를 업데이트
    // receiveMessage((data) => {
    //   setChat((prevChat) => [
    //     ...prevChat,
    //     { alignment: "left", message: data.message },
    //   ]);
    //   console.log(chatWrapperRef.current.offsetHeight);
    //   setChatWrapperHeight(chatWrapperRef.current.offsetHeight); // 채팅 높이 업데이트
    // });
  }, []);
  const handleMessageSubmit = (event) => {
    event.preventDefault();
    if (messageInput.trim() !== "") {
      // 메시지 전송
      handleSendMessage(messageInput);
      setChat([...chat, { alignment: "right", message: messageInput }]);
      setMessageInput("");
      setChatWrapperHeight(chatWrapperRef.current.offsetHeight); // 채팅 높이 업데이트
    }
  };
  const [chatWrapperHeight, setChatWrapperHeight] = useState(0); // 채팅 높이 상태 추가
  const chatWrapperRef = useRef(null);

  useEffect(() => {
    // 채팅 높이 변경에 따라 myVideo의 위치 조정
    if (chatWrapperRef.current && localVideoRef.current) {
      const chatHeight = chatWrapperRef.current.offsetHeight;
      localVideoRef.current.style.bottom = `${chatHeight}px`;
    }
  }, [chatWrapperHeight]);
  //SECTION - 신고방 접속

  useEffect(() => {
    initSocketConnection();
    //SECTION - 신고 요청 api
    //만약 로그인 되잇다면 로그인id도 같이
    //res로 받은 roodId넣어서 방에 들어갈 수 있는지 요청
    // socket.emit('check_room',roomId);
    socket.emit("check_room", "1");
    //TODO - 신고 전달 내용 채우기
    const data = {
      userId: userId,
      roomId: "1",
      type: "report",
      content: "신고할 내용",
      reportReason: "신고 이유",
      reportTarget: "신고 대상",
    };
    socket.emit("message", { type: "send_report_info", data }, "1");
    localVideoRef.current.srcObject = localStream;
    remoteVideoRef.current.srcObject = remoteVideoStream;

    getCameras().then(setCameras);
    getMedia().then((stream) => {
      if (stream && localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    });

    // window.addEventListener("chatMessage", (event) => {
    //   setChatMessages((prevMessages) => [
    //     ...prevMessages,
    //     { message: event.detail.message, alignment: event.detail.alignment },
    //   ]);
    // });
    return () => {
      if (socket.readyState === 1) {
        socket.disconnect();
        socket.close();
      }
    };
  }, []);
  useEffect(() => {
    console.log(myPeerConnection);
    if (myPeerConnection) {
      remoteVideoRef.current.srcObject = remoteVideoStream;
    }
  }, [remoteVideoStream]);
  const onClickCallEnd = () => {
    hangup();
    remoteVideoRef.current.srcObject.getVideoTracks().forEach((track) => {
      track.stop();
      remoteVideoRef.current.srcObject.removeTrack(track);
    });
    socket.disconnect();

    navigate("/");
  };
  return (
    <PeerVideo
      onClick={onClickScreen}
      ref={remoteVideoRef}
      muted
      autoPlay
      playsInline
    >
      {showMenuAll && (
        <VideoBtn>
          <Button
            _onClick={handleCameraClick}
            $width="55px"
            $height="55px"
            $radius="50%"
            $bg={{ default: "var(--white-color-200)" }}
            children={cameraOff ? <VideocamIcon /> : <VideocamOffIcon />}
          />
          <Button
            _onClick={handleMuteClick}
            $width="55px"
            $height="55px"
            $radius="50%"
            $bg={{ default: "var(--white-color-200)" }}
            children={muted ? <MicNoneIcon /> : <MicOffIcon />}
          />
          <Button
            onClick={handleCameraChange}
            $width="55px"
            $height="55px"
            $radius="50%"
            $bg={{ default: "var(--white-color-200)" }}
            children={<CameraswitchIcon />}
          />
          <Button
            _onClick={onClickCallEnd}
            $width="55px"
            $height="55px"
            $radius="50%"
            $margin="0 0 0 6rem"
            $bg={{ default: "var(--main-red-color)" }}
            children={<CallEndIcon sx={{ color: "#f4f4f4" }} />}
          />
        </VideoBtn>
      )}
      {showMenu && isChatting && (
        <VideoBtn>
          <Button
            _onClick={onClickMenu}
            $width="55px"
            $height="55px"
            $radius="50%"
            $bg={{ default: "var(--white-color-200)" }}
            children={<MoreHorizOutlinedIcon />}
          />
        </VideoBtn>
      )}

      {isChatting ? (
        <ChattingWrapper ref={chatWrapperRef}>
          {chat && (
            <ChattingContents>
              {chat.map((message, index) => (
                <ChattingMessage
                  key={index}
                  alignment={message.alignment}
                  message={message.message}
                >
                  <Text children={message.message} $size="2rem" />
                </ChattingMessage>
              ))}
            </ChattingContents>
          )}
          <ChatInputBox>
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleMessageSubmit(e)}
            />
            <Button
              _onClick={handleMessageSubmit}
              $width="39px"
              $height="48px"
              $bg={{ default: "transparent" }}
              children={<SendIcon fontSize="large" />}
            />
          </ChatInputBox>
        </ChattingWrapper>
      ) : (
        <ChatBtn>
          <Button
            _onClick={startChatting}
            $width="55px"
            $height="55px"
            $radius="50%"
            $bg={{ default: chatBtnColor }}
            children={<ForumIcon />}
          />
        </ChatBtn>
      )}

      <MyVideo ref={localVideoRef} autoPlay />
    </PeerVideo>
  );
};
export default ReportCallPage;

const PeerVideo = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  position: relative;
  background-color: pink;
`;
const MyVideo = styled.video`
  left: 1rem;
  bottom: 1rem;
  width: 40vw;
  height: 30vh;
  flex-shrink: 0;
  border-radius: 20px;
  position: absolute;
  background-color: black;
  z-index: 1;
`;
const VideoBtn = styled.div`
  height: 55px;
  flex-shrink: 0;
  position: absolute;
  left: 2rem;
  top: 2rem;
  display: inline-flex;
  align-items: flex-start;
  gap: 16px;
`;

// const ChatInputBox = styled.div`
//   display: flex;
//   height: 48px;
//   justify-content: center;
//   align-items: center;
//   align-self: stretch;
//   position: relative;
//   bottom: 0;
// `;

const ChatBtn = styled.div`
  width: 55px;
  height: 55px;
  flex-shrink: 0;

  position: absolute;
  right: 2rem;
  bottom: 2rem;
`;

const ChattingWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  max-height: 44vh; /* 최대 높이 설정 */
  border-top: 1px solid #ddd;
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤 추가 */
  display: flex;
  flex-direction: column;
  transition: height 0.3s ease; /* 높이 변경에 애니메이션 추가 */

  /* 내용이 없을 때는 입력 박스 크기만큼만 높이 유지 */
  &.empty {
    height: 48px; /* 입력 박스 크기 */
  }

  /* 채팅이 생길 때마다 자동으로 높이 조절 */
  &.filled {
    height: auto;
  }
`;

const ChattingContents = styled.div`
  flex: 1;
  overflow-y: auto;
  // padding: 10px;&:after {
    content: "";
    display: block;
    clear: both;
  }
`;

// justify-content: ${({ alignment }) =>
//   alignment === "right" ? "flex-end" : "flex-start"};
const ChattingMessage = styled.div`
  display: flex;
  margin: 5px 0;
  padding: 10px;
  background-color: ${({ alignment }) =>
    alignment === "right"
      ? "var(--main-yellow-color)"
      : "var(--chat-pink-color)"};
  border-radius: 10px;
  max-width: 50%;
`;

const ChatInputBox = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid #ccc;

  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 10px;
  }
`;
