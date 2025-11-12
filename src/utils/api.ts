import type { Banner } from "@/models/banner";
import type { DjProgram, Personalized, PersonalizedMv, PersonalizedNewSong } from "@/models/personalized";
import type { PlayListDetail, PlaylistHighqualityTag } from "@/models/playlist";
import type { PlayListCat } from "@/models/playlist_cat";
import type { Song } from "@/models/song";
import type { SongUrl } from "@/models/song_url";
import type { TopListDetail } from "@/models/toplist_detail";
import http from "@/utils/http";
import qs from 'qs';
import type { Artist, Mv } from "@/models/artist";
import type { ArtistDesc, ArtistDetail } from "@/models/artist_detail";
import type { Album } from "@/models/album";
import type { PersonalizedPrivateContent, Video, VideoGroup } from "@/models/video";
import type { SearchHot, SearchSuggest } from "@/models/search";
import type { MvDetail } from "@/models/mvdetail";

import type { PlayListHot } from "@/models/playlist_hot";
import type { UserProfile } from "@/models/user";
import { MvListData } from "@/models/mvlist";
import { RecommendMv } from "@/models/recommend_mv";
import { MvUrl } from "@/models/mvurl";
import { MvComment, MvComments } from "@/models/mvcomment";
import { SingerSong } from "@/models/singersong";
import { SimiMv } from "@/models/simimv";
import { HomeRecommendMv } from "@/models/recommend_home_mv";
import { PlayListComment } from "@/models/playlist_comment";
import { DjPersonalize } from "@/models/dj_personalize";
import { count } from "console";

export async function useLogin(phone: string, password: string) {
    return await http.get<{
        code: number,
        cookie: string,
        token: string,
    }>("login/cellphone", { phone: phone, password: password })
}

export async function useLoginStatus() {
    return await http.get<{
        data: {
            code: number,
            profile: UserProfile
        },
    }>("login/status")
}

export async function getSongUrl(id: number) {
    const { data } = await http.get<{ data: SongUrl[] }>('/song/url', { id: id })
    return data.first()
}

export async function getDetail(id: number) {
    const { songs } = await http.get<{ songs: Song[] }>('/song/detail', { ids: id })
    return songs.first()
}

export async function getBanner() {
    const { banners } = await http.get<{ banners: Banner[] }>('/banner', { type: 1 })
    return banners
}

export async function usePersonalized() {
    const { result } = await http.get<{ result: Personalized[] }>('/personalized')
    return result
}

export async function usePersonalizedNewSong() {
    const { result } = await http.get<{ result: PersonalizedNewSong[] }>('/personalized/newsong')
    return result
}

//获取歌曲列表
export async function getPlayListDetail(id: number, s: number = 8) {
    const { playlist } = await http.get<{ playlist: PlayListDetail }>('/playlist/detail', { id: id, s: s })
    return playlist
}

//获取歌曲列表评论
export async function getPlayListComment(id: number, offset: number) {
    const limit = 20;
    //http://localhost:3000/comment/playlist?id=120046814&limit=50&offset=0
    const data = await http.get<{ playlist: PlayListComment }>('comment/playlist', { id: id, limit: limit, offset: offset })
    return data
}



export async function getPlayListTrackAll(id: number) {
    const { songs } = await http.get<{ songs: Song[] }>('playlist/track/all', { id: id })
    return songs
}

export async function useTopListDetail() {
    const { list } = await http.get<{ list: TopListDetail[] }>('/toplist/detail')
    return list
}

export async function usePlayListCatList() {
    const { sub, categories } = await http.get<{ sub: PlayListCat[], categories: string[] }>('playlist/catlist')

    return { sub, categories }
}

export async function getArtistList(pageData: { type: number, area: number, initial: string, page: number, limit: number }) {
    const res = await http.get<{ artists: Artist[] }>('artist/list', {
        type: pageData.type,
        area: pageData.area,
        initial: pageData.initial,
        limit: pageData.limit,
        offset: (pageData.page - 1) * pageData.limit
    })

    return res.artists
}

export async function useArtistDetail(id: number) {
    const { data } = await http.get<{ data: ArtistDetail }>('artist/detail', { id: id })
    return data
}

export async function useArtistDesc(id: number) {
    return await http.get<ArtistDesc>('artist/desc', { id: id })
}

export async function useArtistSongs(id: number, order: string = 'time', limit: number = 10, offset: number = 0) {
    return await http.get<{ songs: Song[] }>('artist/songs', { id: id, order: order, limit: limit, offset: offset })
}

export async function useArtistAlbum(id: number, limit: number = 10, offset: number = 0) {
    return await http.get<{ hotAlbums: Album[] }>('artist/album', { id: id, limit: limit, offset: offset })
}

