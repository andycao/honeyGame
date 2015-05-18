var beegame;
(function (beegame) {
    var Rules = (function (_super) {
        __extends(Rules, _super);
        function Rules() {
            _super.call(this);
            //显示背景
            var backshape = new egret.Shape();
            backshape.graphics.beginFill(0x00000);
            backshape.graphics.drawRect(0, 0, 640, 640);
            backshape.graphics.endFill();
            backshape._alpha = 0.4;
            backshape.touchEnabled = true;
            //显示容器
            var rulesContaienr = new egret.DisplayObjectContainer();
            rulesContaienr.name = "rules";
            rulesContaienr.x = 0;
            rulesContaienr.y = 0;
            var rulesImg = this.createBitmapByName('rules');
            rulesImg.anchorX = 0.5;
            rulesImg.anchorY = 0.5;
            rulesImg.x = 640 / 2;
            rulesImg.y = 640 / 2 + 10;
            rulesImg.scaleX = 1.1;
            rulesImg.scaleY = 1.1;
            rulesContaienr.addChild(rulesImg);
            var redClose = this.createBitmapByName('closeRed');
            redClose.anchorX = 0.5;
            redClose.anchorY = 0.5;
            redClose.x = 520;
            redClose.y = 110;
            redClose.scaleX = 1.1;
            redClose.scaleY = 1.1;
            redClose.touchEnabled = true;
            rulesContaienr.addChild(redClose);
            //动作
            redClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this); //点击按钮开始游戏
            this.addChild(backshape);
            this.addChild(rulesContaienr);
        }
        var __egretProto__ = Rules.prototype;
        __egretProto__.createBitmapByName = function (name) {
            var result = new egret.Bitmap();
            var texture = RES.getRes(name);
            result.texture = texture;
            return result;
        };
        __egretProto__.close = function () {
            this.dispatchEventWith("close");
        };
        return Rules;
    })(egret.Sprite);
    beegame.Rules = Rules;
    Rules.prototype.__class__ = "beegame.Rules";
})(beegame || (beegame = {}));
