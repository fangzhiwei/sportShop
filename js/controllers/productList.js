/**
 * Created by hxsd on 2016/9/22.
 */


myapp.controller("productCtrl",function($scope,myCart){
    //保存当前选中的类别名称
    $scope.selectedCategory = null;
    //响应用户选择商品类别操作
    $scope.selectCategory = function(category){
        $scope.selectedCategory = category;
        $scope.pageNum = 1;  //当改变商品类别是，当页码数重置为1

    };

    //过滤器函数：参数是被过滤的每一个元素
    $scope.filterByCategory = function(product){
        return $scope.selectedCategory ==null || $scope.selectedCategory==product.category;
    };

    //用于分页的变量
    $scope.pageNum = 1;     //当前请求的页码数
    $scope.pageSize = 3;        //页面大小


    //分页按钮
    $scope.selectPage=function(page){
        $scope.pageNum = page;

    };

    //将指定商品添加到购物车的方法
    $scope.add = function(product){
        myCart.add(product);

    }



});