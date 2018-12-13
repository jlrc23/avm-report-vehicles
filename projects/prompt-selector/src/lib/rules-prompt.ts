import {SelectItemBean} from './select-item-bean';

export interface RulesPrompt{
    addItemRule?:fncAddItem;
    removeItemRule?:fncRemoveItem;
    allowAddButton?:fncAllowAddButtons;
    allowRemoveButton?:fncAllowRemoveButtons;
}


export  interface fncAddItem {
    ( itemToAdd:SelectItemBean,target?:Array<SelectItemBean>, source?:Array<SelectItemBean> ):boolean
}

export interface fncRemoveItem {
    ( itemToAdd:SelectItemBean,source?:Array<SelectItemBean>,target?:Array<SelectItemBean> ):boolean
}

export interface fncAllowAddButtons{
    (source:Array<SelectItemBean>, target:Array<SelectItemBean>):boolean;
}

export interface fncAllowRemoveButtons{
    (source:Array<SelectItemBean>, target:Array<SelectItemBean>):boolean;
}
/*
abstract class abstractRulesPrompt implements iRulesPrompt{

  addItemRule:fncAddItem = (itemToAdd:SelectItemBean,target?:Array<SelectItemBean>, source?:Array<SelectItemBean>) =>{
    return  true;
  };
  removeItemRule?:fncRemoveItem = function(itemToAdd:SelectItemBean,source?:Array<SelectItemBean>,target?:Array<SelectItemBean> ){
    return true;

  };
  allowAddButton?:fncAllowAddButtons = function(source:Array<SelectItemBean>, target:Array<SelectItemBean>){
    return true;
  };
  allowRemoveButton?:fncAllowRemoveButtons= function (source:Array<SelectItemBean>, target:Array<SelectItemBean>){
    return true;
  };
}
*/