<template>
    <h2 class="t1"><slot></slot></h2>
</template>
<style lang="less" scoped>
    .t1{
        color: #000;
        text-align: left;
        border-left: 2px solid red;
        padding-left:9px;
        margin: 10px 0px;
        font-size: 17px;
        font-weight: 400;
    }
</style>