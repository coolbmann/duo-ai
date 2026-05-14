import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { requestModalStore } from "@/store/requestModal";
import { useCreateFeedbackMutation } from "./feedbackAPI";

export function RequestModal() {
  const [open, setOpen] = useState(() => requestModalStore.isOpen());
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [createFeedback, { isLoading }] = useCreateFeedbackMutation();

  useEffect(() => {
    requestModalStore.subscribe(() => {
      setOpen(requestModalStore.isOpen());
      if (!requestModalStore.isOpen()) {
        setValue("");
        setName("");
        setContact("");
        setSubmitted(false);
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    await createFeedback({
      message: value.trim(),
      name: name.trim() || null,
      email: contact.trim() || null,
    });
    setSubmitted(true);
    setTimeout(() => requestModalStore.close(), 1200);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && requestModalStore.close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit a request</DialogTitle>
          <DialogDescription>
            <div className="mt-3" />
            Thanks for using the platform!
            <div className="mt-3" />
            Add any requests or feedback you have here and we'll review your
            suggestions periodically.
            <div className="mt-3" />- Bryan
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-6 text-center">
            <div className="text-[28px] mb-2">✓</div>
            <div className="text-[14px] font-medium text-text-dark">
              Request submitted
            </div>
            <div className="text-[12px] text-text-mid mt-1">
              Thanks — we'll be in touch.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <textarea
              autoFocus
              rows={5}
              placeholder="Describe what you'd like to see added or improved…"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full resize-none rounded-lg border border-border-mid bg-bg-app px-3.5 py-3 text-[13.5px] text-text-dark placeholder:text-text-light outline-none transition-colors focus:border-brand focus:shadow-[0_0_0_3px_rgba(45,111,245,0.08)]"
            />
            <div className="flex gap-2.5">
              <input
                type="text"
                placeholder="Name (optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 rounded-lg border border-border-mid bg-bg-app px-3.5 py-2.5 text-[13.5px] text-text-dark placeholder:text-text-light outline-none transition-colors focus:border-brand focus:shadow-[0_0_0_3px_rgba(45,111,245,0.08)]"
              />
              <input
                type="text"
                placeholder="Email or phone (optional)"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="flex-1 rounded-lg border border-border-mid bg-bg-app px-3.5 py-2.5 text-[13.5px] text-text-dark placeholder:text-text-light outline-none transition-colors focus:border-brand focus:shadow-[0_0_0_3px_rgba(45,111,245,0.08)]"
              />
            </div>
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg text-[13px] font-medium text-text-mid bg-bg-hover hover:bg-[#EAEAE6] transition-colors"
                >
                  Cancel
                </button>
              </DialogClose>
              <button
                type="submit"
                disabled={!value.trim() || isLoading}
                className="px-4 py-2 rounded-lg text-[13px] font-medium text-white! bg-[#1a1a1a]! hover:bg-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Submit request
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
