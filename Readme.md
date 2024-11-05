# 🚑 SaveMe_RescU 🚨

![image](https://github.com/user-attachments/assets/e94a0b22-f0cd-4ef8-8206-d19edb98b2c7)
![image](https://github.com/user-attachments/assets/1dce2ea5-a93b-4d70-8338-1e278c1e9daa)

<h2>프로젝트 개요</h2>

<h3> 프로젝트 기간 및 인원</h3>

<h4>
  2024.07.02 ~ 2024.08.16 ( 5명 )
</h4>

<h3> 팀원 소개 </h3>

<table>
  <tr>
    <td style="text-align: center; padding: 10px;">
      <a href="https://github.com/flex2020" target="_blank">
      <img src="https://avatars.githubusercontent.com/u/61104736?v=4" alt="노의빈" height="150" width="150" style="border-radius: 50%;"/>
      <h4>노의빈</h4>
      <p><strong>역할:</strong> 팀장, Infra, Backend</p>
    </td>
    <td style="text-align: center; padding: 10px;">
      <a href="https://github.com/jinseobYun" target="_blank">
      <img src="https://avatars.githubusercontent.com/u/103829767?v=4" alt="윤진섭" height="150" width="150" style="border-radius: 50%;"/>
      <h4>윤진섭</h4>
      <p><strong>역할:</strong> Backend </p>
    </td>
    <td style="text-align: center; padding: 10px;">
      <a href="https://github.com/Jeon-YJ1004" target="_blank">
      <img src="https://avatars.githubusercontent.com/u/69620036?v=4" alt="전영주" height="150" width="150" style="border-radius: 50%;"/>
      <h4>전영주</h4>
      <p><strong>역할:</strong> Frontend </p>
    </td>
  </tr>
  <tr>
    <td style="text-align: center; padding: 10px;">
      <a href="https://github.com/Sanghwi-dodo" target="_blank">
      <img src="https://avatars.githubusercontent.com/u/148059944?v=4" alt="이상휘" height="150" width="150" style="border-radius: 50%;"/>
      <h4>이상휘</h4>
      <p><strong>역할:</strong> Frontend </p>
    </td>
    <td style="text-align: center; padding: 10px;">
        <a href="https://github.com/BigCuteMan" target="_blank">
      <img src="https://avatars.githubusercontent.com/u/148304305?v=4" alt="안해찬" height="150" width="150" style="border-radius: 50%;"/>
      <h4>안해찬</h4>
      <p><strong>역할:</strong> Backend </p>
    </td>
  </tr>
</table>

<h3> 기획 배경 </h3>

“응급실 뺑뺑이”라는 단어를 들어보셨나요? 이는 응급 환자가 신속한 처치를 받아야 하는 상황에서, 구급차가 빈 병상을 찾지 못해 여러 병원을 전전하는 현실을 일컫습니다. 현재 응급상황에서 구급대원들은 현장에 출동한 후 각 병원에 직접 전화를 걸어 응급실의 가용 병상과 의료인력을 확인해야 합니다. 

이러한 문제는 현재의 신고 및 대응 시스템이 구조적 한계를 지니고 있기 때문입니다. 신고가 이루어지면 자동으로 주변 가용 병상이 있는 응급실과 연동되도록 프로세스 구축이 필요합니다. 

또한, 신고 방식에도 개선이 필요합니다. 119 신고에는 음성뿐만 아니라 문자나 영상통화 등 다양한 방식이 존재하지만, 대부분의 사람들은 이를 잘 활용하지 않습니다. 
특히 시각장애인이나 청각장애인과 같은 취약 계층에게는 이러한 다매체 신고가 생명을 구할 수 있는 중요한 수단입니다.
구급대원들은 환자의 상태를 직접 볼 수 없어서 응급처치가 제대로 이루어지고 있는지 확인하기 어렵다고 토로하기도 합니다.
이를 통해 응급 환자가 더 신속하게 적절한 치료를 받을 수 있도록 시스템을 효율화하고자 프로젝트를 기획하게 되었습니다.

<h3> 주요 기능</h3>

<h4>저희는 119 상황실과 신고자 양쪽에게 서비스를 제공하기 위해 Web 과 모바일 APP을 개발했습니다. </h4>

1. **상황실(Web)**
  - **화상 통화 신고 및 실시간 채팅**: 신고자와 상황실 간의 실시간 화상 통화 및 채팅 기능을 제공하여 긴급 상황에서 원할한 커뮤니케이션이 가능하도록 합니다.
  - **환자 및 신고자 정보 자동 완성**: 신고 접수 시 환자와 신고자의 정보가 자동으로 작성되어 신속하게 출동 지령을 작성할 수 있습니다.
  - **인근 응급실 정보 제공**: 상황실에서 인근 응급실의 가용 병상 및 최단 경로를 실시간으로 확인하여 가장 적합한 응급실을 구급대원들에게 전달할 수 있도록 합니다.
    
2. **신고자(App)**
  - **의료 정보 저장 :** 사용자가 앓고 있는 질환, 복용중인 약, 혈액형등 의료 정보를 서버에 저장할 수 있습니다. 긴급 신고 시 의료 정보가 자동으로 119 상황실로 전달됩니다.
  - **투약 정보 및 질병 정보 자동 완성**: 약 6만 개의 약품 명 데이터 또는 질병 정보를 자동 완성을 통해 정확하게 입력할 수 있습니다.
  - **화상 통화 신고 및 실시간 채팅**: 긴급 상황에서 화상 통화 및 채팅을 통해 상황실과 다양한 방식으로 소통할 수 있습니다.
  - **NFC 태깅을 통한 의료 및 위치 정보 전달**: NFC 태깅을 통해 환자 및 신고자의 의료 정보와 위치 정보를 즉시 상황실에 전달합니다. 동시에 자동으로 상황실과 WebRTC를 통해 실시간 화상채팅이 가능합니다.
  - **비상 연락망 등록 :** 보호자의 연락처를 등록하여 저장할 수 있습니다.
  - **신고 시 보호자에게 Push 알림**: 신고가 접수되면 비상 연락망에 저장된 보호자에게 즉시 푸시 알림이 전송됩니다.

---



<h2> 주요 기능 화면 </h2>

<h3> APP ( 신고자 )</h3>
<table>
  <tr>
    <th>회원가입</th>
    <th>의료정보 등록</th>
    <th>비상연락망 등록</th>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/4d3d5dfd-12c0-46cb-a47b-f5aa92b57dab" alt="회원가입" width="250"/>
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/aeb9b181-f021-4ea9-995e-6299a7df9538" alt="의료정보 등록" width="250"/>
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/8dacf1f7-8484-4cda-85ee-eb6e86ae6157" alt="비상연락망 등록" width="250"/>
    </td>
  </tr>
  <tr>
    <th>NFC 토큰 발급</th>
    <th>NFC 태깅 후 신고 자동 연결</th>
    <th>보호자 Push 알림</th>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/14281ddb-678f-4285-a4c7-f8b9dd389570" alt="NFC 토큰 발급" width="250"/>
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/d95fa738-1382-47c7-bbfc-9c9164c9fcc4" alt="NFC 태깅 후 신고 자동 연결" width="250"/>
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/a8ce0604-8b99-4312-996a-ad7053f80acc" alt="보호자 Push 알림" width="250"/>
    </td>
  </tr>
</table>

**회원가입**: 기본 정보를 입력하고 Cool SMS를 활용해 문자 인증을 구현했습니다.

**의료정보 등록**: 의료 정보 등록 중 복용 중인 약, 질병 정보를 정확하게 입력할 수 있도록 자동완성 형식으로 구현했고, 

이 때 필요한 의약품과 질병명을 Elastic Search를 활용해 빠르게 조회할 수 있도록 구현했습니다.

**비상연락망 등록**: 보호자를 비상연락망에 등록하여 해당 사용자가 NFC 태깅을 통해 신고되면 보호자에게 Push 알림을 통해 신고 상황을 전달하고 119상황실에도 비상연락망을 전달하도록 구현했습니다.

**NFC 토큰 발급**: NFC 스티커에 NFC 토큰을 등록하면 위급 상황 시 스티커를 통해 별다른 절차 없이 바로 119 상황실과 연결됩니다. 

여기서는 NFC 토큰을 어떻게 스티커에 등록하는지에 대한 방법을 안내하고 실제 NFC 토큰을 발급받을 수 있습니다.

**NFC 태깅 후 신고 자동 연결**: 해당 화면은 실제 NFC 스티커를 휴대폰에 태깅했을 때 나오는 화면입니다. 바로 119 상황실로 연결되는 것을 확인할 수 있습니다.

**보호자 Push 알림**: NFC 태깅을 통해 신고가 이루어지면 NFC 스티커에 토큰을 등록한 사용자가 비상연락망에 저장한 보호자에게 Push 알림이 전송됩니다.

<h3> WEB ( 119 상황실 ) </h3>

<table>
  <tr>
    <th colspan="2" style="text-align: center;">전체 프로세스</th>
  </tr>
  <tr>
    <td colspan="2" style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/f8ecd016-66ce-497f-ae48-8d93a6ab4b78" alt="전체 프로세스" width="100%"/>
    </td>
  </tr>
  <tr>
    <th style="text-align: center;">로그인</th>
    <th style="text-align: center;">채팅</th>
  </tr>
  <tr>
    <td style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/21de7ac3-1f3d-47ce-acd3-a97825b0c18e" alt="로그인" width="400px"/>
    </td>
    <td style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/de6053e6-2aeb-4786-9b43-3a11de0347db" alt="채팅" width="400px"/>
    </td>
  </tr>
  <tr>
    <th style="text-align: center;">출동지령 작성</th>
    <th style="text-align: center;">최단 거리 응급실</th>
  </tr>
  <tr>
    <td style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/e22777f1-bee8-4d9b-8041-6b7655de0e54" alt="출동지령 작성" width="400px"/>
    </td>
    <td style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/aeae76ef-78bd-4ed3-9324-8f6b33f1acc8" alt="최단 거리 응급실" width="400px"/>
    </td>
  </tr>
</table>
