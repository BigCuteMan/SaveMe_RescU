package com.ssafy.smru.dto;

import com.ssafy.smru.entity.AppMember;
import lombok.*;

import java.util.Date;

public class AppMemberDto {
    @Getter
    @NoArgsConstructor
    @ToString
    public static class Request {
        private Long appMemberId;
        private String memberId;
        private String password;
        private String memberName;
        private Date birth;
        private boolean gender;
        private String phone;
        private boolean deleted;
        private MedicalInfoDto medicalInfoDto;

        @Builder
        public Request(Long appMemberId, String memberId, String password, String memberName, Date birth, boolean gender, String phone, boolean deleted, MedicalInfoDto medicalInfoDto) {
            this.appMemberId = appMemberId;
            this.memberId = memberId;
            this.password = password;
            this.memberName = memberName;
            this.birth = birth;
            this.gender = gender;
            this.phone = phone;
            this.deleted = deleted;
            this.medicalInfoDto = medicalInfoDto;
        }

        public AppMember toEntity() {
            return AppMember.builder()
                    .appMemberId(appMemberId)
                    .memberId(memberId)
                    .password(password)
                    .memberName(memberName)
                    .birth(birth)
                    .gender(gender)
                    .phone(phone)
                    .deleted(deleted)
                    .medicalInformation(null)
                    .build();
        }
    }

    public static class Response {

    }
}
