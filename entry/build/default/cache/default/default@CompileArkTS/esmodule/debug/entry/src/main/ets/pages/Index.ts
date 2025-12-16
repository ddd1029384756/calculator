if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    displayValue?: string;
    firstOperand?: number;
    operator?: string;
    waitingForSecondOperand?: boolean;
}
import promptAction from "@ohos:promptAction";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__displayValue = new ObservedPropertySimplePU('0', this, "displayValue");
        this.__firstOperand = new ObservedPropertySimplePU(0, this, "firstOperand");
        this.__operator = new ObservedPropertySimplePU('', this, "operator");
        this.__waitingForSecondOperand = new ObservedPropertySimplePU(false
        // 数字按钮点击处理
        , this, "waitingForSecondOperand");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.displayValue !== undefined) {
            this.displayValue = params.displayValue;
        }
        if (params.firstOperand !== undefined) {
            this.firstOperand = params.firstOperand;
        }
        if (params.operator !== undefined) {
            this.operator = params.operator;
        }
        if (params.waitingForSecondOperand !== undefined) {
            this.waitingForSecondOperand = params.waitingForSecondOperand;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__displayValue.purgeDependencyOnElmtId(rmElmtId);
        this.__firstOperand.purgeDependencyOnElmtId(rmElmtId);
        this.__operator.purgeDependencyOnElmtId(rmElmtId);
        this.__waitingForSecondOperand.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__displayValue.aboutToBeDeleted();
        this.__firstOperand.aboutToBeDeleted();
        this.__operator.aboutToBeDeleted();
        this.__waitingForSecondOperand.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __displayValue: ObservedPropertySimplePU<string>;
    get displayValue() {
        return this.__displayValue.get();
    }
    set displayValue(newValue: string) {
        this.__displayValue.set(newValue);
    }
    private __firstOperand: ObservedPropertySimplePU<number>;
    get firstOperand() {
        return this.__firstOperand.get();
    }
    set firstOperand(newValue: number) {
        this.__firstOperand.set(newValue);
    }
    private __operator: ObservedPropertySimplePU<string>;
    get operator() {
        return this.__operator.get();
    }
    set operator(newValue: string) {
        this.__operator.set(newValue);
    }
    private __waitingForSecondOperand: ObservedPropertySimplePU<boolean>;
    get waitingForSecondOperand() {
        return this.__waitingForSecondOperand.get();
    }
    set waitingForSecondOperand(newValue: boolean) {
        this.__waitingForSecondOperand.set(newValue);
    }
    // 数字按钮点击处理
    handleNumberInput(num: string) {
        if (this.waitingForSecondOperand) {
            this.displayValue = num;
            this.waitingForSecondOperand = false;
        }
        else {
            this.displayValue = this.displayValue === '0' ? num : this.displayValue + num;
        }
    }
    // 运算符点击处理
    handleOperator(op: string) {
        const inputValue = parseFloat(this.displayValue);
        if (this.firstOperand === 0) {
            this.firstOperand = inputValue;
        }
        else if (this.operator) {
            const result = this.calculate();
            this.displayValue = `${result}`;
            this.firstOperand = result;
        }
        this.operator = op;
        this.waitingForSecondOperand = true;
    }
    // 等于号点击处理
    handleEquals() {
        if (this.operator && !this.waitingForSecondOperand) {
            const result = this.calculate();
            this.displayValue = `${result}`;
            this.firstOperand = 0;
            this.operator = '';
            this.waitingForSecondOperand = true;
        }
    }
    // 执行计算
    calculate(): number {
        const secondOperand = parseFloat(this.displayValue);
        switch (this.operator) {
            case '+':
                return this.firstOperand + secondOperand;
            case '-':
                return this.firstOperand - secondOperand;
            case '×':
                return this.firstOperand * secondOperand;
            case '÷':
                if (secondOperand === 0) {
                    // 使用Toast提示代替alert
                    promptAction.showToast({
                        message: '除数不能为零',
                        duration: 2000
                    });
                    return 0;
                }
                return this.firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    }
    // 清除所有
    handleClear() {
        this.displayValue = '0';
        this.firstOperand = 0;
        this.operator = '';
        this.waitingForSecondOperand = false;
    }
    // 删除最后一个字符
    handleDelete() {
        if (this.displayValue.length > 1) {
            this.displayValue = this.displayValue.substring(0, this.displayValue.length - 1);
        }
        else {
            this.displayValue = '0';
        }
    }
    // 添加小数点
    handleDecimal() {
        if (this.waitingForSecondOperand) {
            this.displayValue = '0.';
            this.waitingForSecondOperand = false;
        }
        else if (this.displayValue.indexOf('.') === -1) {
            this.displayValue = this.displayValue + '.';
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 20 });
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#f5f5f5');
            Column.padding(10);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 结果显示区域
            Row.create();
            // 结果显示区域
            Row.width('90%');
            // 结果显示区域
            Row.margin({ top: 30 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.displayValue);
            Text.fontSize(48);
            Text.fontWeight(FontWeight.Bold);
            Text.textAlign(TextAlign.End);
            Text.width('100%');
            Text.padding(20);
            Text.backgroundColor('#f0f0f0');
            Text.borderRadius(10);
        }, Text);
        Text.pop();
        // 结果显示区域
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 按钮区域
            Column.create({ space: 10 });
            // 按钮区域
            Column.width('90%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 第一行：清除和删除按钮
            Row.create({ space: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('C', { type: ButtonType.Normal });
            Button.fontSize(24);
            Button.fontWeight(FontWeight.Bold);
            Button.backgroundColor('#ff6b6b');
            Button.width('20%');
            Button.height(70);
            Button.onClick(() => this.handleClear());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('DEL', { type: ButtonType.Normal });
            Button.fontSize(24);
            Button.fontWeight(FontWeight.Bold);
            Button.backgroundColor('#ffa726');
            Button.width('20%');
            Button.height(70);
            Button.onClick(() => this.handleDelete());
        }, Button);
        Button.pop();
        // 第一行：清除和删除按钮
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 第二行：数字7-9和除号
            Row.create({ space: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('7', { type: ButtonType.Normal });
            Button.fontSize(24);
            Button.fontWeight(FontWeight.Bold);
            Button.backgroundColor('#e0e0e0');
            Button.width('20%');
            Button.height(70);
            Button.onClick(() => this.handleNumberInput('7'));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('8', { type: ButtonType.Normal });
            Button.fontSize(24);
            Button.fontWeight(FontWeight.Bold);
            Button.backgroundColor('#e0e0e0');
            Button.width('20%');
            Button.height(70);
            Button.onClick(() => this.handleNumberInput('8'));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('9', { type: ButtonType.Normal });
            Button.fontSize(24);
            Button.fontWeight(FontWeight.Bold);
            Button.backgroundColor('#e0e0e0');
            Button.width('20%');
            Button.height(70);
            Button.onClick(() => this.handleNumberInput('9'));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('÷', { type: ButtonType.Normal });
            Button.fontSize(24);
            Button.fontWeight(FontWeight.Bold);
            Button.backgroundColor('#42a5f5');
            Button.width('20%');
            Button.height(70);
            Button.onClick(() => this.handleOperator('÷'));
        }, Button);
        Button.pop();
        // 第二行：数字7-9和除号
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 第三行：数字4-6和乘号
            Row.create({ space: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('4', { type: ButtonType.Normal });
            Button.fontSize(24);
            Button.fontWeight(FontWeight.Bold);
            Button.backgroundColor('#e0e0e0');
            Button.width('20%');
            Button.height(70);
            Button.onClick(() => this.handleNumberInput('4'));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('5', { type: ButtonType.Normal });
            Button.fontSize(24);
            Button.fontWeight(FontWeight.Bold);
            Button.backgroundColor('#e0e0e0');
            Button.width('20%');
            Button.height(70);
            Button.onClick(() => this.handleNumberInput('5'));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('6', { type: ButtonType.Normal });
            Button.fontSize(24);
            Button.fontWeight(FontWeight.Bold);
            Button.backgroundColor('#e0e0e0');
            Button.width('20%');
            Button.height(70);
            Button.onClick(() => this.handleNumberInput('6'));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('×', { type: ButtonType.Normal });
            Button.fontSize(24);
            Button.fontWeight(FontWeight.Bold);
            Button.backgroundColor('#42a5f5');
            Button.width('20%');
            Button.height(70);
            Button.onClick(() => this.handleOperator('×'));
        }, Button);
        Button.pop();
        // 第三行：数字4-6和乘号
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 第四行：数字1-3和减号
            Row.create({ space: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('1', { type: ButtonType.Normal });
            Button.fontSize(24);
            Button.fontWeight(FontWeight.Bold);
            Button.backgroundColor('#e0e0e0');
            Button.width('20%');
            Button.height(70);
            Button.onClick(() => this.handleNumberInput('1'));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('2', { type: ButtonType.Normal });
            Button.fontSize(24);
            Button.fontWeight(FontWeight.Bold);
            Button.backgroundColor('#e0e0e0');
            Button.width('20%');
            Button.height(70);
            Button.onClick(() => this.handleNumberInput('2'));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('3', { type: ButtonType.Normal });
            Button.fontSize(24);
            Button.fontWeight(FontWeight.Bold);
            Button.backgroundColor('#e0e0e0');
            Button.width('20%');
            Button.height(70);
            Button.onClick(() => this.handleNumberInput('3'));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('-', { type: ButtonType.Normal });
            Button.fontSize(24);
            Button.fontWeight(FontWeight.Bold);
            Button.backgroundColor('#42a5f5');
            Button.width('20%');
            Button.height(70);
            Button.onClick(() => this.handleOperator('-'));
        }, Button);
        Button.pop();
        // 第四行：数字1-3和减号
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 第五行：0、小数点、等于号和加号
            Row.create({ space: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('0', { type: ButtonType.Normal });
            Button.fontSize(24);
            Button.fontWeight(FontWeight.Bold);
            Button.backgroundColor('#e0e0e0');
            Button.width('45%');
            Button.height(70);
            Button.onClick(() => this.handleNumberInput('0'));
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('.', { type: ButtonType.Normal });
            Button.fontSize(24);
            Button.fontWeight(FontWeight.Bold);
            Button.backgroundColor('#e0e0e0');
            Button.width('20%');
            Button.height(70);
            Button.onClick(() => this.handleDecimal());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('=', { type: ButtonType.Normal });
            Button.fontSize(24);
            Button.fontWeight(FontWeight.Bold);
            Button.backgroundColor('#66bb6a');
            Button.width('20%');
            Button.height(70);
            Button.onClick(() => this.handleEquals());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('+', { type: ButtonType.Normal });
            Button.fontSize(24);
            Button.fontWeight(FontWeight.Bold);
            Button.backgroundColor('#42a5f5');
            Button.width('20%');
            Button.height(70);
            Button.onClick(() => this.handleOperator('+'));
        }, Button);
        Button.pop();
        // 第五行：0、小数点、等于号和加号
        Row.pop();
        // 按钮区域
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.example.myapplication", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false" });
