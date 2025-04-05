"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const AccordionContext = React.createContext<{
  value: string | undefined;
  onValueChange: (value: string) => void;
}>({
  value: undefined,
  onValueChange: () => {},
});

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsible?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      collapsible = false,
      value,
      defaultValue,
      onValueChange,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<
      string | undefined
    >(value || defaultValue);

    const handleValueChange = React.useCallback(
      (itemValue: string) => {
        const newValue =
          internalValue === itemValue && collapsible ? undefined : itemValue;
        setInternalValue(newValue);
        onValueChange?.(newValue as string);
      },
      [internalValue, collapsible, onValueChange]
    );

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    return (
      <AccordionContext.Provider
        value={{
          value: internalValue,
          onValueChange: handleValueChange,
        }}
      >
        <div ref={ref} className={cn("space-y-4", className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = "Accordion";

const AccordionItemContext = React.createContext<{
  value: string;
  disabled?: boolean;
} | null>(null);

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, disabled = false, children, ...props }, ref) => {
    return (
      <AccordionItemContext.Provider value={{ value, disabled }}>
        <div
          ref={ref}
          data-state={value ? "open" : "closed"}
          data-disabled={disabled ? true : undefined}
          className={cn(
            "rounded-lg border overflow-hidden transition-colors",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = "AccordionItem";

interface AccordionTriggerProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  disabled?: boolean;
}

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ className, children, disabled = false, ...props }, ref) => {
  const { value, onValueChange } = React.useContext(AccordionContext);
  const itemContext = React.useContext(AccordionItemContext);

  if (!itemContext) {
    throw new Error("AccordionTrigger must be used within an AccordionItem");
  }

  const isOpen = value === itemContext.value;

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled || itemContext.disabled}
      data-state={isOpen ? "open" : "closed"}
      onClick={() => onValueChange(itemContext.value)}
      className={cn(
        "flex w-full items-center justify-between py-4 px-5 font-medium transition-all hover:bg-muted/10 [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className="h-4 w-4 shrink-0 transition-transform duration-300 ease-in-out"
        aria-hidden="true"
      />
    </button>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  forceMount?: boolean;
}

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ className, children, ...props }, ref) => {
  const { value } = React.useContext(AccordionContext);
  const itemContext = React.useContext(AccordionItemContext);
  const [height, setHeight] = React.useState<number | undefined>(0);
  const contentRef = React.useRef<HTMLDivElement>(null);

  if (!itemContext) {
    throw new Error("AccordionContent must be used within an AccordionItem");
  }

  const isOpen = value === itemContext.value;

  React.useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, children]);

  return (
    <div
      ref={ref}
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        className
      )}
      style={{ height: isOpen ? `${height}px` : "0px" }}
      {...props}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
