import Link from "next/link";

export default function profileBanner({
  username,
  avatar,
  id,
}: {
  username: string;
  avatar: string;
  id: string;
}) {
  return (
    <Link href="/dashboard/profile" key="profile">
      <div className="flex items-center mb-5 lg:mb-0 px-3 profile-card">
        <div>
          <h2 className="mb-1 text-xl font-bold">{username}</h2>
          <p className="text-sm text-gray-500 font-medium text-align-right">
            {id}
          </p>
        </div>
        <span className="inline-flex justify-center items-center w-12 h-12 ml-4 bg-violet-500 rounded"></span>
      </div>
    </Link>
  );
}
