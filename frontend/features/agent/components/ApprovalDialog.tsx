import {
    AlertTriangle,
    Check,
    X,
  } from "lucide-react";
  
  import type { AgentAction } from "../types/agent";
  
  import styles from "./ApprovalDialog.module.css";
  
  interface ApprovalDialogProps {
    action: AgentAction | null;
    open: boolean;
    onApprove: (action: AgentAction) => void;
    onEdit: (action: AgentAction) => void;
    onCancel: () => void;
  }
  
  export function ApprovalDialog({
    action,
    open,
    onApprove,
    onEdit,
    onCancel,
  }: ApprovalDialogProps) {
    if (!open || !action) {
      return null;
    }
  
    return (
      <div
        className={styles.overlay}
        role="presentation"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            onCancel();
          }
        }}
      >
        <section
          className={styles.dialog}
          role="dialog"
          aria-modal="true"
          aria-labelledby="approval-title"
        >
          <button
            type="button"
            className={styles.closeButton}
            onClick={onCancel}
            aria-label="Close approval dialog"
          >
            <X size={16} />
          </button>
  
          <div className={styles.icon}>
            <AlertTriangle size={18} />
          </div>
  
          <div className={styles.header}>
            <p className={styles.eyebrow}>
              APPROVAL REQUIRED
            </p>
  
            <h2 id="approval-title">
              {action.title}
            </h2>
  
            <p className={styles.description}>
              LifeOS wants to perform this action.
              Review the details before allowing it
              to continue.
            </p>
          </div>
  
          <div className={styles.details}>
            {action.tool && (
              <div className={styles.detail}>
                <span>Tool</span>
                <strong>{action.tool}</strong>
              </div>
            )}
  
            <div className={styles.detail}>
              <span>Action</span>
              <strong>{action.type}</strong>
            </div>
          </div>
  
          {action.description && (
            <div className={styles.message}>
              <span>What will happen</span>
  
              <p>{action.description}</p>
            </div>
          )}
  
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancel}
              onClick={onCancel}
            >
              Cancel
            </button>
  
            <button
              type="button"
              className={styles.edit}
              onClick={() => onEdit(action)}
            >
              Edit
            </button>
  
            <button
              type="button"
              className={styles.approve}
              onClick={() => onApprove(action)}
            >
              <Check size={14} />
              Approve
            </button>
          </div>
        </section>
      </div>
    );
  }