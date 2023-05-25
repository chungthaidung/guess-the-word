/* eslint-disable no-param-reassign */

import { Component, Prefab, __private, instantiate, Vec3, NodePool, Node } from 'cc';
import { CONFIG } from '../Data/constant';

const letterPool = new NodePool();

export function InItPool(prefab: Prefab,amount: number | CONFIG.CHAR_AMOUNT){
  for (let i = 0; i < amount; i++){
    let letter = instantiate(prefab);
    letterPool.put(letter);
  }
}
export function ClearPool()
{
  letterPool.clear();
}

export function GetFromPool(prefab: Prefab){
  if (letterPool.size() > 0)
  {
    return letterPool.get();
  } else
  {
    let letter = instantiate(prefab);
    return letter;
  }
}

export function ReturnToPool(object: Node){
  letterPool.put(object);
}