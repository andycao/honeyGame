/**
 * Created by andy on 2015/5/13.
 */

module beegame {

    export class Confirm extends egret.Sprite {

        private bottleCount:egret.TextField;
        private bottleCapacity:egret.TextField;
        private beeCost:egret.TextField;

        public constructor() {
            super();

            this.init();
        }

        private init():void{

            //背景暗色
            var backshape: egret.Shape = new egret.Shape();
            backshape.graphics.beginFill(0x00000);
            backshape.graphics.drawRect(0, 0, 640, 640);
            backshape.graphics.endFill();
            backshape._alpha = 0.4;
            backshape.touchEnabled = true;

            var bgimg: egret.Bitmap = this.createBitmapByName('confirm');
            bgimg.anchorX = 0.5;
            bgimg.anchorY = 0.5;
            bgimg.x = 640/2;
            bgimg.y = 640/2 - 20;
            bgimg.scaleX = 1;
            bgimg.scaleY = 1;

            var yesimg: egret.Bitmap = this.createBitmapByName('yes');
            yesimg.anchorX = 0.5;
            yesimg.anchorY = 0.5;
            yesimg.x = 640/2 - 90;
            yesimg.y = 640/2 + 60;
            yesimg.scaleX = 1;
            yesimg.scaleY = 1;
            yesimg.touchEnabled = true;
            yesimg.name = 'buy';

            var noimg: egret.Bitmap = this.createBitmapByName('no');
            noimg.name = 'close';
            noimg.anchorX = 0.5;
            noimg.anchorY = 0.5;
            noimg.x = 640/2 + 90;
            noimg.y = 640/2 + 60;
            noimg.scaleX = 1;
            noimg.scaleY = 1;
            noimg.touchEnabled = true;

            noimg.addEventListener(egret.TouchEvent.TOUCH_TAP, function(eve){
                this.dispatchEventWith("close");
            }, this);
            yesimg.addEventListener(egret.TouchEvent.TOUCH_TAP, function(eve){
                this.dispatchEventWith("buy");
            }, this);


            this.addChild(backshape);
            this.addChild(bgimg);
            this.addChild(yesimg);
            this.addChild(noimg);
        }

        private createBitmapByName(name:string):egret.Bitmap {
            var result:egret.Bitmap = new egret.Bitmap();
            var texture:egret.Texture = RES.getRes(name);
            result.texture = texture;
            return result;
        }
    }
}