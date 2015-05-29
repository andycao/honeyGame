
module beegame {

    export class HoneybeePanel extends egret.Sprite {

        //第几只蜂蜜
        private beeCount : egret.TextField;

        //攻击力
        private beeAttach : egret.TextField;

        //收集力
        private beeCollect : egret.TextField;

        //费用
        private beeCost : egret.TextField;

        public constructor() {
            super();

            var backshape: egret.Shape = new egret.Shape();
            backshape.graphics.beginFill(0x00000);
            backshape.graphics.drawRect(0, 0, 640, 640);
            backshape.graphics.endFill();
            backshape._alpha = 0.4;
            backshape.touchEnabled = true;

            var honeyImg: egret.Bitmap = this.createBitmapByName('honeyimg');
            honeyImg.anchorX = 0.5;
            honeyImg.anchorY = 0.5;
            honeyImg.x = 640/2;
            honeyImg.y = 640/2 - 20;
            honeyImg.scaleX = 1;
            honeyImg.scaleY = 1;

            var honeyClose:egret.Bitmap = this.createBitmapByName('honeyclose');
            honeyClose.anchorX = 0.5;
            honeyClose.anchorY = 0.5;
            honeyClose.x = 495;
            honeyClose.y = 96;
            honeyClose.scaleX = 1.1;
            honeyClose.scaleY = 1.1;
            honeyClose.touchEnabled = true;

            //第几只
            this.beeCount= new egret.TextField();
            this.beeCount.width = 40;
            this.beeCount.textColor = 0x000000;
            this.beeCount.text = "1";
            this.beeCount.textAlign = egret.HorizontalAlign.CENTER;
            this.beeCount.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.beeCount.size = 28;
            this.beeCount.bold = true;
            this.beeCount.x = 314;
            this.beeCount.y = 640/2 - 226;

            //攻击力
            //this.beeAttach= new egret.TextField();
            //this.beeAttach.width = 40;
            //this.beeAttach.textColor = 0xffffff;
            //this.beeAttach.text = "1";
            //this.beeAttach.textAlign = egret.HorizontalAlign.CENTER;
            //this.beeAttach.verticalAlign = egret.VerticalAlign.MIDDLE;
            //this.beeAttach.size = 24;
            //this.beeAttach.x = 310;
            //this.beeAttach.y = 640/2 + 75;

            //采集数
            this.beeCollect= new egret.TextField();
            this.beeCollect.width = 100;
            this.beeCollect.textColor = 0x000000;
            this.beeCollect.text = "+10";
            this.beeCollect.textAlign = egret.HorizontalAlign.LEFT;
            this.beeCollect.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.beeCollect.size = 26;
            this.beeCollect.bold = true;
            this.beeCollect.x = 248;
            this.beeCollect.y = 640/2 + 90;

            //需要蜂蜜数
            this.beeCost= new egret.TextField();
            this.beeCost.width = 100;
            this.beeCost.textColor = 0x000000;
            this.beeCost.text = "-20";
            this.beeCost.textAlign = egret.HorizontalAlign.CENTER;
            this.beeCost.verticalAlign = egret.VerticalAlign.MIDDLE;
            this.beeCost.size = 26;
            this.beeCost.bold = true;
            this.beeCost.x = 375;
            this.beeCost.y = 640/2 + 90;

            //购买按钮
            var buyBtn: egret.Bitmap = this.createBitmapByName('buy');
            buyBtn.anchorX = 0.5;
            buyBtn.anchorY = 0.5;
            buyBtn.x = 640/2;
            buyBtn.y = 640/2 + 180;
            buyBtn.scaleX = 0.8;
            buyBtn.scaleY = 0.8;
            buyBtn.touchEnabled = true;

            //动作
            honeyClose.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this);//点击按钮开始游戏
            buyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buy, this);

            this.addChild(backshape);
            this.addChild(honeyImg);
            this.addChild(honeyClose);
            this.addChild(this.beeCount);
            //this.addChild(this.beeAttach);
            this.addChild(this.beeCollect);
            this.addChild(this.beeCost);
            this.addChild(buyBtn);

            this.setWorkerValues();

        }

        public setWorkerValues(){
            var count;
            var price;

            var mcount = this.beeCount;
            var mprice = this.beeCost;
            GameContainer.useApi('api=1015',function(json){
                count = json.data[0].bee_lvl;
                mcount.text = (parseInt(count) + 1) + '';
            });

            GameContainer.useApi('api=1018', function(json){
                price = "-" + json.data[0].bee_price;
                mprice.text = price;
            });
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

        private buy():void{
            this.dispatchEventWith("buy");
        }

        public setBeeValues(count:string, collect:string, cost:string){
            console.log(count + " " + " "+ collect + " " +cost);
            this.beeCount.text = count;
            //this.beeAttach.text = attach;
            this.beeCollect.text = collect;
            this.beeCost.text = cost;
        }
    }
}