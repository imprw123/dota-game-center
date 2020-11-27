export default {
    home: {
        QueryWebGoodsByFlagTopN: 'query/QueryWebGoodsByFlagTopN',
        hot: 'Query/QueryWebGoodsRankingBySalesVolumeTopN'
    },
    dota: {
        QueryWebGoodsBySeachFlagPager: 'query/QueryWebGoodsBySeachFlagPager',
        QueryWebClassInfoByCid: 'query/QueryWebClassInfoByCid'
    },
    detail: {
        QueryGoodsById: 'Query/QueryGoodsById'
    },
    rpgMap: {
        QueryRPGBySearchPager: 'Query/QueryRPGBySearchPager'
    },
    shopCar: {
        QueryUserWebCartGoods: 'Query/QueryUserWebCartGoods',
        AddWebCartGoods: 'do/AddWebCartGoods',
        DeductWebCartGoods: 'do/DeductWebCartGoods',
        RemoveWebCartGoods: 'do/RemoveWebCartGoods'
    },
    send: {
        Queryfriends: 'Query/Queryfriends',
        CheckAccount: 'Query/QueryUser'
    },
    order: {
        QueryUserOrder: 'Query/QueryUserOrder'
    },
    myMap: {
        QueryUserCollectedRPG: 'Query/QueryUserCollectedRPG',
        AddCollectedRPG: 'Do/AddCollectedRPG',
        RemoveCollectedRPG: 'Do/RemoveCollectedRPG'
    },
    pay: {
        PaymentRequest: 'Pay/PaymentRequest'
    }
}