export async function useArtistMv(id: number, limit: number = 10, offset: number = 0) {
    return await http.get<{ mvs: Mv[] }>('artist/mv', { id: id, limit: limit, offset: offset })
}

export async function useVideoTimelineRecommend(offset: number = 0) {
    const { datas } = await http.get<{ datas: Video[] }>('video/timeline/recommend', { offset: offset })
    return datas
}

export async function usePersonalizedPrivateContentList(limit: number = 10, offset: number = 0) {
    const { result } = await http.get<{ result: PersonalizedPrivateContent[] }>('personalized/privatecontent/list', {
        limit: limit,
        offset: offset
    })
    return result
}

//推荐MV
export async function usePersonalizedMv() {
    const { result } = await http.get<{ result: PersonalizedMv[] }>('personalized/mv')
    return result
}

//首页推荐MV
export async function getRecomendMv() {
    const limit = 4;
    const { data } = await http.get<{ data: HomeRecommendMv }>("mv/first", { limit: limit })
    return data;
}

export async function usePersonalizedDjProgram() {
    const { result } = await http.get<{ result: DjProgram[] }>('personalized/djprogram')
    return result
}


//获取推荐电台
export async function getDjPersonalize() {
    const limit = 8;
    const { data } = await http.get<{ data: DjPersonalize }>("dj/personalize/recommend", { limit: limit })
    return data
}

export async function useVideoGroupList() {
    const { data } = await http.get<{ data: VideoGroup[] }>('video/group/list')
    return data
}

export async function useVideoGroup(id?: number, offset?: number) {
    const { datas } = await http.get<{ datas: Video[] }>(id ? 'video/group' : 'video/timeline/all', {
        id: id,
        offset: offset
    })
    return datas
}

//MV列表
export async function getMvList(area = '全部', order = '最热', type = '全部', offset = 0) {
    const limit = 20;
    const data = await http.get<{count:number, data: MvListData }>("mv/all", {
        limit: limit,
        offset: offset,
        area: area,
        order: order,
        type: type
    })
    return data;
}

//MV详情
export async function getMvDetail(mvid: number) {
    const data = await http.get<{ data: MvDetail }>("mv/detail", { mvid: mvid })
    return data;
}

//获取mv地址
export async function getMvUrl(id: number) {
    const { data } = await http.get<{ data: MvUrl }>("mv/url", { id: id })
    return data
}

//推荐mv
export async function getRecommendMv() {
    const { data } = await http.get<{ data: RecommendMv }>("/mv/first?limit=4")
    return data;
}

//获取歌手单曲，获得歌手部分信息和热门歌曲
export async function getSingerSong(id: number) {
    const data = await http.get<{ data: SingerSong }>("artists", { id: id })
    return data;
}

// 相似推荐mv
export async function getSimiMv(mvid: number) {
    const data = await http.get<{ data: SimiMv }>("simi/mv", { mvid: mvid })
    return data;
}

//MV评论
export async function getMvComment(id: number, offset: number) {
    // http://localhost:3000/comment/mv?id=10900871&limit=20&offset=1
    const limit = 20;
    const data = await http.get<{ data: MvComments }>("comment/mv", { id: id, limit: limit, offset: offset })
    return data;
}


// 给评论点赞
export async function likeComment(data: {
    t: number;// 是否点赞 1 为点赞 0 为取消点赞
    cid: number, //评论 id
    type: number, //0: 歌曲1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
    id: number, //对应资源 id
}) {
    const params = qs.stringify({
        ...data,
        timestamp: Date.now()
    });
    const result = await http.get<{ data: any }>('/comment/like?' + params)
    return result;
}


export async function useAlbum(id: number) {
    const { album, songs } = await http.get<{ album: Album, songs: Song[] }>('album', { id: id })
    return { album, songs }
}

export async function getSearchHot() {
    const { data } = await http.get<{ data: SearchHot[] }>('search/hot/detail')
    return data
}

export async function useSearchSuggest(keywords: string) {
    const { result } = await http.get<{ result: SearchSuggest }>('search/suggest', { keywords: keywords })
    return result
}

export async function usemovieDetail(mvid: number) {

}



export async function usePlaylistHighqualityTags() {
    const { tags } = await http.get<{ tags: PlaylistHighqualityTag[] }>("playlist/highquality/tags")

    return tags
}

export async function usePlaylistHot() {
    const { tags } = await http.get<{ tags: PlayListHot[] }>("playlist/hot")

    return tags
}

export async function useTopPlaylistHighquality(params?: { limit?: number, before?: number, cat: string }) {
    return await http.get<{ playlists: PlayListDetail[], total: number, more: boolean, lasttime: number }>("top/playlist/highquality", params)

}
