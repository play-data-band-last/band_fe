import {apiClient} from "./ApiClient";


export const teacherLogin = (email, name) => apiClient.post(`/api/v1/user/teacher`, {
  email,
  name
})

export const userLogin = (email, password) => apiClient.post(`/api/v1/user/login`, {
  email,
  password
})

export const interestCommunityScheduleGet = (interest) => apiClient.post('/api/v1/schedule/upcomingByInterest', {
  interest
})

export const signup = (email, password, name, mbti, imgPath) => apiClient.post(`/api/v1/user`, {
  email,
  password,
  name,
  mbti,
  imgPath
})

export const userRecommandCommunity = (interestArray, page, size) => apiClient.post('/api/v1/community/allinterest', interestArray, {
  params : {
    page,
    size
  }
});

export const userInterestSave = (interest, userId) => apiClient.post(`/api/v1/bandMember/${userId}/interest`, {
  interest
})
export const communityInsert = (communityId, memberId, memberName, memberRole, memberImage, communityName, communityImage) => apiClient.post(`/api/v1/communitymember/${communityId}`, {
  memberId,
  memberName,
  memberRole,
  memberImage,
  communityName,
  communityImage,
  communityId
})

export const userChatMsg = (communityId, memberId, memberName, memberImage, content) => apiClient.post('http://192.168.0.229:9090/api/v1/chattings', {
  communityId,
  memberId,
  memberName,
  memberImage,
  content
})

export const scheduleInsert = (memberId, scheduleId, useYn, communityId) => apiClient.post('/api/v1/schedule/attendance', {
  memberId,
  scheduleId,
  useYn,
  communityId
})

export const boardInsert = (communityId, content, memberId, memberName, memberImage, title) => apiClient.post(`/api/v1/board/${communityId}`, {
  communityId, content, memberId, memberName, memberImage, title
})

export const createCommunity = (ownerId, name, location, category, interest, description, profileImage) => apiClient.post('/api/v1/community', {
  ownerId, name, location, category, interest, description, profileImage
})

export const createSchedule = (communityId, scheduleName, scheduleTime, meetingPlace, price, maxParticipation, interest, memberImage, memberName) => apiClient.post(`/api/v1/schedule/${communityId}`, {
  scheduleName, scheduleTime, meetingPlace, price, maxParticipation, interest, memberImage, memberName
})

export const communityMemberDelete = (memberId, communityId) => apiClient.delete(`/api/v1/communitymember/memberid/${memberId}/communityid/${communityId}`);

export const albumInsert = (communityId, memberId, memberName, memberImgPath, imgPath, likeCount) => apiClient.post(`/api/v1/album/communityid/${communityId}`, {
  communityId, memberId, memberName, memberImgPath, imgPath, likeCount
});


export const likeAddFunc = (memberId, communityId, communityName, communityImgPath) => apiClient.post(`/api/v1/bandMember/reserve/${memberId}`, {
  communityId, communityName, communityImgPath
});

export const likeRemoveFunc = (memberId, communityId) => apiClient.delete(`/api/v1/bandMember/reserve/${memberId}/${communityId}`);

export const likeInsertFunc = (target, targetId, memberId) => apiClient.post(`/api/v1/like`, {
  target, targetId, memberId
});

export const writeCommentFunc = (content, targetId, memberId, memberImage, memberName) => apiClient.post(`/api/v1/comment`, {
  content, targetId, memberId, memberImage, memberName
});

export const modifyUserInfo = (email, password, name, mbti, imgPath, token) => apiClient.put(`/api/v1/user/update`, {
  email, password, name, mbti, imgPath
}, {
  headers : {
    'Authorization' : token
  }
});
