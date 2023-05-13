export class Reservation {
  id: number = 0;
  name: string = "";
  email: string = "";
  nop: number = 0;
  date: Date = new Date();
  timeId: number = 0;

  constructor(name: string, email: string, nop: number, date: Date, timeId: number) {
    this.name = name;
    this.email = email;
    this.date = date;
    this.nop = nop;
    this.timeId = timeId;
  }
}
