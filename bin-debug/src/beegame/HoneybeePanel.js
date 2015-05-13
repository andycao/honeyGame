var beegame;
(function (beegame) {
    var HoneybeePanel = (function (_super) {
        __extends(HoneybeePanel, _super);
        function HoneybeePanel() {
            _super.call(this);
            console.log('honey bee pannel called');
            var backshape = new egret.Shape();
            backshape.graphics.beginFill(0x00000);
            backshape.graphics.drawRect(0, 0, 640, 640);
            backshape.graphics.endFill();
            backshape._alpha = 0.4;
            backshape.touchEnabled = true;
            var honeyImg = this.createBitmapByName('honeyimg');
            honeyImg.anchorX = 0.5;
            honeyImg.anchorY = 0.5;
            honeyImg.x = 640 / 2;
            honeyImg.y = 640 / 2 - 20;
            honeyImg.scaleX = 1;
            honeyImg.scaleY = 1;
            var honeyClose = this.createBitmapByName('honeyclose');
            honeyClose.anchorX = 0.5;
            honeyClose.anchorY = 0.5;
            honeyClose.x = 480;
            honeyClose.y = 130;
            honeyClose.scaleX = 1;
            honeyClose.scaleY = 1;
            honeyClose.touchEnabled = true;
            //第几只
            this.beeCount = new egret.TextField();
            this.beeCount.width = 40;
            this.beeCount.textColor = 0xffffff;
            this.beeCount.text = "1";
            this.beeCount.textAlign = egret.HorizontalAlign.CENTER;
            this.beeCount.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.beeCount.size = 24;
            this.beeCount.x = 310;
            this.beeCount.y = 640 / 2 + 40;
            //攻击力
            this.beeAttach = new egret.TextField();
            this.beeAttach.width = 40;
            this.beeAttach.textColor = 0xffffff;
            this.beeAttach.text = "1";
            this.beeAttach.textAlign = egret.HorizontalAlign.CENTER;
            this.beeAttach.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.beeAttach.size = 24;
            this.beeAttach.x = 310;
            this.beeAttach.y = 640 / 2 + 75;
            //采集数
            this.beeCollect = new egret.TextField();
            this.beeCollect.width = 40;
            this.beeCollect.textColor = 0xffffff;
            this.beeCollect.text = "10";
            this.beeCollect.textAlign = egret.HorizontalAlign.CENTER;
            this.beeCollect.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.beeCollect.size = 24;
            this.beeCollect.x = 400;
            this.beeCollect.y = 640 / 2 + 75;
            //需要蜂蜜数
            this.beeCost = new egret.TextField();
            this.beeCost.width = 40;
            this.beeCost.textColor = 0xffffff;
            this.beeCost.text = "20";
            this.beeCost.textAlign = egret.HorizontalAlign.CENTER;
            this.beeCost.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.beeCost.size = 24;
            this.beeCost.x = 345;
            this.beeCost.y = 640 / 2 + 110;
            //购买按钮
            var buyBtn = this.createBitmapByName('buy');
            buyBtn.anchorX = 0.5;
            buyBtn.anchorY = 0.5;
            buyBtn.x = 640 / 2;
            buyBtn.y = 640 / 2 + 170;
            buyBtn.scaleX = 0.9;
            buyBtn.scaleY = 0.9;
            buyBtn.touchEnabled = true;
            //动作
            honeyClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this); //点击按钮开始游戏
            buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buy, this);
            this.addChild(backshape);
            this.addChild(honeyImg);
            this.addChild(honeyClose);
            this.addChild(this.beeCount);
            this.addChild(this.beeAttach);
            this.addChild(this.beeCollect);
            this.addChild(this.beeCost);
            this.addChild(buyBtn);
            this.setWorkerValues();
        }
        var __egretProto__ = HoneybeePanel.prototype;
        __egretProto__.setWorkerValues = function () {
            var count;
            var price;
            var mcount = this.beeCount;
            var mprice = this.beeCost;
            beegame.GameContainer.useApi('api=1015', function (json) {
                count = json.data[0].bee_lvl;
                mcount.text = (parseInt(count) + 1) + '';
            });
            beegame.GameContainer.useApi('api=1018', function (json) {
                price = json.data[0].bee_price;
                mprice.text = price;
            });
        };
        __egretProto__.createBitmapByName = function (name) {
            var result = new egret.Bitmap();
            var texture = RES.getRes(name);
            result.texture = texture;
            return result;
        };
        __egretProto__.close = function () {
            this.dispatchEventWith("close");
        };
        __egretProto__.buy = function () {
            this.dispatchEventWith("buy");
        };
        __egretProto__.setBeeValues = function (count, attach, collect, cost) {
            console.log(count + " " + attach + " " + collect + " " + cost);
            this.beeCount.text = count;
            this.beeAttach.text = attach;
            this.beeCollect.text = collect;
            this.beeCost.text = cost;
        };
        return HoneybeePanel;
    })(egret.Sprite);
    beegame.HoneybeePanel = HoneybeePanel;
    HoneybeePanel.prototype.__class__ = "beegame.HoneybeePanel";
})(beegame || (beegame = {}));
