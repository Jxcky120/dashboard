import { start } from "repl";

export default function fakedata() {
  let start_of_last_week = new Date(
    new Date().setDate(new Date().getDate() - 7)
  );

  let data = [];
  for (let i = 0; i < 10000; i++) {
    if(i % 1000 === 0) {
        start_of_last_week = new Date(start_of_last_week.setDate(start_of_last_week.getDate() + 7));
    }
    let date = new Date(
      new Date().setDate(
        start_of_last_week.getDate() + Math.floor(Math.random() * 7)
      )
    );

    let start_time = Math.floor(Math.random() * 48) * 0.5;
    let people = Math.floor(Math.random() * 10);
    let name = "John Doe from" + date.getDate() + "/" + date.getMonth();

    let email = "a" + i + "@gmail.com";
    let phone = "0123232";

    data.push({
      id: i,
      name,
      email,
      phone,
      date,
      start_time,
      people,
    });
  }

  return data;
}
