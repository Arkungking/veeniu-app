"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEventStore } from "@/store/event-store";
import { useSidebarStore } from "@/store/sidebar-store";
import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "./ui/button";
// import QRCode from "react-qr-code";

interface CreateAccountConfirmationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  desc: string;
}

export const CreateAccountConfirmation = ({
  title,
  desc,
  open,
  onOpenChange,
}: CreateAccountConfirmationProps) => {
  const router = useRouter();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => router.replace("/auth/signin")}>
            Let's go
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

interface PassChangeConfirmationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PasswordChangeConfirmation = ({
  open,
  onOpenChange,
}: PassChangeConfirmationProps) => {
  const router = useRouter();
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Password changed successfully!</AlertDialogTitle>
          <AlertDialogDescription>
            You can now sign in with your new password.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => router.replace("/auth/signin")}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const SendLinkConfirmation = ({
  open,
  onOpenChange,
}: PassChangeConfirmationProps) => {
  const router = useRouter();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reset password link sent!</AlertDialogTitle>
          <AlertDialogDescription>
            We've sent a password reset link to your email. Please check your
            inbox and follow the instructions to set a new password.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => router.replace("/auth/signin")}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const SignoutConfirmation = ({ children }: { children: ReactNode }) => {
  async function clearAllStores() {
    useEventStore.persist.clearStorage();
    useEventStore.getState().reset();
    await useEventStore.persist.rehydrate();

    useSidebarStore.persist.clearStorage();
    useSidebarStore.getState().reset();
    await useSidebarStore.persist.rehydrate();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Leaving so soon?</AlertDialogTitle>
          <AlertDialogDescription>
            You’re about to sign out. Don’t worry, you can always come back
            later!
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await signOut({ redirect: false });
              await clearAllStores();
              redirect("/");
            }}
            className="bg-transparant hover:bg-destructive active:bg-destructive border-destructive text-destructive border hover:text-white active:text-white"
          >
            Sign out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

interface SignInNeededDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SignInNeededDialog = ({
  open,
  onOpenChange,
}: SignInNeededDialogProps) => {
  const router = useRouter();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign In Required</AlertDialogTitle>
          <AlertDialogDescription>
            You need to sign in to continue. Please log in to your account to
            proceed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => router.replace("/auth/signin")}>
            Go to Sign In
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

interface UploadPaymentProofConfirmationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UploadPaymentProofConfirmation = ({
  open,
  onOpenChange,
}: UploadPaymentProofConfirmationProps) => {
  const router = useRouter();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Payment Proof Uploaded</AlertDialogTitle>
          <AlertDialogDescription>
            Awesome! 🎉 We’ve received your payment proof. Sit back and relax
            while we verify it for you.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => router.replace("/account")}>
            Okay
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

interface ImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src: string;
  isUuid?: boolean;
}

export const ImageDialog = ({
  open,
  onOpenChange,
  src,
  isUuid = false,
}: ImageDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Payment Proof</AlertDialogTitle>
        </AlertDialogHeader>

        <div className="my-4 flex justify-center">
          {isUuid ? (
            <div style={{ background: "white", padding: "16px" }}>
              {/* <QRCode value={src} /> */}
            </div>
          ) : (
            <img
              src={src}
              alt="Preview"
              className="max-h-96 rounded-md object-contain"
            />
          )}
        </div>

        <AlertDialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
