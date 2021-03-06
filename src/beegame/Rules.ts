
module beegame {

    export class Rules extends egret.Sprite {


        public constructor() {
            super();

            //显示背景
            var backshape : egret.Shape = new egret.Shape();
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

            var rulesImg: egret.Bitmap = this.createBitmapByName('rules');
            rulesImg.anchorX = 0.5;
            rulesImg.anchorY = 0.5;
            rulesImg.x = 640/2;
            rulesImg.y = 640/2 + 10;
            rulesImg.scaleX = 1;
            rulesImg.scaleY = 1;
            rulesContaienr.addChild(rulesImg);

            var redClose:egret.Bitmap = this.createBitmapByName('closeRed');
            redClose.anchorX = 0.5;
            redClose.anchorY = 0.5;
            redClose.x = 520;
            redClose.y = 130;
            redClose.scaleX = 1.1;
            redClose.scaleY = 1.1;
            redClose.touchEnabled = true;
            rulesContaienr.addChild(redClose);


            //动作
            redClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);//点击按钮开始游戏

            this.addChild(backshape);
            this.addChild(rulesContaienr);

        }

        private createBitmapByName(name:string):egret.Bitmap {
            var result:egret.Bitmap = new egret.Bitmap();
            var texture:egret.Texture = RES.getRes(name);
            result.texture = texture;
            return result;
        }

        private close():void{
            this.dispatchEventWith("close");

        }

    }
}