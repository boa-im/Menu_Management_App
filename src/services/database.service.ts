import {Injectable} from '@angular/core';
import {Menu} from "../models/menu.model";
import {Course} from "../models/course.model";
import {Option} from "../models/option.model";
import {Order} from "../models/order.model";
import {Time} from "../models/time.model";
import {Reservation} from "../models/reservation.model";
import {raceWith} from "rxjs";

declare function openDatabase(name: string,
                              version: string,
                              displayName: string,
                              size: number,
                              creationCallback: any): any;

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: any = null;

  constructor() {
  }

  private static errorHandler(error: any) {
    console.error(`Error: ${error.message}`);
  }

  private createDatabase() {
    let name = "MenuDB";
    let version = "1.0";
    let displayName = "DB for menu management app";
    let size = 2 * 1024 * 1024;

    this.db = openDatabase(name, version, displayName, size, () => {
      console.log("Success: Database created successfully");
    });
  }

  private getDatabase(): any {
    if (this.db == null) {
      this.createDatabase();
    }
    return this.db;
  }

  private createTables() {
    const txFunction = (tx: any) => {
      // create tables
      let menuSql: string = "CREATE TABLE IF NOT EXISTS menu("
        + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "
        + "name VARCHAR(20) NOT NULL,"
        + "description VARCHAR(200),"
        + "price DOUBLE,"
        + "courseId INTEGER NOT NULL,"
        + "FOREIGN KEY(courseId) REFERENCES course(id));";
      let courseSql: string = "CREATE TABLE IF NOT EXISTS course("
        + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "
        + "name VARCHAR(20) NOT NULL);";
      let cartSql: string = "CREATE TABLE IF NOT EXISTS cart("
        + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "
        + "name VARCHAR(20) NOT NULL,"
        + "optionId INTEGER NOT NULL,"
        + "quantity INTEGER NOT NULL,"
        + "instruction VARCHAR(200),"
        + "FOREIGN KEY(optionId) REFERENCES option(id));";
      let optionSql: string = "CREATE TABLE IF NOT EXISTS option("
        + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "
        + "name VARCHAR(20) NOT NULL);";
      let reservationSql: string = "CREATE TABLE IF NOT EXISTS reservation("
        + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "
        + "name VARCHAR(20) NOT NULL,"
        + "email VARCHAR(50),"
        + "nop INTEGER NOT NULL,"
        + "date DATE,"
        + "timeId INTEGER NOT NULL,"
        + "FOREIGN KEY(timeId) REFERENCES time(id));";
      let timeSql: string = "CREATE TABLE IF NOT EXISTS time("
        + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "
        + "time VARCHAR(50) NOT NULL);";

      // insert values to course table
      let insert1: string = "INSERT INTO course(name) SELECT ('Appetizer') WHERE NOT EXISTS (SELECT id FROM course WHERE id=1);";
      let insert2: string = "INSERT INTO course(name) SELECT ('Main') WHERE NOT EXISTS (SELECT id FROM course WHERE id=2);";
      let insert3: string = "INSERT INTO course(name) SELECT ('Dessert') WHERE NOT EXISTS (SELECT id FROM course WHERE id=3);";

      let option0: string = "INSERT INTO option(name) SELECT ('No Option') WHERE NOT EXISTS (SELECT id FROM option WHERE id=1);";
      let option1: string = "INSERT INTO option(name) SELECT ('Gluten Sensitive') WHERE NOT EXISTS (SELECT id FROM option WHERE id=2);";
      let option2: string = "INSERT INTO option(name) SELECT ('Vegetarian') WHERE NOT EXISTS (SELECT id FROM option WHERE id=3);";
      let option3: string = "INSERT INTO option(name) SELECT ('Chef Special') WHERE NOT EXISTS (SELECT id FROM option WHERE id=4);";
      let option4: string = "INSERT INTO option(name) SELECT ('Nut Allergy') WHERE NOT EXISTS (SELECT id FROM option WHERE id=5);";
      let option5: string = "INSERT INTO option(name) SELECT ('Spicy') WHERE NOT EXISTS (SELECT id FROM option WHERE id=6);";

      let time1: string = "INSERT INTO time(time) SELECT ('11AM - 12PM') WHERE NOT EXISTS (SELECT id FROM time WHERE id=1);";
      let time2: string = "INSERT INTO time(time) SELECT ('12PM - 1PM') WHERE NOT EXISTS (SELECT id FROM time WHERE id=2);";
      let time3: string = "INSERT INTO time(time) SELECT ('1PM - 2PM') WHERE NOT EXISTS (SELECT id FROM time WHERE id=3);";
      let time4: string = "INSERT INTO time(time) SELECT ('5PM - 6PM') WHERE NOT EXISTS (SELECT id FROM time WHERE id=4);";
      let time5: string = "INSERT INTO time(time) SELECT ('6PM - 7PM') WHERE NOT EXISTS (SELECT id FROM time WHERE id=5);";
      let time6: string = "INSERT INTO time(time) SELECT ('7PM - 8PM') WHERE NOT EXISTS (SELECT id FROM time WHERE id=6);";

      let options: any[] = [];
      // execute creating tables
      tx.executeSql(menuSql, options, () => {
        console.log("Success: menu table created successfully");
      }, DatabaseService.errorHandler);
      tx.executeSql(courseSql, options, () => {
        console.log("Success: course table created successfully");
      }, DatabaseService.errorHandler);
      tx.executeSql(cartSql, options, () => {
        console.log("Success: cart table created successfully");
      }, DatabaseService.errorHandler);
      tx.executeSql(optionSql, options, () => {
        console.log("Success: option table created successfully");
      }, DatabaseService.errorHandler);
      tx.executeSql(reservationSql, options, () => {
        console.log("Success: cart table created successfully");
      }, DatabaseService.errorHandler);
      tx.executeSql(timeSql, options, () => {
        console.log("Success: option table created successfully");
      }, DatabaseService.errorHandler);

      // execute inserting values
      tx.executeSql(insert1, options, () => {}, DatabaseService.errorHandler);
      tx.executeSql(insert2, options, () => {}, DatabaseService.errorHandler);
      tx.executeSql(insert3, options, () => {}, DatabaseService.errorHandler);

      tx.executeSql(option0, options, () => {}, DatabaseService.errorHandler);
      tx.executeSql(option1, options, () => {}, DatabaseService.errorHandler);
      tx.executeSql(option2, options, () => {}, DatabaseService.errorHandler);
      tx.executeSql(option3, options, () => {}, DatabaseService.errorHandler);
      tx.executeSql(option4, options, () => {}, DatabaseService.errorHandler);
      tx.executeSql(option5, options, () => {}, DatabaseService.errorHandler);

      tx.executeSql(time1, options, () => {}, DatabaseService.errorHandler);
      tx.executeSql(time2, options, () => {}, DatabaseService.errorHandler);
      tx.executeSql(time3, options, () => {}, DatabaseService.errorHandler);
      tx.executeSql(time4, options, () => {}, DatabaseService.errorHandler);
      tx.executeSql(time5, options, () => {}, DatabaseService.errorHandler);
      tx.executeSql(time6, options, () => {}, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Create tables transaction successful");
    });
  }

  private dropTable() {
    function txFunction(tx: any) {
      let menuSql: string = "DROP TABLE IF EXISTS reservation;";
      let options: any[] = [];
      tx.executeSql(menuSql, options, () => {
        console.log("Success: order table dropped successfully");
      }, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Drop tables transaction successful");
    });
  }

  private dropTables() {
    function txFunction(tx: any) {
      let menuSql: string = "DROP TABLE IF EXISTS menu;";
      let options: any[] = [];
      tx.executeSql(menuSql, options, () => {
        console.log("Success: menu table dropped successfully");
      }, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Drop tables transaction successful");
    });
  }

  public initDB() {
    try {
      this.createDatabase();
      this.createTables();
    } catch (err: any) {
      console.error("Error in initDB: " + err.message);
    }
  }

  public clearDB() {
    let result = confirm("Really want to clear menu?");
    if (result) {
      this.dropTables();
      this.db = null;
      alert("Database cleared");
      this.createTables();
    }
  }

  public clearCart() {
    let result = confirm("Really want to clear cart?");
    if (result) {
      function txFunction(tx: any) {
        let menuSql: string = "DROP TABLE IF EXISTS cart;";
        let options: any[] = [];
        tx.executeSql(menuSql, options, () => {
          console.log("Success: cart table dropped successfully");
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Drop tables transaction successful");
      });
      this.db = null;
      alert("Database cleared");
      this.createTables();
    }
  }

  public clearReservation() {
    let result = confirm("Really want to clear reservation?");
    if (result) {
      function txFunction(tx: any) {
        let menuSql: string = "DROP TABLE IF EXISTS reservation;";
        let options: any[] = [];
        tx.executeSql(menuSql, options, () => {
          console.log("Success: reservation table dropped successfully");
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Drop tables transaction successful");
      });
      this.db = null;
      alert("Reservations cleared");
      this.createTables();
    }
  }

  public insert(menu: Menu): Promise<any> {

    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "INSERT INTO menu (name, description, price, courseId) VALUES(?,?,?,?);";

        let options: any[] = [menu.name, menu.description, menu.price, menu.courseId]
        tx.executeSql(sql, options, (tx: any, results: any) => {
          resolve(results);
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: insert transaction successful");
      });
    });
  }

  public insertReservation(reservation: Reservation): Promise<any> {

    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "INSERT INTO reservation (name, email, nop, date, timeId) VALUES(?,?,?,?,?);";

        let options: any[] = [reservation.name, reservation.email, reservation.nop, reservation.date, reservation.timeId]
        tx.executeSql(sql, options, (tx: any, results: any) => {
          resolve(results);
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: insert transaction successful");
      });
    });
  }

  public insertCart(order: Order): Promise<any> {

    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "INSERT INTO cart (name, optionId, quantity, instruction) VALUES(?,?,?,?);";

        let options: any[] = [order.name, order.optionId, order.quantity, order.instruction]
        tx.executeSql(sql, options, (tx: any, results: any) => {
          resolve(results);
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: insert transaction successful");
      });
    });
  }

  public getCourse(): Promise<any> {
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT * FROM course;";
        let option: any[] = [];

        tx.executeSql(sql, option, (tx: any, results: any) => {
          let courses: Course[] = [];
          for (let i = 0; i < results.rows.length; i++) {
            let row = results.rows[i];
            let course = new Course(row['name']);
            course.id = row['id'];
            courses.push(course);
          }

          resolve(courses);
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: get course transaction successful");
      })
    })
  }

  public getOrders(): Promise<any> {

    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT * FROM cart;";
        let options: any[] = [];
        tx.executeSql(sql, options, (tx: any, results: any) => {
          let orders: Order[] = [];
          for (let i = 0; i < results.rows.length; i++) {
            let row = results.rows[i];
            let o = new Order(row['name'], row['optionId'], row['quantity'], row['instruction']);
            o.id = row['id'];
            orders.push(o);
          }
          resolve(orders);

        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: getOrders transaction successful");
      });
    });
  }

  public getOption(): Promise<any> {
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT * FROM option;";
        let option: any[] = [];

        tx.executeSql(sql, option, (tx: any, results: any) => {
          let options: Option[] = [];
          for (let i = 0; i < results.rows.length; i++) {
            let row = results.rows[i];
            let op = new Option(row['name']);
            op.id = row['id'];
            options.push(op);
          }

          resolve(options);
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: get course transaction successful");
      })
    })
  }

  public getTime(): Promise<any> {
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT * FROM time;";
        let option: any[] = [];

        tx.executeSql(sql, option, (tx: any, results: any) => {
          let times: Time[] = [];
          for (let i = 0; i < results.rows.length; i++) {
            let row = results.rows[i];
            let t = new Time(row['time']);
            t.id = row['id'];
            times.push(t);
          }

          resolve(times);
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: get course transaction successful");
      })
    })
  }

  public selectAll(): Promise<any> {

    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT * FROM menu;";
        let options: any[] = [];
        tx.executeSql(sql, options, (tx: any, results: any) => {
          //notify the caller about success

          let menus: Menu[] = [];
          for (let i = 0; i < results.rows.length; i++) {
            let row = results.rows[i];
            let m = new Menu(row['name'], row['description'], row['price'], row['courseId']);
            m.id = row['id'];
            menus.push(m);
          }
          resolve(menus);

        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: SelectAll transaction successful");
      });
    });
  }

  public select(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT * FROM menu WHERE id=?;";
        let options: any[] = [id];
        tx.executeSql(sql, options, (tx: any, results: any) => {
          //notify the caller about success
          let row = results.rows[0];
          let menu = new Menu(row['name'], row['description'], row['price'], row['courseId']);
          menu.id = row['id'];
          resolve(menu);
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: Select transaction successful");
      });
    });
  }

  public selectOrder(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT * FROM cart WHERE id=?;";
        let options: any[] = [id];
        tx.executeSql(sql, options, (tx: any, results: any) => {
          let row = results.rows[0];
          let order = new Order(row['name'], row['optionId'], row['quantity'], row['instruction']);
          order.id = row['id'];
          resolve(order);
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: Select transaction successful");
      });
    });
  }

  public selectReservation(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT * FROM reservation WHERE id=?;";
        let options: any[] = [id];
        tx.executeSql(sql, options, (tx: any, results: any) => {
          let row = results.rows[0];
          let reservation = new Reservation(row['name'], row['email'], row['nop'], row['date'], row['timeId']);
          reservation.id = row['id'];
          resolve(reservation);
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: Select transaction successful");
      });
    });
  }

  public getId(reservation: Reservation): Promise<any> {
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "SELECT * FROM reservation WHERE name=? AND email=? AND nop=? AND date=? AND timeId=?;";
        let options: any[] = [reservation.name, reservation.email, reservation.nop, reservation.date, reservation.timeId];
        tx.executeSql(sql, options, (tx: any, results: any) => {
          let row = results.rows[0];
          let reservation = new Reservation(row['name'], row['email'], row['nop'], row['date'], row['timeId']);
          reservation.id = row['id'];
          resolve(reservation);
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: Select transaction successful");
      });
    });
  }

  public update(menu: Menu): Promise<any> {
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "UPDATE menu SET name=?, description=?, price=?, courseId=? WHERE id=?;";

        let options: any[] = [menu.name, menu.description, menu.price, menu.courseId, menu.id];
        tx.executeSql(sql, options, (tx: any, results: any) => {
          resolve(results);
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: update transaction successful");
      });
    });
  }

  public updateOrder(order: Order): Promise<any> {
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "UPDATE cart SET name=?, optionId=?, quantity=?, instruction=? WHERE id=?;";

        let options: any[] = [order.name, order.optionId, order.quantity, order.instruction, order.id];
        tx.executeSql(sql, options, (tx: any, results: any) => {
          resolve(results);
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: update transaction successful");
      });
    });
  }

  public updateReservation(reservation: Reservation): Promise<any> {
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "UPDATE reservation SET name=?, email=?, nop=?, date=?, timeId=? WHERE id=?;";

        let options: any[] = [reservation.name, reservation.email, reservation.nop, reservation.date, reservation.timeId, reservation.id];
        tx.executeSql(sql, options, (tx: any, results: any) => {
          resolve(results);
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: update transaction successful");
      });
    });
  }

  public delete(menu: Menu): Promise<any> {
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "DELETE FROM menu WHERE id=?;";

        let options: any[] = [menu.id];
        tx.executeSql(sql, options, (tx: any, results: any) => {
          resolve(results);
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: delete transaction successful");
      });
    });
  }

  public deleteOrder(order: Order): Promise<any> {
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "DELETE FROM cart WHERE id=?;";

        let options: any[] = [order.id];
        tx.executeSql(sql, options, (tx: any, results: any) => {
          resolve(results);
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: delete transaction successful");
      });
    });
  }

  public deleteReservation(reservation: Reservation): Promise<any> {
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        let sql = "DELETE FROM reservation WHERE id=?;";

        let options: any[] = [reservation.id];
        tx.executeSql(sql, options, (tx: any, results: any) => {
          resolve(results);
        }, DatabaseService.errorHandler);
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: delete transaction successful");
      });
    });
  }
}
