"use client";

import fakedata from "./fakedata";
import clsx from "clsx";

const num_days = 7;
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const start_time = 10;
const end_time = 22;
const time_interval = 0.5;

function time_toString(time: number) {
  const hour = Math.floor(time);
  const minute = (time - hour) * 60;
  return `${hour}:${(minute < 10 ? "0" : "") + minute}`;
}

function generate_days(currDate: Date) {
  return Array.from(
    { length: num_days },
    (_, i) => new Date(new Date().setDate(currDate.getDate() + i))
  );
}

export default function timetable({ date }: { date: Date }) {
  let data = fakedata();
  let today = new Date(date).getDay();

  let start_of_week = new Date(new Date(date).setDate(date.getDate() - date.getDay()));

  let list_days = generate_days(start_of_week);

  function changeDate(e: number) {
    today = e;

    Array.from(document.querySelectorAll(".date-item")).forEach((item) => {
      item.classList.remove("date-selected");

      if (item.getAttribute("dataset-key") == e.toString()) {
        item.classList.add("date-selected");
      }
    });

    updateData();
  }

  function changeWeek(add_week: number) {
    start_of_week = new Date(start_of_week.setDate(start_of_week.getDate() + add_week * 7));

    list_days = generate_days(start_of_week);

    Array.from(document.querySelectorAll(".date-item")).forEach((item, index) => {
      item.setAttribute("dataset-key", list_days[index].getDay().toString());
      const secondChild = item.querySelector("p:nth-child(2)");
      if (secondChild) {
        secondChild.textContent = list_days[index].getDate().toString();
      }

      const firstChild = item.querySelector("p:nth-child(1)");
      if (firstChild) {
        firstChild.textContent = days[list_days[index].getDay()];
      }

      if (list_days[index].getDay() === today) {
        item.classList.add("date-selected");
      } else {
        item.classList.remove("date-selected");
      }

      item.addEventListener("click", () => changeDate(list_days[index].getDay()));
    });

    updateData();
  }

  function updateData() {
    let timetable = document.querySelector(".timetable");
    if (timetable) {
      timetable.innerHTML = "";
      Array.from({ length: (end_time - start_time) / time_interval + 1 }).map(
        (_, index) =>
          (timetable.innerHTML += `
          <div key=${index} class="flex flex-row timetable-row">
          <div class="time-label">
            <p>${time_toString(start_time + index * time_interval)}</p>
          </div>
          <div class="timetable-cell">
            ${data
              .filter(
                (item) =>
                  item.start_time === start_time + index * time_interval &&
                  item.date.getDate() === list_days[today].getDate()
              )
              .map(
                (item) =>
                  `<div key=${item.id} class="timetable-item">
                <p>${item.name} (${item.people})</p>
              </div>`
              )
              .join("")}
          </div>
        </div>`)
      );
    }
  }

  return (
    <div className="flex flex-col timetable-container w-full lg:w-1/2 p-4 h-full">
      <div className="flex flex-row date-selector space-between">
        <button className="date-left" onClick={() => changeWeek(-1)}>{"<"}</button>
        {list_days.map((day, index) => (
          <button
            key={day.getDay()}
            dataset-key={day.getDay()}
            className={clsx(
              "date-item w-full",
              day.getDay() === today && "date-selected"
            )}
            onClick={() => changeDate(day.getDay())}
          >
            <p className="text-sm">{days[day.getDay()]}</p>
            <p className="text-sm">{day.getDate()}</p>
          </button>
        ))}

        <button className="date-right"  onClick={() => changeWeek(1)}>{">"}</button>
      </div>
      <div className="flex flex-col timetable">
        {Array.from({
          length: (end_time - start_time) / time_interval + 1,
        }).map((_, index) => (
          <div key={index} className="flex flex-row timetable-row">
            <div className="time-label">
              <p>{time_toString(start_time + index * time_interval)}</p>
            </div>
            <div className="timetable-cell">
              {data
                .filter(
                  (item) =>
                    item.start_time === start_time + index * time_interval &&
                    item.date.getDay() == today
                )
                .map((item) => (
                  <div key={item.id} className="timetable-item">
                    <p>
                      {item.name} ({item.people})
                    </p>
                    {/* Maybe add actions here? */}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
