import Timetable from "@/app/ui/reservations/timetable";
// import timetable_list from "@/app/ui/reservations/timetable_list";
// import staff_list from "@/app/ui/reservations/staff_list";

import Header from "@/app/ui/dashboard/header";

export default function Page() {
  return (
    <div>
      <section className="py-6 px-6 bg-white">
        <Header title="Reservations" description="Keep up the good work!" />
      </section>
      <div className="flex flex-col">
        <Timetable date={new Date()} />
      </div>
    </div>
  );
}
