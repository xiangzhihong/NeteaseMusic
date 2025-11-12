export interface MvComments {
     isMusician: boolean;
     cnum: number;
     userId: number;
     topComments?: Array<any>;
     code: number;
     comments: Array<Comments>;
     total: number;
     more: boolean;
};

export interface Comments {
     user: User;
     beReplied?: Array<any>;
     pendantData: PendantData;
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
     grade?: any;
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
     avatarDetail?: any;
     userType: number;
     avatarUrl: string;
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

export interface PendantData {
     id: number;
     imageUrl: string;
};

export interface IpLocation {
     ip?: any;
     location: string;
     userId: number;
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

