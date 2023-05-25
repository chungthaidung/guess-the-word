import { _decorator, Component, Node, resources, ImageAsset, Sprite, SpriteFrame, Button, UITransform } from 'cc';
import { BoardController } from '../MVC/BoardController';
const { ccclass, property } = _decorator;

@ccclass('LButton')
export class LButton extends Component {
    private _data: string | null;
    private _index: number;

    start() {
    }
    public setLButton(letter: string, index: number) {
        this._data = letter;
        this._index = index;
        this.LoadSprite(letter);
    }

    public LoadSprite(letter: string) {
        if (this._data) {
            resources.load('letterss/' + letter, ImageAsset, (err: any, imageAsset) => { //Sprite/letters/
                const sprite = this.node.getComponent(Sprite);
                sprite.spriteFrame = SpriteFrame.createWithImage(imageAsset);
                const transfrom = this.node.getComponent(UITransform);
                switch (letter) {
                    default:
                        transfrom.setAnchorPoint(0.5,0.5);
                        break;
                    case 'g':
                    case 'y':
                    case 'q':
                        transfrom.setAnchorPoint(transfrom.anchorPoint.x,0.7);
                        break;
                    case 'p':
                    case 'j':
                        transfrom.setAnchorPoint(transfrom.anchorPoint.x,0.6);
                        break;
                }
            });
        }
    }

    public ResetNode() {
        this.node.active = true;
        this.getComponent(Button).interactable = true;

    }
    public OnClickLetter() {
        BoardController.Instance.UpdateBoardOnClick(this._index);
    }

}


