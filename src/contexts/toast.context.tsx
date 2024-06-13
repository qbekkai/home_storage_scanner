import {
	PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useRef,
	useState,
} from 'react';

type ToastProps = {
	title?: string;
	content: string;
	type?: 'success' | 'danger' | 'info' | 'default';
};

type ToastPropsWithDuration = ToastProps & {
	duration?: number;
};

type ToastItem = ToastProps & {
	id: number;
	timer: ReturnType<typeof setTimeout>;
};

const defaultPush = (toast: ToastPropsWithDuration) => {};

const ToastContext = createContext({
	pushToastRef: { current: defaultPush },
});

export const useToast = () => {
	const { pushToastRef } = useContext(ToastContext);

	return {
		pushToast: useCallback(
			(toast: ToastPropsWithDuration) => {
				pushToastRef.current(toast);
			},
			[pushToastRef],
		),
	};
};

const Toast = ({ title, content, type = 'default' }: ToastProps) => {
	return (
		<div className={`toast toast--${type}`}>
			{title && (
				<p>
					<strong>{title}</strong>
				</p>
			)}
			<p>{content}</p>
		</div>
	);
};

const Toasts = () => {
	const [toasts, setToasts] = useState<ToastItem[]>([]);
	const { pushToastRef } = useContext(ToastContext);

	pushToastRef.current = ({ duration, ...props }) => {
		const id = Date.now();
		const timer = setTimeout(() => {
			setToasts((v: any) => v.filter((t: any) => t.id !== id));
		}, (duration ?? 5) * 1000);

		const toast = { ...props, id, timer };
		setToasts((v) => [...v, toast]);
	};

	const onRemove = (toast: ToastItem) => {
		clearTimeout(toast.timer);
		setToasts((v: any) => v.filter((t: any) => t !== toast));
	};

	return (
		<div className="toast-container">
			{toasts.map((toast) => (
				<div key={toast.id} onClick={() => onRemove(toast)}>
					<Toast {...toast} />
				</div>
			))}
		</div>
	);
};

export const ToastContextProvider = ({ children }: PropsWithChildren<any>) => {
	const pushToastRef = useRef(defaultPush);

	return (
		<ToastContext.Provider value={{ pushToastRef }}>
			<Toasts />
			{children}
		</ToastContext.Provider>
	);
};
