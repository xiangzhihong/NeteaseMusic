export interface MvListData {
     count: number;
     hasMore: boolean;
     data: Array<MvData>;
     code: number;
};

export interface MvData {
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
     artists: Array<Artists>;
};

export interface Artists {
     id: number;
     name: string;
     alias: Array<string>;
     transNames?: any;
};

