export class Order {
  id: number = -1;
  name: string = "";
  optionId: number = 0;
  quantity: number = 0;
  instruction: string = "";

  constructor(name: string, optionId: number, quantity: number, instruction: string) {
    this.name = name;
    this.optionId = optionId;
    this.quantity = quantity;
    this.instruction = instruction;
  }
}
