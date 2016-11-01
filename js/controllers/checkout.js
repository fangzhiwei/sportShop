/**
 * Created by hxsd on 2016/9/23.
 */

//定义结账数据绑定的控制器，我们把它也注册在主模块
angular.module("myapp")
    .controller("checkoutCtrl",function($scope,myCart){
        $scope.cart = myCart.findAll();  //获得购物车中所有的商品

        //计算购买商品发的总金额
        $scope.totalMoney = function(){
            var total =0;
            angular.forEach($scope.cart,function(item){
                total+=item.number*item.product.price;
            });
            return total;

        };
        $scope.remove = function(item){
           myCart.remove(item.product.name)
        };


    });