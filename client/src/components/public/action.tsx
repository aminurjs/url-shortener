import React from "react";
import { Button } from "../ui/button";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ArrowRight } from "lucide-react";

const Action = () => {
  return (
    <div>
      <MaxWidthWrapper className="text-center py-5">
        <h2 className="text-primary text-4xl font-semibold mb-5">
          Start building powerful connections today
        </h2>
        <Button>
          Get started for free <ArrowRight className="ml-2 h-4 w-4" />
        </Button>{" "}
      </MaxWidthWrapper>
    </div>
  );
};

export default Action;
