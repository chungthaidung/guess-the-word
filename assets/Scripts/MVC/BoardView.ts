import { _decorator, Component, Node, Prefab, resources, ImageAsset, Sprite, SpriteFrame, Vec2, Vec3, Button } from 'cc';
import { BaseApp } from '../BaseApp';
import { CONFIG } from '../Data/constant';
import { LButton } from '../Letter/LButton';
import { Letter } from '../Letter/Letter';
import { GetFromPool, ReturnToPool } from '../Utils/PrefabPool';
const { ccclass, property } = _decorator;

@ccclass('BoardView')
export class BoardView extends Component {

    @property({ group: { name: 'Gameplay' }, type: Node, visible: true })
    private _chosenChars: Node;
    @property({ group: { name: 'Gameplay' }, type: Node, visible: true })
    private _characters: Node;
    @property({ group: { name: 'Gameplay' }, type: Node, visible: true })
    private _image: Node;

    private _resultButton: Node[];
    public get ChosenChars() {
        return this._chosenChars;
    }
    public get Characters() {
        return this._characters;
    }
    public LoadLevel(charlist: Letter[], resultlength: number, url: string) {
        this.PreloadLevel();
        resources.load(url, ImageAsset, (err: any, imageAsset) => {
            const sprite = this._image.getComponent(Sprite);
            sprite.spriteFrame = SpriteFrame.createWithImage(imageAsset);
        });
        this.LoadResultButton(resultlength);
        for (let i = 0; i < charlist.length; i++) {
            charlist[i].LetterButton.node.setParent(this._characters.parent);
            charlist[i].LetterButton.node.setPosition(new Vec3(this._characters.position.x + Math.floor(i / 7) * CONFIG.X_SPACE, this._characters.position.y + -(i % 7) * CONFIG.Y_SPACE));
        }
    }
    public PreloadLevel(){
        for (let i = 0; i < this._resultButton?.length; i++){
            // this._resultButton[i].active = true;
            this._resultButton[i].getComponent(LButton).ResetNode();
            ReturnToPool(this._resultButton[i]);
        }
        this._resultButton=[];
    }
    public LoadResultButton(length:number){
        let newButton = GetFromPool(BaseApp.Instance.LetterButton);
        for (let i = 0; i < length; i++){
            newButton.setParent(this._chosenChars.parent);
            newButton.setPosition(new Vec3(this._chosenChars.position.x + i * CONFIG.X_SPACE,this._chosenChars.position.y));
            newButton.getComponent(Button).interactable = false;
            this._resultButton[i] = newButton;
            if (i < length - 1){
                newButton = GetFromPool(BaseApp.Instance.LetterButton);
            }
        }
    }

    public UpdateViewOnClick(index:number, bool: boolean){
        if (this._resultButton[index]){
            this._resultButton[index].active = bool ;
        }
    }
}


