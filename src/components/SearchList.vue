<template>
    <div class="SearchList">
        <ul class="search">
            <li v-for="s in suggets" :key="s.id" @click="setSearch(s.name)">
                <i></i>
                {{s|filtType}}{{s.name}}
            </li>
        </ul>
        <div class="kong"></div>
    </div>
</template>
<script>
export default {
    props:{
        suggets:{
            type:Array,
            default:function(){
                return [];
            }
        }
    },
    methods: {
        // 点击显示列表，把value传到输入框
        setSearch(vel){
            this.$emit("Searchwords",vel);
        }
    },
    filters: {
        filtType(v){
            if(typeof v.artists !='undefined'){
                return '歌曲：'
            }else if(typeof v.artist !='undefined'){
                return '专辑：'
            }else{
                return '歌手：'
            }
        }
    }
}
</script>
<style lang="less">
    .search{
        li{
            display: flex;
            align-items: center;
            text-align: left;
            height: 45px;
            padding-left: 10px;
            border-bottom: 1px solid rgba(0, 0, 0,.03);
            i{
                display: inline-block;
                width: 15px;
                height: 15px;
                background: url("../assets/img/bulo.svg");
                background-size: contain;
                margin-right: 7px;
            }
        }
    }
</style>