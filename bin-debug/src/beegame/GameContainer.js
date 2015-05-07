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
            cloud1.x = 60;
            cloud1.y = 180;
            cloud1.scaleX = 0.9;
            cloud1.scaleY = 0.9;
            var cloud2 = this.createBitmapByName("cloud1");
            cloud2.anchorX = cloud2.anchorY = 0.5;
            this.addChild(cloud2);
            cloud2.x = 440;
            cloud2.y = 168;
            cloud2.scaleX = 0.9;
            cloud2.scaleY = 0.9;
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
            map.x = map.width / 2 + 25;
            map.y = stageH - map.height / 2 - 25;
            map.scaleX = 0.8;
            map.scaleY = 0.8;
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
            help.x = stageW - help.width / 2 - 80;
            help.y = help.height / 2 + 100;
            help.scaleX = 1;
            help.scaleY = 1;
            help.touchEnabled = true;
            help.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapRules, this);
            //工蜂 组合
            var container1 = new egret.DisplayObjectContainer();
            container1.touchChildren = true; //等同于Flash的mouseChildren
            container1.touchEnabled = true; //设置容器是否响应Touch交互
            container1.name = "myhoney";
            container1.x = 50;
            container1.y = 0;
            var shape1 = new egret.Shape();
            shape1.graphics.beginFill(0x005757);
            shape1.graphics.drawRect(40, 20, 140, 40);
            shape1.graphics.endFill();
            shape1.touchEnabled = true;
            container1.addChild(shape1);
            var label1 = new egret.TextField();
            label1.x = 40;
            label1.y = 20;
            label1.width = 140;
            label1.height = 40;
            label1.textAlign = egret.HorizontalAlign.CENTER;
            label1.verticalAlign = egret.VerticalAlign.MIDDLE;
            label1.textColor = 0xffffff;
            label1.text = "23";
            label1.size = 20;
            label1.touchEnabled = true;
            container1.addChild(label1);
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
            plus1.x = label1.width + 40;
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
            container3.x = 360;
            container3.y = 0;
            var shape3 = new egret.Shape();
            shape3.graphics.beginFill(0x005757);
            shape3.graphics.drawRect(40, 20, 140, 40);
            shape3.graphics.endFill();
            shape3.touchEnabled = true;
            container3.addChild(shape3);
            var label3 = new egret.TextField();
            label3.x = 40;
            label3.y = 20;
            label3.width = 140;
            label3.height = 40;
            label3.textAlign = egret.HorizontalAlign.CENTER;
            label3.verticalAlign = egret.VerticalAlign.MIDDLE;
            label3.textColor = 0xffffff;
            label3.text = "100/100";
            label3.size = 20;
            label3.touchEnabled = true;
            container3.addChild(label3);
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
            plus3.x = label3.width + 40;
            plus3.y = 17;
            plus3.scaleX = 1.3;
            plus3.scaleY = 1.3;
            plus3.touchEnabled = true;
            container3.addChild(plus3);
            this.addChild(container3);
            //honeyPanel
            this.honeyPanel = new beegame.HoneybeePanel();
            this.honeyPanel.addEventListener("close", this.closePanel, this);
            this.honeyPanel.addEventListener("buy", this.buybee, this);
            //bottlePanel
            this.bottlePanel = new beegame.Bottle();
            this.bottlePanel.addEventListener("close", this.closePanel, this);
            this.bottlePanel.addEventListener("buy", this.buybee, this);
            //rulesPanel
            this.rulesPanel = new beegame.Rules();
            this.rulesPanel.addEventListener("close", this.closePanel, this);
            container1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.labelTap, this);
            container3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.labelTap, this);
            //动画效果
            this.startAnimation(cloud1, cloud2);
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
        __egretProto__.startAnimation = function (cloud1, cloud2) {
            var change = function () {
                var tw = egret.Tween.get(cloud1);
                tw.to({ x: cloud1.x - 80 }, 20000).to({ x: cloud1.x }, 20000);
                var tw2 = egret.Tween.get(cloud2);
                tw2.to({ x: cloud2.x - 80 }, 20000).to({ x: cloud2.x }, 20000);
                tw.call(change, this);
            };
            var tw = egret.Tween.get(this.flower);
            var change2 = function () {
                //向日葵的动作
                tw.to({ scaleX: 0.7, scaleY: 0.7 }, 2200).to({ rotation: 360 }, 1000);
                //tw.call(change2, this);
            };
            change();
            change2();
        };
        /*点击标签*/
        __egretProto__.labelTap = function (event) {
            var msg = event.type;
            msg += "\n" + event.stageX + "," + event.stageY;
            msg += "\n" + event.localX + "," + event.localY;
            msg += "\n" + event.currentTarget.name + "," + event.target.name;
            console.log(msg);
            if (event.currentTarget.name === 'myhoney') {
                if (this.honeyPanel)
                    this.addChild(this.honeyPanel);
                else
                    console.log('null');
            }
            else if (event.currentTarget.name === 'mysoldier') {
                alert('兵蜂按钮');
            }
            else if (event.currentTarget.name === 'mybottle') {
                if (this.bottlePanel)
                    this.addChild(this.bottlePanel);
                else
                    console.log('null');
            }
        };
        __egretProto__.tapMap = function (event) {
            console.log('touched map');
            alert('地图被点击了,显示地图');
        };
        __egretProto__.tapRules = function (event) {
            console.log('点击规则');
            if (this.rulesPanel)
                this.addChild(this.rulesPanel);
            else
                console.log('null');
        };
        __egretProto__.closePanel = function () {
            //关闭所有panel
            if (this.honeyPanel.parent)
                this.removeChild(this.honeyPanel);
            if (this.bottlePanel.parent)
                this.removeChild(this.bottlePanel);
            if (this.rulesPanel.parent)
                this.removeChild(this.rulesPanel);
        };
        __egretProto__.buybee = function () {
            alert('购买功能正在开发中');
            this.closePanel();
        };
        __egretProto__.collectBee = function (event) {
            console.log('aha');
            this.labelbee.text = (parseInt(this.labelbee.text) + 1).toString();
            //转动
            var tw = egret.Tween.get(this.flower);
            this.flower.rotation = 0;
            //向日葵的动作
            tw.to({ rotation: 360 }, 1000);
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
        return GameContainer;
    })(egret.DisplayObjectContainer);
    beegame.GameContainer = GameContainer;
    GameContainer.prototype.__class__ = "beegame.GameContainer";
})(beegame || (beegame = {}));
