import { requireUser } from "@/lib/session";
import UpdateProfileForm from "@/components/UpdateProfileForm";

export const metadata = { title: "তথ্য আপডেট | বাজার দর" };

export default async function UpdateProfilePage() {
  const user = await requireUser("/profile/update");

  return (
    <div className="mx-auto flex max-w-[760px] flex-col gap-6">
      <div>
        <h1 className="text-[clamp(34px,5vw,48px)] leading-tight">তথ্য আপডেট করুন</h1>
        <p className="text-n-700">আপনার নাম পরিবর্তন করে সংরক্ষণ করুন।</p>
      </div>
      <UpdateProfileForm defaultName={user.name} />
    </div>
  );
}
