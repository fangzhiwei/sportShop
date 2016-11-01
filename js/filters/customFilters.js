/**
 * Created by hxsd on 2016/9/22.
 *
 * 再创建一个新的模块，在这个模块里定义独立的/通用的过滤器
 */

//
angular.module("marsFilter",[]);
//在该模块注册一个分页的过滤器
angular.module("marsFilter")
    .filter("pagerFilter",function(){

    //这个过滤器的函数会接收三个参数
    //参数1：是被过滤的数组（某一类别的商品集合）
    //参数2：是请求的页码数
    //参数3：是页面大小
    return function (productList,pageNum,pageSize){
        //angular提供有几个工具函数，用来判断数据类型
        if(angular.isArray(productList) && angular.isNumber(pageNum) && angular.isNumber(pageSize)){
            //根据分页算法，计算请求页面数据的起始索引值
            var startIndex = (pageNum-1)*pageSize;
            //判断起始索引是不是在传进来的数组范围内
            if(startIndex>=productList.length){
                //如果计算的索引超出了范围，就返回一个空数组
                return [];
            }
            //从传进的数组中截取指定数量（pageSize）的商品出来，并返回
            return productList.slice(startIndex,startIndex+pageSize);

        }else{
            //如果传进来的不是想要的数组，返回出去，不破坏它
            return productList;
        }

    }
})
    .filter("pageNavFilter",function(){
        return function(productList,pageSize){
            if(angular.isArray(productList) && angular.isNumber(pageSize)){
                //计算页数
                var pageNumber = Math.ceil(productList.length/pageSize);

                //声明一个新的数据，并返回
                var nav = [];
                for(var i=0;i<pageNumber;i++){
                    nav.push(i+1);          //1,2,3  =>nav

                };
                return nav;
            }else {
                return productList;
            }

        }
    });


