import "./dashboard.css";
import clsx from "clsx";
import Link from "next/link";

const MainLinks = [
  { name: "Home", path: "/dashboard/home" },
  { name: "Staffs", path: "/dashboard/staffs" },
  { name: "Reservations", path: "/dashboard/reservations" },
  { name: "Actions", path: "/dashboard/actions" },
];

const OtherLinks = [
  { name: "Control", path: "/dashboard/control" },
  { name: "Settings", path: "/dashboard/settings" },
  { name: "Profile", path: "/dashboard/profile" },
  { name: "Feedbacks", path: "/dashboard/feedbacks" },
  { name: "Logout", path: "/dashboard/logout" },
];

export default function sidenav({ state }: { state: string }) {
  return (
    <div className="flex h-full shrink-0 bg-gray-800 p-4 flex-col">
      <div className="flex items-center h-16 w-full border-b-2 border-gray-700 ">
        <h1 className="text-white text-2xl font-bold">Dashboard</h1>
      </div>
      <div className="collapsable">
        <div className="flex items-center h-8 w-full mt-4">
          <p className="text-gray-700 text-sm">Main</p>
        </div>

        {MainLinks.map((link) => (
          <Link href={link.path} key={link.name}>
            <div
              className={clsx(
                "flex justify-center h-12 w-full sidenav_item px-3 mb-2",
                state === link.name.toLowerCase() && "selected"
              )}
            >
              <button className="flex items-center w-full text-sm text-white">
                {link.name}
              </button>
            </div>
          </Link>
        ))}

        <div className="flex items-center h-8 w-full mt-4">
          <p className="text-gray-700 text-sm">Others</p>
        </div>
        
        {OtherLinks.map((link) => (
          <Link href={link.path} key={link.name}>
            <div
              className={clsx(
                "flex justify-center h-12 w-full sidenav_item px-3 mb-2",
                state === link.name.toLowerCase() && "selected"
              )}
            >
              <button className="flex items-center w-full text-sm text-white">
                {link.name}
              </button>
            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}
