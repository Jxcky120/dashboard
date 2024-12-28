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

export default function timetable({ date }: { date: Date }) {
  let data = fakedata();

  const today = new Date(date);
  const list_days = [];

  for (let i = -3; i < num_days / 2; i++) {
    list_days.push(new Date(new Date().setDate(today.getDate() + i)));
  }

  return (
    <div className="flex flex-col timetable-container w-full lg:w-1/2 p-4 h-full">
      <div className="flex flex-row date-selector space-between">
        <button className="date-left">{"<"}</button>

        {list_days.map((day, index) => (
          <button
            key={day.getDate()}
            className={clsx("date-item w-full", day.getDate() === today.getDate() && "date-selected")}
          >
            <p className="text-sm">
                {days[day.getDay()]}
            </p>
            <p className="text-sm">
                {day.getDate()}
            </p>
          </button>
        ))}

        <button className="date-right">{">"}</button>
      </div>
      <div className="flex flex-col timetable">
        { Array.from({ length: (end_time - start_time)  / time_interval + 1 }).map((_, index) => (
          <div key={index} className="flex flex-row timetable-row">
            <div className="time-label">
              <p>{time_toString(start_time + index * time_interval)}</p>
            </div>
            <div className="timetable-cell">
              {data.filter((item) => item.start_time === start_time + index * time_interval).map((item) => (
                <div key={item.id} className="timetable-item">
                  <p>{item.name} ({item.people})</p>
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
