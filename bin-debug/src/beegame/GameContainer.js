/**
 * Created by andy on 2015/5/6.
 */
var beegame;
(function (beegame) {
    var GameContainer = (function (_super) {
        __extends(GameContainer, _super);
        function GameContainer() {
            _super.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
        var __egretProto__ = GameContainer.prototype;
        /**初始化*/
        __egretProto__.onAddToStage = function (event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.createGameScene();
            //api调用
            this.labelbee.text = "12";
            this.setMyInfo();
        };
        //设置蜂蜜
        __egretProto__.setMyInfo = function () {
            var worker = this.label1;
            var bottle = this.label3;
            //调用1015 个人信息
            GameContainer.useApi('api=1015', function (json) {
                var myinfo = json.data[0];
                worker.text = myinfo.bee_lvl;
                bottle.text = myinfo.honey + "/" + myinfo.hive_capacity;
            });
            var restbee = this.labelbee;
            //1029 此beacon剩余蜂蜜
            GameContainer.useApi('api=1029', function (json) {
                restbee.text = json.data;
            });
        };
        __egretProto__.createGameScene = function () {
            var sky = this.createBitmapByName("gameBg");
            this.addChild(sky);
            var stageW = this.stage.stageWidth;
            var stageH = this.stage.stageHeight;
            sky.width = stageW;
            sky.height = stageH;
            //云彩
            var cloud1 = this.createBitmapByName("cloud1");
            cloud1.anchorX = cloud1.anchorY = 0.5;
            this.addChild(cloud1);
            cloud1.x = 90;
            cloud1.y = 180;
            cloud1.scaleX = 0.9;
            cloud1.scaleY = 0.9;
            var cloud2 = this.createBitmapByName("cloud2");
            cloud2.anchorX = cloud2.anchorY = 0.5;
            cloud2.x = 550;
            cloud2.y = 230;
            cloud2.scaleX = 1;
            cloud2.scaleY = 1;
            var cloud3 = this.createBitmapByName("cloud3");
            cloud3.anchorX = cloud3.anchorY = 0.5;
            this.addChild(cloud3);
            cloud3.x = 350;
            cloud3.y = 115;
            cloud3.scaleX = 0.9;
            cloud3.scaleY = 0.9;
            this.addChild(cloud2);
            //向日葵
            var containerF = new egret.DisplayObjectContainer();
            containerF.name = "myhoney";
            containerF.x = stageW / 2;
            containerF.y = stageW / 2;
            this.flower = this.createBitmapByName("flower");
            this.flower.anchorX = this.flower.anchorY = 0.5;
            this.flower.x = 0;
            this.flower.y = 0;
            this.flower.scaleX = 0.3;
            this.flower.scaleY = 0.3;
            containerF.addChild(this.flower);
            var icon = this.createBitmapByName("collect");
            icon.anchorX = icon.anchorY = 0.5;
            icon.x = 0;
            icon.y = 0;
            icon.scaleX = 0.9;
            icon.scaleY = 0.9;
            icon.touchEnabled = true;
            containerF.addChild(icon);
            icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.collectBee, this);
            var bees = this.createBitmapByName("bees");
            bees.anchorX = bees.anchorY = 0.5;
            bees.x = -15;
            bees.y = 43;
            bees.scaleX = 0.6;
            bees.scaleY = 0.6;
            containerF.addChild(bees);
            this.labelbee = new egret.TextField();
            this.labelbee.x = 14;
            this.labelbee.y = 43;
            this.labelbee.anchorX = this.labelbee.anchorY = 0.5;
            this.labelbee.width = 80;
            this.labelbee.height = 40;
            this.labelbee.textAlign = egret.HorizontalAlign.CENTER;
            this.labelbee.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.labelbee.textColor = 0xffffff;
            this.labelbee.text = "4";
            this.labelbee.size = 20;
            containerF.addChild(this.labelbee);
            this.addChild(containerF);
            //地图图标
            var map = this.createBitmapByName("map");
            map.anchorX = map.anchorY = 0.5;
            this.addChild(map);
            map.x = map.width / 2 + 50;
            map.y = stageH - map.height / 2 - 40;
            map.scaleX = 1;
            map.scaleY = 1;
            map.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapMap, this);
            map.touchEnabled = true;
            //战斗按钮
            //var fight: egret.Bitmap = this.createBitmapByName("fight");
            //fight.anchorX = fight.anchorY = 0.5;
            //this.addChild(fight);
            //fight.x = stageW - fight.width/2 - 5;
            //fight.y = stageH - fight.height / 2 - 5;
            //fight.scaleX = 0.8;
            //fight.scaleY = 0.8;
            //帮助按钮
            var help = this.createBitmapByName("help");
            help.anchorX = help.anchorY = 0.5;
            this.addChild(help);
            help.x = stageW - help.width / 2 - 60;
            help.y = help.height / 2 + 110;
            help.scaleX = 1.1;
            help.scaleY = 1.1;
            help.touchEnabled = true;
            help.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapRules, this);
            //支付按钮
            var beePay = this.createBitmapByName("beepay");
            beePay.anchorX = beePay.anchorY = 0.5;
            beePay.x = stageW - beePay.width / 2 - 60;
            beePay.y = stageH - beePay.height / 2 - 39;
            beePay.scaleX = beePay.scaleY = 1;
            beePay.touchEnabled = true;
            beePay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapPay, this);
            this.addChild(beePay);
            //工蜂 组合
            var container1 = new egret.DisplayObjectContainer();
            container1.touchChildren = true; //等同于Flash的mouseChildren
            container1.touchEnabled = true; //设置容器是否响应Touch交互
            container1.name = "myhoney";
            container1.x = 40;
            container1.y = 10;
            container1.scaleX = 1.1;
            container1.scaleY = 1.1;
            var shape1 = new egret.Shape();
            shape1.graphics.beginFill(0x005757);
            shape1.graphics.drawRect(40, 20, 140, 40);
            shape1.graphics.endFill();
            shape1.touchEnabled = true;
            container1.addChild(shape1);
            this.label1 = new egret.TextField();
            this.label1.x = 40;
            this.label1.y = 20;
            this.label1.width = 140;
            this.label1.height = 40;
            this.label1.textAlign = egret.HorizontalAlign.CENTER;
            this.label1.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.label1.textColor = 0xffffff;
            this.label1.text = "23";
            this.label1.size = 20;
            this.label1.touchEnabled = true;
            container1.addChild(this.label1);
            //我的蜂蜜按钮
            var myhoney = this.createBitmapByName("myhoney");
            myhoney.anchorX = 0.5;
            myhoney.anchorY = 0;
            myhoney.x = 40;
            myhoney.y = 12;
            myhoney.scaleX = 0.8;
            myhoney.scaleY = 0.8;
            myhoney.touchEnabled = true;
            container1.addChild(myhoney);
            //加号图标
            var plus1 = this.createBitmapByName("plus");
            plus1.anchorX = 0.5;
            plus1.anchorY = 0;
            plus1.x = this.label1.width + 40;
            plus1.y = 17;
            plus1.scaleX = 1.3;
            plus1.scaleY = 1.3;
            plus1.touchEnabled = true;
            container1.addChild(plus1);
            this.addChild(container1);
            //蜜罐 组合
            var container3 = new egret.DisplayObjectContainer();
            container3.touchChildren = true; //等同于Flash的mouseChildren
            container3.touchEnabled = true; //设置容器是否响应Touch交互
            container3.name = "mybottle";
            container3.x = 380;
            container3.y = 10;
            container3.scaleX = container3.scaleY = 1.1;
            var shape3 = new egret.Shape();
            shape3.graphics.beginFill(0x005757);
            shape3.graphics.drawRect(40, 20, 140, 40);
            shape3.graphics.endFill();
            shape3.touchEnabled = true;
            container3.addChild(shape3);
            this.label3 = new egret.TextField();
            this.label3.x = 40;
            this.label3.y = 20;
            this.label3.width = 140;
            this.label3.height = 40;
            this.label3.textAlign = egret.HorizontalAlign.CENTER;
            this.label3.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.label3.textColor = 0xffffff;
            this.label3.text = "100/100";
            this.label3.size = 20;
            this.label3.touchEnabled = true;
            container3.addChild(this.label3);
            //我的蜂蜜按钮
            var mybottle = this.createBitmapByName("mybottle");
            mybottle.anchorX = 0.5;
            mybottle.anchorY = 0;
            mybottle.x = 40;
            mybottle.y = 12;
            mybottle.scaleX = 0.7;
            mybottle.scaleY = 0.7;
            mybottle.touchEnabled = true;
            container3.addChild(mybottle);
            //右侧图标
            var plus3 = this.createBitmapByName("upgrade");
            plus3.anchorX = 0.5;
            plus3.anchorY = 0;
            plus3.x = this.label3.width + 40;
            plus3.y = 17;
            plus3.scaleX = 1.3;
            plus3.scaleY = 1.3;
            plus3.touchEnabled = true;
            container3.addChild(plus3);
            this.addChild(container3);
            container1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.labelTap, this);
            container3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.labelTap, this);
            //动画效果
            this.startAnimation(cloud1, cloud2, cloud3);
        };
        __egretProto__.createBitmapByName = function (name) {
            var result = new egret.Bitmap();
            var texture = RES.getRes(name);
            result.texture = texture;
            return result;
        };
        /**
         * 描述文件加载成功，开始播放动画
         * Description file loading is successful, start to play the animation
         */
        __egretProto__.startAnimation = function (cloud1, cloud2, cloud3) {
            //向日葵的动作
            var tw = egret.Tween.get(this.flower);
            var change = function () {
                //向日葵的动作
                tw.to({ scaleX: 0.7, scaleY: 0.7 }, 2000);
                //tw.call(change, this);
            };
            //cloud1的动作
            var change2 = function () {
                var tw2 = egret.Tween.get(cloud1);
                tw2.to({ x: -10 }, 18000).set({ x: 700 });
                tw2.call(change2, this);
            };
            //cloud2
            var change3 = function () {
                var tw3 = egret.Tween.get(cloud2);
                tw3.to({ x: -20 }, 24000).set({ x: 700 });
                tw3.call(change3, this);
            };
            //cloud3
            var change4 = function () {
                var tw4 = egret.Tween.get(cloud3);
                tw4.to({ x: -10 }, 30000).set({ x: 700 });
                tw4.call(change4, this);
            };
            change();
            change2();
            change3();
            change4();
        };
        /*点击标签*/
        __egretProto__.labelTap = function (event) {
            var msg = event.type;
            msg += "\n" + event.stageX + "," + event.stageY;
            msg += "\n" + event.localX + "," + event.localY;
            msg += "\n" + event.currentTarget.name + "," + event.target.name;
            console.log(msg);
            //工蜂按钮
            if (event.currentTarget.name === 'myhoney') {
                //honeyPanel
                this.honeyPanel = new beegame.HoneybeePanel();
                this.honeyPanel.addEventListener("close", this.closePanel, this);
                this.honeyPanel.addEventListener("buy", this.buybee, this);
                if (this.honeyPanel) {
                    this.addChild(this.honeyPanel);
                }
                else
                    console.log('null');
            }
            else if (event.currentTarget.name === 'mysoldier') {
                alert('兵蜂按钮');
            }
            else if (event.currentTarget.name === 'mybottle') {
                //bottlePanel
                this.bottlePanel = new beegame.Bottle();
                this.bottlePanel.addEventListener("close", this.closePanel, this);
                this.bottlePanel.addEventListener("buy", this.buyhive, this);
                if (this.bottlePanel) {
                    this.addChild(this.bottlePanel);
                }
                else
                    console.log('null');
            }
        };
        __egretProto__.tapMap = function (event) {
            location.href = '#map';
        };
        __egretProto__.tapPay = function (event) {
            location.href = '#beepay';
        };
        __egretProto__.tapRules = function (event) {
            //rulesPanel
            this.rulesPanel = new beegame.Rules();
            this.rulesPanel.addEventListener("close", this.closePanel, this);
            if (this.rulesPanel)
                this.addChild(this.rulesPanel);
            else
                console.log('null');
        };
        //关闭所有panel
        __egretProto__.closePanel = function () {
            if (this.honeyPanel && this.honeyPanel.parent)
                this.removeChild(this.honeyPanel);
            if (this.bottlePanel && this.bottlePanel.parent)
                this.removeChild(this.bottlePanel);
            if (this.rulesPanel && this.rulesPanel.parent)
                this.removeChild(this.rulesPanel);
            if (this.confirm && this.confirm.parent)
                this.removeChild(this.confirm);
        };
        __egretProto__.buybee = function () {
            var mthis = this;
            this.closePanel();
            this.confirm = new beegame.Confirm();
            this.confirm.addEventListener("close", this.closePanel, this);
            this.confirm.addEventListener("buy", function () {
                GameContainer.useApi('api=1019&type=bee', function (json) {
                    if (json.status === 0) {
                        //购买不成功
                        mthis.payFail();
                    }
                    else {
                        //购买成功
                        mthis.setMyInfo();
                        mthis.closePanel();
                    }
                });
            }, this);
            this.addChild(this.confirm);
        };
        //购买失败
        __egretProto__.payFail = function () {
            var mthis = this;
            var bgimg = this.createBitmapByName('payFail');
            bgimg.anchorX = 0.5;
            bgimg.anchorY = 0.5;
            bgimg.x = 640 / 2;
            bgimg.y = 640 / 2;
            bgimg.scaleX = 1;
            bgimg.scaleY = 1;
            bgimg.touchEnabled = true;
            bgimg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                mthis.closePanel();
                mthis.removeChild(bgimg);
            }, this);
            this.addChild(bgimg);
        };
        //采蜜失败
        __egretProto__.beeFail = function (message) {
            var container1 = new egret.DisplayObjectContainer();
            container1.touchChildren = true; //等同于Flash的mouseChildren
            container1.touchEnabled = true; //设置容器是否响应Touch交互
            container1.scaleX = container1.scaleY = 1;
            var mthis = this;
            var bgimg = this.createBitmapByName('beeFail');
            bgimg.anchorX = 0.5;
            bgimg.anchorY = 0.5;
            bgimg.x = 640 / 2;
            bgimg.y = 640 / 2;
            bgimg.scaleX = 1;
            bgimg.scaleY = 1;
            bgimg.touchEnabled = true;
            container1.addChild(bgimg);
            var faillab = new egret.TextField();
            faillab.x = 360;
            faillab.y = 200;
            faillab.width = 210;
            faillab.height = 120;
            faillab.textAlign = egret.HorizontalAlign.LEFT;
            faillab.verticalAlign = egret.VerticalAlign.MIDDLE;
            faillab.textColor = 0xffe64f;
            faillab.text = message;
            faillab.size = 18;
            faillab.lineSpacing = 5;
            faillab.fontFamily = 'Microsoft Yahei';
            faillab.bold = true;
            faillab.touchEnabled = true;
            container1.addChild(faillab);
            container1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                mthis.removeChild(container1);
            }, this);
            this.addChild(container1);
        };
        //采蜜成功
        __egretProto__.beeSucc = function () {
            var mthis = this;
            var bgimg = this.createBitmapByName('beeSucc');
            bgimg.anchorX = 0.5;
            bgimg.anchorY = 0.5;
            bgimg.x = 640 / 2;
            bgimg.y = 640 / 2;
            bgimg.scaleX = 1;
            bgimg.scaleY = 1;
            bgimg.touchEnabled = true;
            bgimg.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                mthis.removeChild(bgimg);
            }, this);
            this.addChild(bgimg);
        };
        __egretProto__.buyhive = function () {
            var mthis = this;
            //关闭hive页面
            //打开确认页面
            this.closePanel();
            this.confirm = new beegame.Confirm();
            this.confirm.addEventListener("close", this.closePanel, this);
            this.confirm.addEventListener("buy", function () {
                GameContainer.useApi('api=1019&type=hive', function (json) {
                    if (json.status === 0) {
                        //购买不成功
                        mthis.payFail();
                    }
                    else {
                        //购买成功
                        mthis.setMyInfo();
                        mthis.closePanel();
                    }
                });
            }, this);
            this.addChild(this.confirm);
        };
        //点击蜂蜜收集
        __egretProto__.collectBee = function (event) {
            var mthis = this;
            var tw = egret.Tween.get(this.flower);
            //向日葵的动作
            tw.to({ scaleX: 0.3, scaleY: 0.3 }, 1500).to({ scaleX: 0.7, scaleY: 0.7 }, 1000).call(function () {
            });
            //mthis.beeFail('不要太贪心哦，总采同一朵花是不行滴，去别的花试试手气（可以借助采蜜地图）！');
            //检查用户的昵称
            GameContainer.useApi('api=1015', function (json) {
                var nick = json.data[0].nick;
                //累计采集蜂蜜数
                var totalhoney = json.data[0].totalhoney;
                var mobile = json.data[0].mobile;
                //检测nick
                if (totalhoney >= 100 && !nick) {
                    location.href = "#mynick";
                }
                //检测mobile
                if (totalhoney >= 100 && !mobile) {
                    location.href = "#mobCheck";
                }
                else {
                    //采蜜接口
                    GameContainer.useApi('api=1016', function (json) {
                        if (json.status === 1) {
                            //采蜜成功
                            mthis.setMyInfo();
                            mthis.beeSucc();
                        }
                        else {
                            //采蜜失败
                            mthis.beeFail(json.data);
                        }
                    });
                }
            });
        };
        __egretProto__.addSoldier = function () {
            //兵蜂 组合
            var container2 = new egret.DisplayObjectContainer();
            container2.touchChildren = true; //等同于Flash的mouseChildren
            container2.touchEnabled = true; //设置容器是否响应Touch交互
            container2.name = "mysoldier";
            container2.x = container2.y = 0;
            var shape2 = new egret.Shape();
            shape2.graphics.beginFill(0x005757);
            shape2.graphics.drawRect(250, 20, 140, 40);
            shape2.graphics.endFill();
            shape2.touchEnabled = true;
            container2.addChild(shape2);
            var label2 = new egret.TextField();
            label2.x = 250;
            label2.y = 20;
            label2.width = 140;
            label2.height = 40;
            label2.textAlign = egret.HorizontalAlign.CENTER;
            label2.verticalAlign = egret.VerticalAlign.MIDDLE;
            label2.textColor = 0xffffff;
            label2.text = "2";
            label2.size = 20;
            label2.touchEnabled = true;
            container2.addChild(label2);
            //我的蜂蜜按钮
            var mysoldier = this.createBitmapByName("mysoldier");
            mysoldier.anchorX = 0.5;
            mysoldier.anchorY = 0;
            mysoldier.x = 250;
            mysoldier.y = 12;
            mysoldier.scaleX = 0.8;
            mysoldier.scaleY = 0.8;
            mysoldier.touchEnabled = true;
            container2.addChild(mysoldier);
            //加号图标
            var plus2 = this.createBitmapByName("plus");
            plus2.anchorX = 0.5;
            plus2.anchorY = 0;
            plus2.x = label2.width + 250;
            plus2.y = 17;
            plus2.scaleX = 1.3;
            plus2.scaleY = 1.3;
            plus2.touchEnabled = true;
            container2.addChild(plus2);
            this.addChild(container2);
            container2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.labelTap, this);
        };
        GameContainer.useApi = function (url, succ) {
            var urlreq = new egret.URLRequest("http://cusflo.com/api/api_c02_n.php");
            urlreq.data = new egret.URLVariables(url);
            urlreq.method = egret.URLRequestMethod.GET;
            var urlloader = new egret.URLLoader;
            urlloader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            urlloader.addEventListener(egret.Event.COMPLETE, function (evt) {
                var result = JSON.parse(urlloader.data);
                if (succ)
                    succ(result);
            }, this);
            urlloader.load(urlreq);
        };
        GameContainer.testNetwork = function (inbeacon, outbeacon) {
            var urlreq = new egret.URLRequest("http://wi-beacon.net:81");
            urlreq.method = egret.URLRequestMethod.GET;
            var urlloader = new egret.URLLoader;
            urlloader.dataFormat = egret.URLLoaderDataFormat.TEXT;
            urlloader.addEventListener(egret.Event.COMPLETE, function (evt) {
                console.dir(urlloader.data);
            }, this);
            urlloader.load(urlreq);
        };
        return GameContainer;
    })(egret.DisplayObjectContainer);
    beegame.GameContainer = GameContainer;
    GameContainer.prototype.__class__ = "beegame.GameContainer";
})(beegame || (beegame = {}));
