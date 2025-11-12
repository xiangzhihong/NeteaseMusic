import { createRouter, createWebHashHistory } from 'vue-router'
import { Pages } from "@/router/pages";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: Pages.home,
            component: () => import('@/views/Root.vue'),
            redirect: { name: Pages.discover },
            children: [
                {
                    path: 'discover',
                    name: 'discover',
                    component: () => import("@/views/discover/Discover.vue"),
                    meta: {
                        menu: 'discover',
                        keepAlive: true,
                    }
                },
                {
                    path: 'music',
                    name: 'music',
                    component: () => import('@/views/music/Music.vue'),
                    redirect: { name: 'picked' },
                    meta: {
                        menu: 'music'
                    },
                    children: [
                        {
                            path: 'picked',
                            name: 'picked',
                            component: () => import("@/views/music/picked/Picked.vue"),
                            meta: {
                                menu: 'music',
                                title: '精选',
                                keepAlive: true,
                            }
                        },
                        {
                            path: 'radio',
                            name: 'radio',
                            component: () => import("@/views/music/radio/Radio.vue"),
                            meta: {
                                menu: 'music',
                                title: '有声电台',
                                keepAlive: true,
                            }
                        },
                        {
                            path: 'toplist',
                            name: 'toplist',
                            component: () => import("@/views/music/toplist/TopList.vue"),
                            meta: {
                                menu: 'music',
                                keepAlive: true,
                            }
                        },
                        {
                            path: 'artist',
                            name: 'artist',
                            component: () => import('@/views/music/artist/Artist.vue'),
                            meta: {
                                menu: 'music',
                                title: '歌手',
                                keepAlive: true,
                            }
                        },
                        {
                            path: Pages.category,
                            name: Pages.category,
                            component: () => import('@/views/music/category/Category.vue'),
                            meta: {
                                menu: 'music',
                                title: '分类歌单',
                                keepAlive: true,
                            }
                        }
                    ]
                },
                {
                    path: 'playlist',
                    name: 'playlist',
                    component: () => import('@/views/playlist/PlayList.vue'),
                },
                {
                    path: 'artistDetail',
                    name: 'artistDetail',
                    component: () => import('@/views/artist/ArtistDetail.vue'),
                },
                {
                    path: 'album',
                    name: 'album',
                    component: () => import('@/views/album/Album.vue'),
                },
                {
                    path: 'video',
                    name: 'video',
                    component: () => import('@/views/video/Video.vue'),
                    meta: {
                        menu: 'video',
                        title: '视频',
                        keepAlive: true,
                    }
                },
                {
                    path: 'mv',
                    name: 'mv',
                    component: () => import('@/views/mv/Mv.vue'),
                    meta: {
                        menu: 'mv',
                        title: 'MV',
                        keepAlive: true,
                    }
                },
                {
                    path: 'dj',
                    name: 'dj',
                    component: () => import('@/views/dj/DJ.vue'),
                    meta: {
                        menu: 'dj',
                        title: '电台',
                        keepAlive: true,
                    }
                },
                {
                    path: 'singer',
                    name: 'singer',
                    component: () => import('@/views/music/artist/Artist.vue'),
                    meta: {
                        menu: 'singer',
                        title: '歌手',
                        keepAlive: true,
                    }
                },
                {
                    path: '/mv/:id',
                    name: 'MvDetail',
                    component: () => import('@/views/mv/MvDetail.vue'),
                    meta: { hidden: true, auth: false }
                },
                {
                    path: Pages.movieDetail,
                    name: Pages.movieDetail,
                    component: () => import('@/views/video/videoDetail.vue'),
                }
            ],
        },
    ]
})

export default router
