import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import {
  SignupUserInfoForm,
  SignupLoginInfoForm,
  VerifyCodeForm,
} from "@components/form";
import {
  HomePage,
  LoginPage,
  SignupPage,
  ReportCallPage,
  AgreeTermsPage,
  MyInfoMenuPage,
  MedicalInfoPage,
  EditMedicalInfoPage,
  EmergencycontactsPage,
} from "@/pages";
import GlobalStyle from "@/globalStyles.js";
function App() {
  return (
    <Container>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup/*" element={<SignupPage />}>
            <Route path="userinfo" element={<SignupUserInfoForm />} />
            <Route path="logininfo" element={<SignupLoginInfoForm />} />
          </Route>

          <Route path="/verification" element={<VerifyCodeForm />} />
          <Route path="/agreeterms" element={<AgreeTermsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/report" element={<ReportCallPage />} />
          <Route path="/findId" element={<HomePage />} />
          <Route path="/findPassword" element={<HomePage />} />

          <Route path="/menu" element={<MyInfoMenuPage />} />
          <Route path="/medicalinfo" element={<MedicalInfoPage />} />
          <Route path="/medicalinfo/edit/*" element={<EditMedicalInfoPage />} />

          <Route
            path="/emergencycontacts"
            element={<EmergencycontactsPage />}
          />
          {/*  <Route path="/nfc-info" element={<NfcInfoPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/privacy-agreement" element={<PrivacyAgreementPage />} />
          <Route
            path="/profile-management"
            element={<ProfileManagementPage />}
          /> */}
        </Routes>
      </Router>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  min-height: 640px;
  // max-width: 360px;
  max-height: 800px;
  min-width: 360px;
  padding-bottom: 4px;
  align-items: flex-start;
`;
export default App;
