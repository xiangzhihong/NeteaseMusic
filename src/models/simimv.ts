export interface Artist {
	id: number;
	name: string;
	alias: string[];
	transNames?: any;
}

export interface Mv {
	id: number;
	cover: string;
	name: string;
	playCount: number;
	briefDesc?: any;
	desc?: any;
	artistName: string;
	artistId: number;
	duration: number;
	mark: number;
	artists: Artist[];
	alg: string;
}

export interface SimiMv {
	mvs: Mv[];
	code: number;
}