export class Menu {
  id: number = -1;
  name: string = "";
  description: string ="";
  price: number = 0;
  courseId: number = 0;

  constructor(name: string, description: string, price: number, courseId: number) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.courseId = courseId;
  }
}
