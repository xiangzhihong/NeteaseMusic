export interface PlayListComment {
     isMusician: boolean;
     cnum: number;
     userId: number;
     topComments?: Array<any>;
     moreHot: boolean;
     hotComments: Array<HotComments>;
     commentBanner?: any;
     code: number;
     comments: Array<Comments>;
     total: number;
     more: boolean;
};

export interface HotComments {
     user: User;
     beReplied?: Array<any>;
     pendantData?: any;
     showFloorComment?: any;
     status: number;
     commentId: number;
     content: string;
     richContent: string;
     contentResource?: any;
     time: number;
     timeStr: Date;
     needDisplayTime: boolean;
     likedCount: number;
     expressionUrl?: any;
     commentLocationType: number;
     parentCommentId: number;
     decoration?: any;
     repliedMark?: any;
     grade?: any;
     userBizLevels?: any;
     ipLocation: IpLocation;
     owner: boolean;
     medal?: any;
     likeAnimationMap?: any;
     liked: boolean;
};

export interface Comments {
     user: User;
     beReplied?: Array<any>;
     pendantData?: any;
     showFloorComment?: any;
     status: number;
     commentId: number;
     content: string;
     richContent: string;
     contentResource?: any;
     time: number;
     timeStr: string;
     needDisplayTime: boolean;
     likedCount: number;
     expressionUrl?: any;
     commentLocationType: number;
     parentCommentId: number;
     decoration?: any;
     repliedMark?: any;
     grade: Grade;
     userBizLevels?: any;
     ipLocation: IpLocation;
     owner: boolean;
     medal?: any;
     likeAnimationMap?: any;
     liked: boolean;
};

export interface User {
     locationInfo?: any;
     liveInfo?: any;
     anonym: number;
     highlight: boolean;
     avatarUrl: string;
     avatarDetail?: any;
     userType: number;
     followed: boolean;
     mutual: boolean;
     remarkName?: any;
     socialUserId?: any;
     vipRights: VipRights;
     nickname: string;
     authStatus: number;
     expertTags?: any;
     experts?: any;
     vipType: number;
     commonIdentity?: any;
     userId: number;
     target?: any;
};

export interface IpLocation {
     ip?: any;
     location: string;
     userId: any;
};

export interface User {
     locationInfo?: any;
     liveInfo?: any;
     anonym: number;
     highlight: boolean;
     avatarUrl: string;
     avatarDetail?: any;
     userType: number;
     followed: boolean;
     mutual: boolean;
     remarkName?: any;
     socialUserId?: any;
     vipRights: VipRights;
     nickname: string;
     authStatus: number;
     expertTags?: any;
     experts?: any;
     vipType: number;
     commonIdentity?: any;
     userId: number;
     target?: any;
};

export interface Grade {
     resourceType?: any;
     resourceId?: any;
     userId: number;
     standard: number;
     grade: number;
     desc: string;
     iconUrl?: any;
     voteCount?: any;
     canceledVoteCount?: any;
     relatedResType?: any;
     relatedResId?: any;
     updateTime: number;
};

export interface IpLocation {
     ip?: any;
     location: string;
     userId: any;
};

export interface VipRights {
     associator: Associator;
     musicPackage: MusicPackage;
     redplus?: any;
     redVipAnnualCount: number;
     redVipLevel: number;
     relationType: number;
     memberLogo?: any;
     extInfo?: any;
};

export interface VipRights {
     associator: Associator;
     musicPackage: MusicPackage;
     redplus?: any;
     redVipAnnualCount: number;
     redVipLevel: number;
     relationType: number;
     memberLogo?: any;
     extInfo?: any;
};

export interface Associator {
     vipCode: number;
     rights: boolean;
     iconUrl: string;
};

export interface MusicPackage {
     vipCode: number;
     rights: boolean;
     iconUrl: string;
};

export interface Associator {
     vipCode: number;
     rights: boolean;
     iconUrl: string;
};

export interface MusicPackage {
     vipCode: number;
     rights: boolean;
     iconUrl: string;
};

