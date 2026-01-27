"use client";

import { SignoutConfirmation } from "@/components/popup-confirmation";
import { Button } from "@/components/ui/button";
import { LoadingAnimation } from "@/components/ui/loading-animation";
import { SectionText } from "@/components/ui/section-text";
import { SectionTitle } from "@/components/ui/section-title";
import { Separator } from "@/components/ui/separator";
import { useUpdateUser } from "@/hooks/user/useUpdateUser";
import { splitName } from "@/lib/utils";
import { useState } from "react";
import { TextField } from "../../components/Textfield";

export const Data = ({ data }: { data: any }) => (
  <section className="bg-card mt-10 rounded-lg p-5 md:p-15">
    <div>
      <SectionTitle>{data.name}</SectionTitle>
      <SectionText>{data.email}</SectionText>
    </div>
    <Separator className="my-5" />
    <UserData data={data} />
  </section>
);

const UserData = ({ data }: { data: any }) => {
  const names = splitName(data.name);
  const [firstName, setFirstName] = useState(names[0])
  const [lastName, setLastName] = useState(names[1])
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const { updateUser, isPending } = useUpdateUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser({
      id: data.id,
      name: `${firstName} ${lastName}`,
      password,
      profilePicture: profilePicture ?? undefined,
    });
  };

  return (
    <div>
      <div className="w-full gap-5 space-y-5 md:flex md:space-y-0">
        <TextField
          id="first-name"
          label="First name"
          placeholder={names[0]}
          className="flex-1"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          id="last-name"
          label="Last name"
          placeholder={names[1]}
          className="flex-1"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <Separator className="my-5" />
      <SectionTitle variant="small" className="mb-5">
        Change Password
      </SectionTitle>
      <div className="w-full items-end gap-5 space-y-5 md:flex md:space-y-0">
        <TextField
          id="new-password"
          type="password"
          label="New password"
          placeholder="********"
          className="flex-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          id="confirm-password"
          type="password"
          label="Confirm password"
          placeholder="********"
          className="flex-1"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="mt-5 flex justify-end gap-5">
        <SignoutConfirmation>
          <Button variant={"destructive"}>Sign out</Button>
        </SignoutConfirmation>
        <Button type="submit" onClick={handleSubmit} disabled={isPending}>
          {isPending ? <LoadingAnimation /> : "Save changes"}
        </Button>
      </div>
    </div>
  );
};
