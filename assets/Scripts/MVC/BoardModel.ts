import { _decorator, Component, Node } from 'cc';
import { BaseApp } from '../BaseApp';
import { LevelData } from '../Data/LevelData';
import { Letter } from '../Letter/Letter';
import { BoardView } from './BoardView';
const { ccclass, property } = _decorator;

@ccclass('BoardModel')
export class BoardModel extends Component {

    private _curLevel: number = 0;
    private _image: string = null;
    private _result: string[];
    private _listLetters: Letter[];
    private _boardView: BoardView | null = null;

    start() {
        this._boardView = this.getComponent(BoardView);
    }

    public get Result() {
        return this._result;
    }

    public get CurrentLevel() {
        return this._curLevel;
    }
    public SetCurrentLevel(level: number, url: string, listLetters: Letter[], result: string[]) {
        this._curLevel = level;
        this._image = url;
        if (this._listLetters?.length > 0) {
            this._listLetters = [];
        }
        this._result = result;
        this._listLetters = listLetters;
        this._boardView.LoadLevel(this._listLetters, result.length, this._image);
    }

    public UpdateLetterToResult(listLetters: Letter[], index: number, resultIndex: number) {
        this._listLetters = listLetters;

        this._listLetters[index]?.MoveToResult(this._boardView.ChosenChars, resultIndex);
        this._boardView.UpdateViewOnClick(resultIndex,false);
    }

    public UpdateLetterToList(listLetters: Letter[], index: number, resultIndex: number) {
        this._listLetters = listLetters;

        this._listLetters[index]?.MoveBackToList(this._boardView.Characters, index);
        this._boardView.UpdateViewOnClick(resultIndex,true);
    }

    public PreloadLevel() {
        this._image = null;
        this._result = [];
        this._listLetters = [];
    }
}


