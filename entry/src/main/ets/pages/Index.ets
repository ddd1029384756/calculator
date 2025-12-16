import promptAction from '@ohos.promptAction';

@Entry
@Component
struct Index {
  @State displayValue: string = '0'
  @State firstOperand: number = 0
  @State operator: string = ''
  @State waitingForSecondOperand: boolean = false

  // 数字按钮点击处理
  handleNumberInput(num: string) {
    if (this.waitingForSecondOperand) {
      this.displayValue = num
      this.waitingForSecondOperand = false
    } else {
      this.displayValue = this.displayValue === '0' ? num : this.displayValue + num
    }
  }

  // 运算符点击处理
  handleOperator(op: string) {
    const inputValue = parseFloat(this.displayValue)

    if (this.firstOperand === 0) {
      this.firstOperand = inputValue
    } else if (this.operator) {
      const result = this.calculate()
      this.displayValue = `${result}`
      this.firstOperand = result
    }

    this.operator = op
    this.waitingForSecondOperand = true
  }

  // 等于号点击处理
  handleEquals() {
    if (this.operator && !this.waitingForSecondOperand) {
      const result = this.calculate()
      this.displayValue = `${result}`
      this.firstOperand = 0
      this.operator = ''
      this.waitingForSecondOperand = true
    }
  }

  // 执行计算
  calculate(): number {
    const secondOperand = parseFloat(this.displayValue)

    switch (this.operator) {
      case '+':
        return this.firstOperand + secondOperand
      case '-':
        return this.firstOperand - secondOperand
      case '×':
        return this.firstOperand * secondOperand
      case '÷':
        if (secondOperand === 0) {
          // 使用Toast提示代替alert
          promptAction.showToast({
            message: '除数不能为零',
            duration: 2000
          })
          return 0
        }
        return this.firstOperand / secondOperand
      default:
        return secondOperand
    }
  }

  // 清除所有
  handleClear() {
    this.displayValue = '0'
    this.firstOperand = 0
    this.operator = ''
    this.waitingForSecondOperand = false
  }

  // 删除最后一个字符
  handleDelete() {
    if (this.displayValue.length > 1) {
      this.displayValue = this.displayValue.substring(0, this.displayValue.length - 1)
    } else {
      this.displayValue = '0'
    }
  }

  // 添加小数点
  handleDecimal() {
    if (this.waitingForSecondOperand) {
      this.displayValue = '0.'
      this.waitingForSecondOperand = false
    } else if (this.displayValue.indexOf('.') === -1) {
      this.displayValue = this.displayValue + '.'
    }
  }

  build() {
    Column({ space: 20 }) {
      // 结果显示区域
      Row() {
        Text(this.displayValue)
          .fontSize(48)
          .fontWeight(FontWeight.Bold)
          .textAlign(TextAlign.End)
          .width('100%')
          .padding(20)
          .backgroundColor('#f0f0f0')
          .borderRadius(10)
      }
      .width('90%')
      .margin({ top: 30 })

      // 按钮区域
      Column({ space: 10 }) {
        // 第一行：清除和删除按钮
        Row({ space: 10 }) {
          Button('C', { type: ButtonType.Normal })
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .backgroundColor('#ff6b6b')
            .width('20%')
            .height(70)
            .onClick(() => this.handleClear())

          Button('DEL', { type: ButtonType.Normal })
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .backgroundColor('#ffa726')
            .width('20%')
            .height(70)
            .onClick(() => this.handleDelete())
        }

        // 第二行：数字7-9和除号
        Row({ space: 10 }) {
          Button('7', { type: ButtonType.Normal })
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .backgroundColor('#e0e0e0')
            .width('20%')
            .height(70)
            .onClick(() => this.handleNumberInput('7'))

          Button('8', { type: ButtonType.Normal })
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .backgroundColor('#e0e0e0')
            .width('20%')
            .height(70)
            .onClick(() => this.handleNumberInput('8'))

          Button('9', { type: ButtonType.Normal })
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .backgroundColor('#e0e0e0')
            .width('20%')
            .height(70)
            .onClick(() => this.handleNumberInput('9'))

          Button('÷', { type: ButtonType.Normal })
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .backgroundColor('#42a5f5')
            .width('20%')
            .height(70)
            .onClick(() => this.handleOperator('÷'))
        }

        // 第三行：数字4-6和乘号
        Row({ space: 10 }) {
          Button('4', { type: ButtonType.Normal })
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .backgroundColor('#e0e0e0')
            .width('20%')
            .height(70)
            .onClick(() => this.handleNumberInput('4'))

          Button('5', { type: ButtonType.Normal })
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .backgroundColor('#e0e0e0')
            .width('20%')
            .height(70)
            .onClick(() => this.handleNumberInput('5'))

          Button('6', { type: ButtonType.Normal })
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .backgroundColor('#e0e0e0')
            .width('20%')
            .height(70)
            .onClick(() => this.handleNumberInput('6'))

          Button('×', { type: ButtonType.Normal })
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .backgroundColor('#42a5f5')
            .width('20%')
            .height(70)
            .onClick(() => this.handleOperator('×'))
        }

        // 第四行：数字1-3和减号
        Row({ space: 10 }) {
          Button('1', { type: ButtonType.Normal })
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .backgroundColor('#e0e0e0')
            .width('20%')
            .height(70)
            .onClick(() => this.handleNumberInput('1'))

          Button('2', { type: ButtonType.Normal })
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .backgroundColor('#e0e0e0')
            .width('20%')
            .height(70)
            .onClick(() => this.handleNumberInput('2'))

          Button('3', { type: ButtonType.Normal })
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .backgroundColor('#e0e0e0')
            .width('20%')
            .height(70)
            .onClick(() => this.handleNumberInput('3'))

          Button('-', { type: ButtonType.Normal })
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .backgroundColor('#42a5f5')
            .width('20%')
            .height(70)
            .onClick(() => this.handleOperator('-'))
        }

        // 第五行：0、小数点、等于号和加号
        Row({ space: 10 }) {
          Button('0', { type: ButtonType.Normal })
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .backgroundColor('#e0e0e0')
            .width('45%')
            .height(70)
            .onClick(() => this.handleNumberInput('0'))

          Button('.', { type: ButtonType.Normal })
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .backgroundColor('#e0e0e0')
            .width('20%')
            .height(70)
            .onClick(() => this.handleDecimal())

          Button('=', { type: ButtonType.Normal })
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .backgroundColor('#66bb6a')
            .width('20%')
            .height(70)
            .onClick(() => this.handleEquals())

          Button('+', { type: ButtonType.Normal })
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .backgroundColor('#42a5f5')
            .width('20%')
            .height(70)
            .onClick(() => this.handleOperator('+'))
        }
      }
      .width('90%')
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#f5f5f5')
    .padding(10)
  }
}