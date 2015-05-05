/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = Main.prototype;
    __egretProto__.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    __egretProto__.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    __egretProto__.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    };
    /**
    * 资源组加载出错
     *  The resource group loading failed
    */
    __egretProto__.onResourceLoadError = function (event) {
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    __egretProto__.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
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
        var icon = this.createBitmapByName("collect");
        icon.anchorX = icon.anchorY = 0.5;
        this.addChild(icon);
        icon.x = stageW / 2;
        icon.y = stageH / 2;
        icon.scaleX = 0.9;
        icon.scaleY = 0.9;
        //地图图标
        var map = this.createBitmapByName("map");
        map.anchorX = map.anchorY = 0.5;
        this.addChild(map);
        map.x = map.width / 2 + 5;
        map.y = stageH - map.height / 2 - 5;
        map.scaleX = 0.8;
        map.scaleY = 0.8;
        map.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapMap, this);
        map.touchEnabled = true;
        //战斗按钮
        var fight = this.createBitmapByName("fight");
        fight.anchorX = fight.anchorY = 0.5;
        this.addChild(fight);
        fight.x = stageW - fight.width / 2 - 5;
        fight.y = stageH - fight.height / 2 - 5;
        fight.scaleX = 0.8;
        fight.scaleY = 0.8;
        //帮助按钮
        var help = this.createBitmapByName("help");
        help.anchorX = help.anchorY = 0.5;
        this.addChild(help);
        help.x = stageW - help.width / 2 - 100;
        help.y = help.height / 2 + 100;
        help.scaleX = 1;
        help.scaleY = 1;
        //工蜂 组合
        var container1 = new egret.DisplayObjectContainer();
        container1.touchChildren = true; //等同于Flash的mouseChildren
        container1.touchEnabled = true; //设置容器是否响应Touch交互
        container1.name = "myhoney";
        container1.x = container1.y = 0;
        container1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.labelTap, container1);
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
        //兵蜂 组合
        var shape2 = new egret.Shape();
        shape2.graphics.beginFill(0x005757);
        shape2.graphics.drawRect(250, 20, 140, 40);
        shape2.graphics.endFill();
        this.addChild(shape2);
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
        this.addChild(label2);
        //我的蜂蜜按钮
        var mysoldier = this.createBitmapByName("mysoldier");
        mysoldier.anchorX = 0.5;
        mysoldier.anchorY = 0;
        this.addChild(mysoldier);
        mysoldier.x = 250;
        mysoldier.y = 12;
        mysoldier.scaleX = 0.8;
        mysoldier.scaleY = 0.8;
        //加号图标
        var plus2 = this.createBitmapByName("plus");
        plus2.anchorX = 0.5;
        plus2.anchorY = 0;
        this.addChild(plus2);
        plus2.x = label2.width + 250;
        plus2.y = 17;
        plus2.scaleX = 1.3;
        plus2.scaleY = 1.3;
        //蜜罐 组合
        var shape3 = new egret.Shape();
        shape3.graphics.beginFill(0x005757);
        shape3.graphics.drawRect(450, 20, 140, 40);
        shape3.graphics.endFill();
        this.addChild(shape3);
        var label3 = new egret.TextField();
        label3.x = 450;
        label3.y = 20;
        label3.width = 140;
        label3.height = 40;
        label3.textAlign = egret.HorizontalAlign.CENTER;
        label3.verticalAlign = egret.VerticalAlign.MIDDLE;
        label3.textColor = 0xffffff;
        label3.text = "100/100";
        label3.size = 20;
        this.addChild(label3);
        //我的蜂蜜按钮
        var mybottle = this.createBitmapByName("mybottle");
        mybottle.anchorX = 0.5;
        mybottle.anchorY = 0;
        this.addChild(mybottle);
        mybottle.x = 450;
        mybottle.y = 12;
        mybottle.scaleX = 0.7;
        mybottle.scaleY = 0.7;
        //加号图标
        var plus3 = this.createBitmapByName("plus");
        plus3.anchorX = 0.5;
        plus3.anchorY = 0;
        this.addChild(plus3);
        plus3.x = label3.width + 450;
        plus3.y = 17;
        plus3.scaleX = 1.3;
        plus3.scaleY = 1.3;
        //动画效果
        this.startAnimation(cloud1, cloud2);
        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        //RES.getResAsync("description", this.startAnimation, this)
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
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
        change();
    };
    /**
     * 切换描述内容
     * Switch to described content
     */
    __egretProto__.changeDescription = function (textContainer, lineArr) {
        textContainer.removeChildren();
        var w = 0;
        for (var i = 0; i < lineArr.length; i++) {
            var info = lineArr[i];
            var colorLabel = new egret.TextField();
            colorLabel.x = w;
            colorLabel.anchorX = colorLabel.anchorY = 0;
            colorLabel.textColor = parseInt(info["textColor"]);
            colorLabel.text = info["text"];
            colorLabel.size = 30;
            textContainer.addChild(colorLabel);
            w += colorLabel.width;
        }
    };
    __egretProto__.labelTap = function (event) {
        var msg = event.type;
        msg += "\n" + event.stageX + "," + event.stageY;
        msg += "\n" + event.localX + "," + event.localY;
        msg += "\n" + event.currentTarget.name + "," + event.target.name;
        console.log(msg);
        if (event.currentTarget.name === 'myhoney') {
            alert('我的工蜂按钮');
        }
    };
    __egretProto__.tapMap = function (event) {
        console.log('touched map');
        alert('地图被点击了,显示地图');
    };
    return Main;
})(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
