var beegame;
(function (beegame) {
    var Bottle = (function (_super) {
        __extends(Bottle, _super);
        function Bottle() {
            _super.call(this);
            var backshape = new egret.Shape();
            backshape.graphics.beginFill(0x00000);
            backshape.graphics.drawRect(0, 0, 640, 640);
            backshape.graphics.endFill();
            backshape._alpha = 0.4;
            backshape.touchEnabled = true;
            var bottleImg = this.createBitmapByName('bottleimg');
            bottleImg.anchorX = 0.5;
            bottleImg.anchorY = 0.5;
            bottleImg.x = 640 / 2;
            bottleImg.y = 640 / 2 - 20;
            bottleImg.scaleX = 1;
            bottleImg.scaleY = 1;
            var bottleClose = this.createBitmapByName('honeyclose');
            bottleClose.anchorX = 0.5;
            bottleClose.anchorY = 0.5;
            bottleClose.x = 495;
            bottleClose.y = 110;
            bottleClose.scaleX = 1.1;
            bottleClose.scaleY = 1.1;
            bottleClose.touchEnabled = true;
            //蜜罐等级
            this.bottleCount = new egret.TextField();
            this.bottleCount.width = 40;
            this.bottleCount.textColor = 0x000000;
            this.bottleCount.text = "2";
            this.bottleCount.textAlign = egret.HorizontalAlign.CENTER;
            this.bottleCount.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.bottleCount.size = 28;
            this.bottleCount.bold = true;
            this.bottleCount.x = 320;
            this.bottleCount.y = 640 / 2 - 60;
            //容量增加
            this.bottleCapacity = new egret.TextField();
            this.bottleCapacity.width = 120;
            this.bottleCapacity.textColor = 0x000000;
            this.bottleCapacity.text = "+10";
            this.bottleCapacity.textAlign = egret.HorizontalAlign.LEFT;
            this.bottleCapacity.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.bottleCapacity.size = 26;
            this.bottleCapacity.bold = true;
            this.bottleCapacity.x = 240;
            this.bottleCapacity.y = 640 / 2 + 78;
            //需要蜂蜜数
            this.beeCost = new egret.TextField();
            this.beeCost.width = 120;
            this.beeCost.textColor = 0x000000;
            this.beeCost.text = "-20";
            this.beeCost.bold = true;
            this.beeCost.textAlign = egret.HorizontalAlign.LEFT;
            this.beeCost.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.beeCost.size = 26;
            this.beeCost.x = 397;
            this.beeCost.y = 640 / 2 + 78;
            //购买按钮
            var buyBtn = this.createBitmapByName('buyGreen');
            buyBtn.anchorX = 0.5;
            buyBtn.anchorY = 0.5;
            buyBtn.x = 640 / 2;
            buyBtn.y = 640 / 2 + 170;
            buyBtn.scaleX = 0.8;
            buyBtn.scaleY = 0.8;
            buyBtn.touchEnabled = true;
            //动作
            bottleClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this); //点击按钮开始游戏
            buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buy, this);
            this.addChild(backshape);
            this.addChild(bottleImg);
            this.addChild(bottleClose);
            this.addChild(this.bottleCount);
            this.addChild(this.bottleCapacity);
            this.addChild(this.beeCost);
            this.addChild(buyBtn);
            //初始化
            this.setBottleValues();
        }
        var __egretProto__ = Bottle.prototype;
        __egretProto__.setBottleValues = function () {
            var mcount = this.bottleCount;
            var mcap = this.bottleCapacity;
            var mprice = this.beeCost;
            beegame.GameContainer.useApi('api=1015', function (json) {
                var lvl = json.data[0].hive_lvl;
                mcount.text = (parseInt(lvl) + 1) + '';
            });
            beegame.GameContainer.useApi('api=1018', function (json) {
                var price = "-" + json.data[0].hive_price;
                var cap = "+" + json.data[0].next_hive_capacity;
                mcap.text = cap;
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
        return Bottle;
    })(egret.Sprite);
    beegame.Bottle = Bottle;
    Bottle.prototype.__class__ = "beegame.Bottle";
})(beegame || (beegame = {}));
