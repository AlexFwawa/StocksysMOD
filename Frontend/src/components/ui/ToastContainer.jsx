import { useToast } from '../../hooks/useToast';
import Toast from './Toast';

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onClose={removeToast} />
      ))}
    </div>
  );
};

export default ToastContainer;
