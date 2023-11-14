import {atom} from "recoil";

export const CommunityJoinMessage = atom({
    key : 'CommunityJoinMessage',
    default : {
    targetMemberId: 0,
    communityName: '',
    joinMemberId: 0,
    joinMemberName: '',
    joinMemberImage: ''}
});

