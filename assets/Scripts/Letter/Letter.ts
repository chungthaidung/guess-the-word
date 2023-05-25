import { _decorator, Component, Node, Vec3, Tween, tween, v2, Vec2 } from 'cc';
import { CONFIG } from '../Data/constant';
import { BoardController } from '../MVC/BoardController';
import { LButton } from './LButton';
const { ccclass, property } = _decorator;

@ccclass('Letter')
export class Letter {
    private _index: number;
    private _letter: string;
    private _letterButton: LButton | null = null;
    private _isResult: boolean | false;
    constructor(x: number) {
        this._index = x;
    }
    public get Letter() {
        return this._letter;
    }
    public SetLetterButton(value: LButton | null, char: string) {
        this._letterButton = value;
        this._letter = char;
    }

    public set IsResult(bool: boolean) {
        this._isResult = bool;
    }
    public get IsResult() {
        return this._isResult;
    }

    public get LetterButton() {
        return this._letterButton;
    }

    public ResetLetter() {
        this._letter = null;
        this._isResult = false;
        this._letterButton?.ResetNode();
    }

    public MoveToResult(chosenNode: Node, resultIndex: number) {
        if (this._letterButton) {
            console.log('start');

            tween(this._letterButton.node)
                .by(0.15, { scale: new Vec3(-1, -1) })
                .to(0.1, { position: new Vec3(resultIndex * CONFIG.X_SPACE + chosenNode.position.x, chosenNode.position.y) })
                .by(0.15, { scale: new Vec3(1, 1) })
                .call(() => {
                    BoardController.Instance.DisableBoard = false;
                })
                .start();


        }
    }
    public MoveBackToList(chosenNode: Node, index: number) {
        if (this._letterButton) {
            tween(this._letterButton.node)
                .by(0.15, { scale: new Vec3(-1, -1) })
                .to(0.1, { position: new Vec3(Math.floor(index / 7) * CONFIG.X_SPACE + chosenNode.position.x, -(index % 7) * CONFIG.Y_SPACE + chosenNode.position.y) })
                .by(0.15, { scale: new Vec3(1, 1) })
                .call(() => {
                    BoardController.Instance.DisableBoard = false;
                })
                .start();

        }
    }

}


