import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges, OnDestroy, OnInit,
    Output,
    QueryList,
    SimpleChanges, ViewChildren
} from '@angular/core';
import {SelectItemBean} from './select-item-bean';
import {RulesPrompt} from './rules-prompt';

@Component({
  selector: 'prompt-selector',
  templateUrl: 'prompt-selector.component.html',
  styleUrls: ['prompt-selector.component.css']
})
export class PromptSelectorComponent implements OnInit, OnChanges, OnDestroy {
    public loading = 'Loading...';
    private static AUTO_SELECT = 1;
    private _data: Array<SelectItemBean> = [];
    private _auto_selecteds: Array<SelectItemBean> = [];
    @Input() title: string = "";
    @Input() multi: boolean = false; // true = allow more that one item
    @Input() rules: RulesPrompt = null;
    @Input() searchTitle: string = "Buscar";
    @Input() maxSelected: number = -1;
    @Input() name: string = Math.random().toString(36).substr(2, 10); //("prompt"); // disabled add or remove items, only-read
    @Input() set order_by(value: string) {
        switch (value) {
            case 'no_sort':
                this.order_selected = PromptSelectorComponent.noSort;
                break;
            case 'id_desc':
                this.order_selected = PromptSelectorComponent.orderByIdDesc;
                break;
            case 'id_asc':
                this.order_selected = PromptSelectorComponent.orderByIdAsc;
                break;
            default:
                this.order_selected = PromptSelectorComponent.orderAlpha;
        }
    }

    @Input() height = 0;

    @Input()
    public set isLoadingData(value) {
        this._isLoadingData = value;
    }

    public addedDefaultValue: boolean = false;
    @Output('changeSelectedItemsEvent')
    changeSelectedItems = new EventEmitter<SelectItemBean[]>();
    @ViewChildren("promptSourceItems") promptSourceItems: QueryList<ElementRef>;
    @ViewChildren("promptTargetItems") promptTargetItems: QueryList<ElementRef>;
    public selectedItems: Array<SelectItemBean> = [];
    public notSelectedItems: Array<SelectItemBean> = [];
    public searchTerm: string = "";
    private _isLoadingData = false;

    public startLoadData() {
        this._isLoadingData = true;
    }

    @Input() set data(value: Array<SelectItemBean>) {
        if (typeof value != "undefined") {
            value.sort(this.order_selected);
            this.notSelectedItems = value;
            this._data = value;
            this.selectedItems = [];
            this.searchTerm = "";
            this.addedDefaultValue = false;
        }
    }

    get auto_selecteds() {
        return this._auto_selecteds;
    }

    @Input() set auto_selecteds(value: Array<SelectItemBean>) {
        if (typeof value != "undefined") {
            this._auto_selecteds = value;
        } else {
            this._auto_selecteds = [];
            this.addedDefaultValue = false;
        }
    }

    public static orderAlpha = (x: SelectItemBean, y: SelectItemBean) => {
        if (x.id == -1) return -1;
        if (y.id == -1) return 1;
        if (x.text > y.text) return 1;
        else if (x.text == y.text) return 0;
        else if (x.text < y.text) return -1
    };

    public static orderByIdDesc = (y, x) => {
        if (x.id > y.id) return 1;
        else if (x.id == y.id) return 0;
        else if (x.id < y.id) return -1;
    };
    public static orderByIdAsc = (x, y) => {
        if (x.id > y.id) return 1;
        else if (x.id == y.id) return 0;
        else if (x.id < y.id) return -1;
    };
    public static noSort = (x, y) => { };
    // not working with Function
    public order_selected: any = PromptSelectorComponent.orderAlpha;

    constructor(private cdRef: ChangeDetectorRef) {}

    ngOnDestroy(): void {
        console.log(`[PromptSelectorModule::PromptSelectorComponent/ngOnDestroy] Destroy Name: `, this.getName());
    }

    ngOnInit(): void {
        console.log(`[PromptSelectorModule::PromptSelectorComponent/ngOnInit] Created Name: `, this.getName());
    }




    ngOnChanges(changes: SimpleChanges): void {
        console.log(`[PromptSelectorModule::PromptSelectorComponent/ngOnChanges] Changes: `, changes);
        if (changes.hasOwnProperty('data')) {
            if (changes.data.hasOwnProperty('currentValue') &&
                typeof changes.data.currentValue != "undefined" &&
                changes.data.currentValue.length == 0 &&
                changes.data.previousValue instanceof Array)
                this.notSelectedItems = this.selectedItems = [];
        }
        if (this._auto_selecteds.length > 0) {
            this.addedDefaultValue = true;
            this._auto_selecteds.forEach(item => this.addItem(item));
            this.changeSelectedItems.emit(this.selectedItems);
            this.cdRef.markForCheck();
        }
        if (this.addedDefaultValue)
            this._auto_selecteds = [];
    }

    public remove(): void {
        let hasChange: boolean = false;
        this.promptTargetItems.forEach(
            item => {
                if (item.nativeElement.checked == true) {
                    let itemToRemove: SelectItemBean = <SelectItemBean>{id: item.nativeElement.value, text: ''};
                    if (this.removeItem(itemToRemove) == true)
                        hasChange = true;
                }
            });
        if (hasChange) {
            this.cdRef.markForCheck();
            this.changeSelectedItems.emit(this.selectedItems);
        }

    }

