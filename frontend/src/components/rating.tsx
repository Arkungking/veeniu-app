import clsx from "clsx";
import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  onChange?: (value: number) => void;
  initialValue?: number;
  size?: number;
  className?: string;
}

export const StarRating = ({
  onChange,
  initialValue = 0,
  size = 28,
  className,
}: StarRatingProps) => {
  const [rating, setRating] = useState(initialValue);
  const [hover, setHover] = useState<number | null>(null);

  const handlePress = (value: number) => {
    setRating(value);
    onChange?.(value);
  };

  return (
    <div className={clsx("flex gap-1", className)}>
      {[...Array(5)].map((_, i) => {
        const value = i + 1;
        return (
          <button
            key={value}
            type="button"
            onClick={() => handlePress(value)}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(null)}
            className="cursor-pointer bg-transparent p-0"
          >
            <Star
              size={size}
              className={clsx(
                "transition-colors",
                (hover ?? rating) >= value
                  ? "fill-primary text-primary"
                  : "text-muted-foreground fill-none",
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
