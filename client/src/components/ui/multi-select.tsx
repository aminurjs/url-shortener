"use client";

import type { KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useFormContext, useController } from "react-hook-form";

export interface Tag {
  id: number;
  text: string;
}

interface MultipleTagSelectorProps {
  name: string;
  placeholder?: string;
  maxTags?: number;
}

export function MultipleTagSelector({
  name,
  placeholder = "Add a tag...",
  maxTags = Number.POSITIVE_INFINITY,
  ...field
}: MultipleTagSelectorProps) {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    defaultValue: [],
  });

  const tags = value as Tag[];

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value && tags.length < maxTags) {
      e.preventDefault();
      addTag(e.currentTarget.value);
      e.currentTarget.value = "";
    }
  };

  const addTag = (tag: string) => {
    const newTag = { id: tags.length, text: tag };
    if (
      tags.length < maxTags &&
      !tags.some((t) => t.text.toLowerCase() === tag.toLowerCase())
    ) {
      onChange([...tags, newTag]);
    }
  };

  const removeTag = (id: number) => {
    const newTags = tags
      .filter((tag) => tag.id !== id)
      .map((tag, index) => ({
        ...tag,
        id: index,
      }));
    onChange(newTags);
  };
  return (
    <div className="w-full p-2 rounded border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 shadow-sm">
      <div className="flex flex-nowrap items-center gap-2">
        {tags.map((tag) => (
          <Badge key={tag.id} variant="secondary" className="text-sm">
            {tag.text}
            <button
              onClick={() => removeTag(tag.id)}
              className="ml-2 focus:outline-none"
              aria-label={`Remove ${tag.text} tag`}
              type="button"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        <Input
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="w-full py-1 px-1 focus:outline-none border-none outline-none focus-visible:ring-0 shadow-none"
          disabled={tags.length >= maxTags}
          {...field}
        />
      </div>
    </div>
  );
}
