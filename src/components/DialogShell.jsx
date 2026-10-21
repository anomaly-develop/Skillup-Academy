import { useEffect, useRef } from "react";
import { CloseIcon } from "./icons";

export default function DialogShell({
  open,
  onClose,
  kicker,
  judul,
  labelledBy,
  widthClass = "w-[min(92vw,44rem)]",
  tutupLabel = "Tutup",
  children,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (open && !dlg.open) dlg.showModal();
    else if (!open && dlg.open) dlg.close();
  }, [open]);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    const handleClose = () => onClose();
    const handleBackdrop = (e) => {
      if (e.target === dlg) dlg.close();
    };
    dlg.addEventListener("close", handleClose);
    dlg.addEventListener("click", handleBackdrop);
    return () => {
      dlg.removeEventListener("close", handleClose);
      dlg.removeEventListener("click", handleBackdrop);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={`${widthClass} border border-ink bg-paper p-0 text-ink backdrop:bg-ink/60`}
      aria-labelledby={labelledBy}
    >
      <div className="max-h-[85vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5">
          <div className="min-w-0 flex-1">
            {kicker && <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">{kicker}</p>}
            <h2 className={`${kicker ? "mt-1 " : ""}text-xl font-extrabold tracking-tight`} id={labelledBy}>
              {judul}
            </h2>
          </div>
          <button
            type="button"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-line hover:bg-line"
            onClick={() => ref.current?.close()}
            aria-label={tutupLabel}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="px-6 py-6">{children}</div>
      </div>
    </dialog>
  );
}
