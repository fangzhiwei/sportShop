/*
*
*声明一个主模块，作为程序的入口
* */
var myapp = angular.module("myapp",["marsFilter","marsCart","ngRoute"]);


//配置路由
myapp.config(function($routeProvider){
    $routeProvider.when("/productList",{templateUrl:"views/productList.html",controller:"productCtrl"});
    $routeProvider.when("/checkout",{templateUrl:"views/checkoutSummary.html",controller:"checkoutCtrl"});
    $routeProvider.when("/placeorder",{templateUrl:"views/placeOrder.html"});
    $routeProvider.when("/thankyou",{templateUrl:"views/thankYou.html"});
    //配置默认路由
    $routeProvider.otherwise({templateUrl:"views/productList.html",controller:"productCtrl"});

});

//注册一个顶级的控制器，这个控制器主要是处理全局共享的商品数据
//需要注入一个购物车对象，在提交订单时要取得其中用户购买的商品
//需要注入$http服务，向服务器提交订单数据
myapp.controller("sportStoreCtrl",function($scope,$http,$location,myCart){
    $scope.data = {
        //商品类别
        categories:[
            {id:10001,category:"商品类别01"},
            {id:10001,category:"商品类别02"},
            {id:10001,category:"商品类别03"},
            {id:10001,category:"商品类别04"}
        ],
        //商品的明细
        products:[
            {name:"淘宝商品01",category:"商品类别01",price:100,desc:"2016流行新款",imgsrc:"images/TB1_50X50.jpg"},
            {name:"淘宝商品058",category:"商品类别01",price:200,desc:"2016流行新款",imgsrc:"images/TB2_50X50.jpg"},
            {name:"淘宝商品02",category:"商品类别01",price:199,desc:"2016流行新款",imgsrc:"images/TB3_50X50.jpg"},
            {name:"淘宝商品013",category:"商品类别02",price:250,desc:"2016流行新款",imgsrc:"images/TB4_50X50.jpg"},
            {name:"淘宝商品015",category:"商品类别02",price:360,desc:"2016流行新款",imgsrc:"images/TB1_50X50.jpg"},
            {name:"淘宝商品002",category:"商品类别02",price:79,desc:"2016流行新款",imgsrc:"images/TB2_50X50.jpg"},
            {name:"淘宝商品0020",category:"商品类别03",price:89,desc:"2016流行新款",imgsrc:"images/TB3_50X50.jpg"},
            {name:"淘宝商品012",category:"商品类别03",price:1000,desc:"2016流行新款",imgsrc:"images/TB4_50X50.jpg"},
            {name:"淘宝商品025",category:"商品类别03",price:9999,desc:"2016流行新款",imgsrc:"images/TB1_50X50.jpg"},
            {name:"淘宝商品036",category:"商品类别04",price:600,desc:"2016流行新款",imgsrc:"images/TB2_50X50.jpg"},
            {name:"淘宝商品0154",category:"商品类别04",price:800,desc:"2016流行新款",imgsrc:"images/TB3_50X50.jpg"},
            {name:"淘宝商品0151",category:"商品类别04",price:79900,desc:"2016流行新款",imgsrc:"images/TB4_50X50.jpg"},
            {name:"淘宝商品0155",category:"商品类别04",price:1,desc:"2016流行新款",imgsrc:"images/TB1_50X50.jpg"}
        ],
        shipping:{}
    };

    //响应发送订单的按钮事件
    $scope.sendOrder= function(){
        //发送给服务器的数据包括：1）购物车中的商品，2）收货人信息
        var orderData  = angular.copy($scope.data.shipping);//拷贝一份收货人信息，不破坏原始数据
        orderData.cart = myCart.findAll();

        //使用$http service将订单数据发送到服务器
        //在这里要处理订单成功的情况，和订单失败的情况
        //不管订单成功与否，都要跳转到thank you页面；
        $http.post("order.json",orderData)
            .success(function(okData,status){
                //保存返回的订单号（唯一），并显示在thankyou页面
                $scope.data.shipping.orderId =okData.orderId;
                //此时要清空购物车
                myCart.clear();
           })
            .error(function(errData,status){
            //保存保存失败的信息，并显示在thankyou页面
            $scope.data.shipping.errMsg =errData;
            $scope.data.shipping.errStatus =status;
            })
            .finally(function(){
                //最后，不管订单提交成功与否，都是跳转到thank you页面
                $location.path("/thankyou")
            })
    }


});























