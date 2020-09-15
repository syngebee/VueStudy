/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果
  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/

let app = new Vue({
    el: "#player",
    data: {
        query: '',
        musicList: [],
        id: '',
        musicSrc: '',
        musicPic: '',
        comments: [],
        isPlaying: false,
        isShow: false,
        videoSrc: '',
        mvid: '',
    },
    methods: {
        //搜索根据歌名歌曲信息方法
        searchMusic() {
            axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(
                response => this.musicList = response.data.result.songs,
                err => console.log(err)
            );
        },
        //播放方法
        playMusic(musicId) {
            //接口:获取在线播放地址
            axios.get("https://autumnfish.cn/song/url?id=" + musicId).then(
                response => this.musicSrc = response.data.data[0].url,
                err => console.log(err)
            );
            //接口:获取歌曲的封面等信息
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId).then(
                response => this.musicPic = response.data.songs[0].al.picUrl,
                err => console.log(err)
            );
            //接口:获取歌曲的评论信息
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId).then(
                response => this.comments = response.data.hotComments,
                err => console.log(err)
            );
        },
        //播放方法
        play() {
            console.log('true');
            this.isPlaying = true;
        },
        //暂停方法
        pause() {
            console.log('false');
            this.isPlaying = false;
        },
        //播放mv方法
        playMv(mvid) {
            //强制音乐暂停
            this.$refs.audio.pause();
            //接口:获取歌曲mv接口
            axios.get("https://autumnfish.cn/mv/url?id=" + mvid).then(
                response => {
                    console.log(response);
                    this.isShow = true;
                    this.videoSrc = response.data.data.url;
                },
                err => console.log(err)
            )
        },
        //隐藏mv
        hide() {
            this.isShow = false;
            //强制mv暂停
            this.$refs.video.pause();
        }
    }
});