export interface SongArtist {
	img1v1Id: number;
	topicPerson: number;
	musicSize: number;
	albumSize: number;
	briefDesc: string;
	picId: number;
	picUrl: string;
	img1v1Url: string;
	followed: boolean;
	trans: string;
	alias: any[];
	name: string;
	id: number;
	publishTime: number;
	picId_str: string;
	img1v1Id_str: string;
	mvSize: number;
}

export interface Ar {
	id: number;
	name: string;
}

export interface Al {
	id: number;
	name: string;
	pic_str: string;
	pic: number;
}

export interface H {
	br: number;
	fid: number;
	size: number;
	vd: number;
	sr: number;
}

export interface Sq {
	br: number;
	fid: number;
	size: number;
	vd: number;
	sr: number;
}

export interface L {
	br: number;
	fid: number;
	size: number;
	vd: number;
	sr: number;
}

export interface M {
	br: number;
	fid: number;
	size: number;
	vd: number;
	sr: number;
}

export interface Video {
	vid: string;
	type: number;
	title: string;
	playTime: number;
	coverUrl: string;
	publishTime: number;
	artists?: any;
}

export interface VideoInfo {
	moreThanOne: boolean;
	video: Video;
}

export interface FreeTrialPrivilege {
	resConsumable: boolean;
	userConsumable: boolean;
	listenType?: any;
	cannotListenReason: number;
	playReason?: any;
	freeLimitTagType?: any;
}

export interface ChargeInfoList {
	rate: number;
	chargeUrl?: any;
	chargeMessage?: any;
	chargeType: number;
}

export interface Privilege {
	id: number;
	fee: number;
	payed: number;
	st: number;
	pl: number;
	dl: number;
	sp: number;
	cp: number;
	subp: number;
	cs: boolean;
	maxbr: number;
	fl: number;
	toast: boolean;
	flag: number;
	preSell: boolean;
	playMaxbr: number;
	downloadMaxbr: number;
	maxBrLevel: string;
	playMaxBrLevel: string;
	downloadMaxBrLevel: string;
	plLevel: string;
	dlLevel: string;
	flLevel: string;
	rscl: number;
	freeTrialPrivilege: FreeTrialPrivilege;
	rightSource: number;
	chargeInfoList: ChargeInfoList[];
	code: number;
	message?: any;
	plLevels?: any;
	dlLevels?: any;
	ignoreCache?: any;
	bd?: any;
}

export interface HotSong {
	rtUrls: any[];
	ar: Ar[];
	al: Al;
	st: number;
	noCopyrightRcmd?: any;
	songJumpInfo?: any;
	djId: number;
	no: number;
	fee: number;
	mv: number;
	cd: string;
	t: number;
	v: number;
	rtype: number;
	rurl?: any;
	pst: number;
	alia?: any[];
	pop: number;
	rt: string;
	mst: number;
	cp: number;
	crbt?: any;
	cf: string;
	dt: number;
	h: H;
	sq: Sq;
	hr?: any;
	l: L;
	rtUrl?: any;
	ftype: number;
	a?: any;
	m: M;
	name: string;
	id: number;
	videoInfo: VideoInfo;
	privilege: Privilege;
}

export interface SingerSong {
	artist: SongArtist;
	hotSongs: HotSong[];
	more: boolean;
	code: number;
}