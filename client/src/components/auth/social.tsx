"use client";

import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

type Pending = {
  isPending: boolean;
};
type Provider = "google";

const Social = ({ isPending }: Pending) => {
  const socialSignIn = (provider: Provider) => {
    console.log(provider);
  };

  return (
    <div className="flex gap-4 mb-2">
      <Button
        disabled={isPending}
        variant="outline"
        type="submit"
        className="w-full"
        onClick={() => {
          socialSignIn("google");
        }}
      >
        <Image
          src="/assets/auth/google.svg"
          className="h-4 w-4 text-neutral-800 dark:text-neutral-300 mr-2"
          width={20}
          height={20}
          alt="google"
        />
        Continue with Google
      </Button>
    </div>
  );
};

export default Social;
