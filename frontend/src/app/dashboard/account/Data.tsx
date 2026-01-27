import { auth } from "@/auth";
import { TextField } from "@/components/Textfield";
import { Button } from "@/components/ui/button";
import { SectionText } from "@/components/ui/section-text";
import { SectionTitle } from "@/components/ui/section-title";
import { Separator } from "@/components/ui/separator";
import { splitName } from "@/lib/utils";

export const Data = async () => {
  const session = await auth();
  const userData = session!.user;

  return (
    <section className="bg-card mt-10 rounded-lg p-5 md:p-15">
      <div>
        <SectionTitle>{userData.name}</SectionTitle>
        <SectionText>{userData.email}</SectionText>
      </div>
      <Separator className="my-5" />
      <UserDetail data={userData} />
    </section>
  );
};

const UserDetail = ({ data }: { data: any }) => {
  const names = splitName(data.name);

  return (
    <div>
      <div className="flex w-full gap-5">
        <TextField
          id="first-name"
          label="First name"
          placeholder={names[0]}
          className="flex-1"
        />
        <TextField
          id="last-name"
          label="Last name"
          placeholder={names[1]}
          className="flex-1"
        />
      </div>
      <Separator className="my-5" />
      <SectionTitle variant="small" className="mb-5">
        Change Password
      </SectionTitle>
      <div className="flex w-full items-end gap-5">
        <TextField
          id="new-password"
          type="password"
          label="New password"
          className="flex-1"
        />
        <TextField
          id="confirm-password"
          type="password"
          label="Confirm password"
          className="flex-1"
        />
      </div>
      <div className="mt-5 flex justify-end">
        <Button className="">Save changes</Button>
      </div>
    </div>
  );
};
