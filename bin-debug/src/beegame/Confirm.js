/**
 * Created by andy on 2015/5/13.
 */
var beegame;
(function (beegame) {
    var Confirm = (function (_super) {
        __extends(Confirm, _super);
        function Confirm() {
            _super.call(this);
            this.init();
        }
        var __egretProto__ = Confirm.prototype;
        __egretProto__.init = function () {
            //背景暗色
            var backshape = new egret.Shape();
            backshape.graphics.beginFill(0x00000);
            backshape.graphics.drawRect(0, 0, 640, 640);
            backshape.graphics.endFill();
            backshape._alpha = 0.4;
            backshape.touchEnabled = true;
            var bgimg = this.createBitmapByName('confirm');
            bgimg.anchorX = 0.5;
            bgimg.anchorY = 0.5;
            bgimg.x = 640 / 2;
            bgimg.y = 640 / 2 - 20;
            bgimg.scaleX = 1;
            bgimg.scaleY = 1;
            var yesimg = this.createBitmapByName('yes');
            yesimg.anchorX = 0.5;
            yesimg.anchorY = 0.5;
            yesimg.x = 640 / 2 - 90;
            yesimg.y = 640 / 2 + 110;
            yesimg.scaleX = 1;
            yesimg.scaleY = 1;
            yesimg.touchEnabled = true;
            yesimg.name = 'buy';
            var noimg = this.createBitmapByName('no');
            noimg.name = 'close';
            noimg.anchorX = 0.5;
            noimg.anchorY = 0.5;
            noimg.x = 640 / 2 + 90;
            noimg.y = 640 / 2 + 110;
            noimg.scaleX = 1;
            noimg.scaleY = 1;
            noimg.touchEnabled = true;
            noimg.addEventListener(egret.TouchEvent.TOUCH_TAP, function (eve) {
                this.dispatchEventWith("close");
            }, this);
            yesimg.addEventListener(egret.TouchEvent.TOUCH_TAP, function (eve) {
                this.dispatchEventWith("buy");
            }, this);
            this.addChild(backshape);
            this.addChild(bgimg);
            this.addChild(yesimg);
            this.addChild(noimg);
        };
        __egretProto__.createBitmapByName = function (name) {
            var result = new egret.Bitmap();
            var texture = RES.getRes(name);
            result.texture = texture;
            return result;
        };
        return Confirm;
    })(egret.Sprite);
    beegame.Confirm = Confirm;
    Confirm.prototype.__class__ = "beegame.Confirm";
})(beegame || (beegame = {}));
