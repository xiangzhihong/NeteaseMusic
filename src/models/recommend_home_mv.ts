export interface Artist {
	id: number;
	name: string;
}

export interface HomeMvData {
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
	subed: boolean;
	artists: Artist[];
	alias: string[];
}

