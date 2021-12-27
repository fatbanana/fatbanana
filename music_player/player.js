var player = new Vue({
    el:"#player",
    data:{
        name:'',
        song_list:[],
        musicurl:"",
        musiicfmurl:"",
        CommentList:[],
        CommentUserImgUrl:[],
        isPlaying:false,
        isShow:false,
        mvUrl:"",
        now_song:"",
        now_singer:"",
        com_now:false,
        audio_isPlaying:false
    },
    methods:{
        
        find:function(){
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords="+this.name).then(function(response){
                that.song_list = response.data.result.songs;
                console.log(response)
            },function(err){
                console.log(err)
            })
        },
        // 获取专辑图片
        get_album_pic:function(albumid){
            var that = this
            axios.get("https://autumnfish.cn/album?id="+albumid).then(function(response){
                console.log(response.data)
                console.log(response.data.songs[0].al.picUrl)
                
                that.musiicfmurl = response.data.songs[0].al.picUrl
            },function(err){
                console.log(err)
            })
        },

        // 获取热门回复
        get_hotcommnt:function(musicId){
            var that = this
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId).then(function(response){
                console.log(response.data.hotComments)
                console.log(response)
                that.CommentList = response.data.hotComments
                that.CommentUserImgUrl = response.data.hotComments.user.avatarUrl
            },function(err){
                console.log(err)
            });
        },
        play_music:function(musicId,albumid,singer,name){
            var that = this
            console.log(musicId)
            that.musicurl = "https://music.163.com/song/media/outer/url?id=" + musicId +".mp3"
            that.now_singer = singer
            that.now_song = name
            that.com_now = true
            that.isShow = false
            that.audio_isPlaying = true
            that.get_album_pic(albumid)
            that.get_hotcommnt(musicId)
            document.getElementById("myVideo").pause();   
        },


        play:function(){
            this.audio_isPlaying = true
            this.isPlaying = true
            this.isShow = false;
            document.getElementById("myVideo").pause();            
        },
        pause:function(){
            this.isPlaying = false
        },
        play_mv:function(mvid,musicId,singer,name){
            var that = this
            document.getElementById("myaudio").pause();
            
            axios.get("https://autumnfish.cn/mv/url?id="+mvid).then(function(response){
                console.log(response.data)
                console.log(response.data.data.url)
                that.mvUrl = response.data.data.url
                that.isShow = true
                document.getElementById("myaudio").pause();
                document.getElementById("myVideo").play();
                that.now_singer = singer
                that.now_song = name
                that.com_now = true
                that.audio_isPlaying = false
                that.get_hotcommnt(musicId)
            },function(err){
                console.log(err)
            })
        },
        hide:function(){
            this.isShow = false;
            this.com_now = false
            this.CommentList = ""
            document.getElementById("myVideo").pause();
        },
        clear:function(){
            this.name = ""
        }
    }
})