    private removeItem(item: SelectItemBean): boolean {
        if (!this.accomplishRuleForRemove(item))
            return false;
        let hasChange: boolean = false;
        this.selectedItems.forEach((selectedItem) => {
            if (selectedItem.id == item.id) {
                item.text = selectedItem.text;
                if (typeof selectedItem.value != "undefined")
                    item.value = selectedItem.value;
                item.value = selectedItem.value;
                this.notSelectedItems.push(selectedItem);
                this.notSelectedItems.sort(this.order_selected);
                hasChange = true;
            }
        });
        this.cleanSelectItems();
        return hasChange;
    }

    private addItem(item: SelectItemBean): boolean {
        if (!this.accomplishRuleForAdd(item))
            return false;
        let hasChange: boolean = false;
        this._data.forEach((selectedItem) => {
            if (selectedItem.id == item.id) {
                item.text = selectedItem.text;
                if (typeof selectedItem.value != "undefined")
                    item.value = selectedItem.value;
                this.selectedItems.push(selectedItem);
                this.selectedItems.sort(this.order_selected);
                hasChange = true;
            }
        });
        this.cleanNotSelectedItems();
        return hasChange;
    }

    private cleanNotSelectedItems(): void {
        this.selectedItems.forEach(x => {
            let index = this.notSelectedItems.indexOf(x, 0);
            if (index > -1)
                this.notSelectedItems.splice(index, 1);
        });
    }

    private cleanSelectItems(): void {
        this.notSelectedItems.forEach(x => {
            let index = this.selectedItems.indexOf(x, 0);
            if (index > -1)
                this.selectedItems.splice(index, 1);
        });
    }

    public add(): void {
        let hasChanges: boolean = false;
        this.promptSourceItems.forEach(
            item => {
                if (item.nativeElement.checked) {
                    let itemToRemove: SelectItemBean = <SelectItemBean>{id: item.nativeElement.value, text: ''};
                    hasChanges = this.addItem(itemToRemove);
                }
            });
        if (hasChanges)
            this.changeSelectedItems.emit(this.selectedItems);
    }


    public removeAllItem(): void {
        this.selectedItems.forEach(x => this.notSelectedItems.push(x));
        this.selectedItems = [];
        this.notSelectedItems.sort(this.order_selected);
        this.changeSelectedItems.emit(this.selectedItems);
    }

    public addAllItem(): void {
        if (this.maxSelected == -1)
            this.notSelectedItems.forEach((x) => {
                if (x.id != -1 && this.accomplishRuleForAdd(x)) this.selectedItems.push(x);
            });
        else
            this.notSelectedItems.forEach((x) => {
                if (x.id != -1 && this.maxSelected > this.selectedItems.length && this.accomplishRuleForAdd(x))
                    this.selectedItems.push(x);
            });
        this.cleanNotSelectedItems();
        this.changeSelectedItems.emit(this.selectedItems);
        this.cdRef.markForCheck();
    }

    private accomplishRuleForAdd(item: SelectItemBean): boolean {
        return !(this.rules != null && typeof this.rules.addItemRule != 'undefined' &&
            this.rules.addItemRule(item, this.selectedItems) == false);
    }

    private accomplishRuleForRemove(item: SelectItemBean): boolean {
        return !(this.rules != null && typeof this.rules.removeItemRule != 'undefined' && this.rules.removeItemRule(item, this.selectedItems) == false);
    }

    protected isEmptySelectedItems(): boolean {
        let result: boolean = true;
        if (this.selectedItems.length > 0)
            result = false;
        return result;
    }

    public get isLoadingData() {
        return this._isLoadingData && this._data.length == 0;
    }

    protected isEmptyNotSelectedItems(): boolean {
        let result: boolean = true;
        if (this.notSelectedItems != null && typeof this.notSelectedItems != "undefined" && this.notSelectedItems.length > 0)
            result = false;
        return result;
    }

    public allowAdd(): boolean {
        if (this.isEmptyNotSelectedItems() || (this.maxSelected != -1 && this.selectedItems.length >= this.maxSelected))
            return false;
        return !(this.rules != null && typeof this.rules.allowAddButton != 'undefined' && this.rules.allowAddButton(this.notSelectedItems, this.selectedItems) == false);
    }

    public allowRemove(): boolean {
        if (this.maxSelected != -1 && this.multi == false && this.isEmptyNotSelectedItems() && !this.isEmptySelectedItems() && this.selectedItems.length == this.maxSelected)
            return false;
        if (this.rules != null && typeof this.rules.allowRemoveButton != 'undefined' && this.rules.allowRemoveButton(this.notSelectedItems, this.selectedItems) == false)
            return false;
        return !this.isEmptySelectedItems();
    }

    protected getTypeItemInput(): string {
        if (this.multi)
            return "checkbox";
        return "radio";
    }

    getSourceItems() {
        if (this.searchTerm != '') {
            let searchTerm: string = this.searchTerm.toLocaleLowerCase();
            let result: Array<SelectItemBean> = [];
            this.notSelectedItems.forEach(x => {
                let name: string = x.text.toLocaleLowerCase();
                if (name.indexOf(searchTerm) != -1)
                    result.push(x);
            });
            return result;
        } else if (this.multi == false && this.maxSelected == 1 && this.selectedItems.length == 0 && this.notSelectedItems.length == PromptSelectorComponent.AUTO_SELECT) {
            this.addAllItem();
        }
        return this.notSelectedItems;
    }

    protected getName(): string {
        return this.name;
    }
}
