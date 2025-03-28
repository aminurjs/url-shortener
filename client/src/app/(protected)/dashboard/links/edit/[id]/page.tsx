import React from "react";
import LinkEdit from "@/components/dashboard/links/link-edit";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EditPageProps {
  params: {
    id: string;
  };
}

const EditPage = ({ params }: EditPageProps) => {
  return (
    <div>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-primary text-4xl font-semibold">Edit Link</h1>
          <Button variant="outline">
            <Link href="/dashboard/links">Back to Links</Link>
          </Button>
        </div>
        <div className="p-10 bg-white shadow rounded-md">
          <LinkEdit id={params.id} />
        </div>
      </div>
    </div>
  );
};

export default EditPage;
