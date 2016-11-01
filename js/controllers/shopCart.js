/**
 * Created by hxsd on 2016/9/23.
 * 创建一个新的模块，负责管理和维护单例的购物车对象
 * 以及购物车相关的控制器，数据和视图（MVC）
 * 在angularJS中，创建单例的service对象，有多种方式，
 * 最常见的是工厂方法factory
 */

angular.module("marsCart",[])
    .factory("myCart",function(){
        var cart = [];
        return {
            //添加商品到购物车的方法
            add:function (product) {
                for(var i=0;i<cart.length;i++){
                    var item =  cart[i];
                    //判断购物车中是否已经有了该商品
                    if(item.product.name==product.name){
                        item.number++;
                        return;
                    }
                }
                //如果代码执行到这里，说明购物车中没有要添加的商品
                //构造一个购买项item，加入到购物框中；
                cart.push({product:product,number:1})
            },

            //从购物车中删除某种商品的方法
            remove:function(name){
                //遍历购物筐，找到要删除的商品
                for(var i=0;i<cart.length;i++){
                    var item =  cart[i];
                    //判断购物车中是否已经有了该商品
                    if(item.product.name==name){
                        //说明找到了该商品，将该商品从数组中删除
                        cart.splice(i,1);
                        return;
                    }
                }
            },

            //获得购物车中所有商品的方法
            findAll:function(){
                return cart;
            },

            //清空购物车
            clear:function(){
                cart.length =0;
            }
        };

    })
    //依赖注入购物车
    .controller("cartCtrl",function($scope,myCart){
        var cart = myCart.findAll();  //获得购物车中所有购买的商品
        $scope.count = function(){
            var total = 0;
            angular.forEach(cart,function(item){
                total+=item.number;  //累加每种商品的购买数量

            });
            return total;
        };

        $scope.money = function(){
            var total = 0;
            angular.forEach(cart,function(item){
                total +=item.number*item.product.price;  //累加每种商品的购买金额
            });
            return total;
        };

    });


