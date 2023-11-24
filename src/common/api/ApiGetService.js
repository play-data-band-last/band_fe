import {apiClient} from "./ApiClient";

export const myTokenInfo = (token) => apiClient.get('/api/v1/user/me', {
  token : token
})

export const interestCommunityGet = (interest, page, size) => apiClient.get('/api/v1/community/interest', {
  params : {
    interest,
    page,
    size
  }
})


export const interestNewCommunityGet = (page, size) => apiClient.get('/api/v1/community/generateorder', {
  params : {
    page,
    size
  }
})

export const findByCommunityById = (communityid) => apiClient.get(`/api/v1/community/${communityid}`);

export const scheduleMemberCondition = (scheduleId, communityid) => apiClient.get(`/api/v1/schedule/scheduleid/${scheduleId}/memberid/${communityid}`);

export const findByCommunityCount = (communityid) => apiClient.get(`/api/v1/communitymember/communityid/${communityid}`);

export const findByCommunitySchedule = (communityid) => apiClient.get(`/api/v1/schedule/communityId/${communityid}`);

export const findByCommunityBoard = (communityid) => apiClient.get(`/api/v1/board/${communityid}`);

export const findByCommunityAlbum = (communityid) => apiClient.get(`/api/v1/album/communityid/${communityid}`);

export const findByMyCommunity = (memberId) => apiClient.get(`/api/v1/communitymember/memberid/${memberId}`);
export const findByMyReserve = (memberId) => apiClient.get(`/api/v1/bandMember/reserve/${memberId}`);
export const findByCommunityComments = (targetId) => apiClient.get(`/api/v1/comment/${targetId}`);

export const findByCommunityMember = (communityId) => apiClient.get(`/api/v1/communitymember/communityid/${communityId}`);
export const findByTeacherLoginIngo = (userEmail) => apiClient.get(`/api/v1/user/teacherAccountInfo/${userEmail}`);

export const findByScheduleMember = (scheduleId) => apiClient.get(`/api/v1/schedule/schedule/${scheduleId}`);
export const findByMyNotifys = (ownerId) => apiClient.get(`/api/v1/notify/community/${ownerId}`);









