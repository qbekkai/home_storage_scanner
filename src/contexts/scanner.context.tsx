import { createContext, useState, useEffect } from 'react';
import Quagga from '@ericblade/quagga2';

const ScannerContext = createContext<any>(null);

export default ScannerContext;

export const ScannerContextProvider = ({ children }: any) => {
	const [isOnScanningMode, setIsOnScanningMode] = useState<boolean>(false);
	const [things, setThings] = useState<'item' | 'container' | null>(null);
	const [itemCode, setItemCode] = useState<string | null>(null);
	const [containerCode, setContainerCode] = useState<string | null>(null);

	const initQuagga = ({ height, width }: any) => {
		Quagga.init(
			{
				frequency: 1,
				inputStream: {
					type: 'LiveStream',
					constraints: {
						width: height,
						height: width,
						facingMode: 'environment',
						deviceId:
							'1d74b6b4022c4dc6c23b2b6d42c54dff6be66edb88ff2406007b9fe47934403d',
					},
				},
				locator: {
					halfSample: true,
					patchSize: 'x-large', // x-small, small, medium, large, x-large
					debug: {
						showCanvas: true,
						showPatches: false,
						showFoundPatches: false,
						showSkeleton: false,
						showLabels: false,
						showPatchLabels: false,
						showRemainingPatchLabels: false,
						boxFromPatches: {
							showTransformed: true,
							showTransformedBox: true,
							showBB: true,
						},
					},
				},
				numOfWorkers: 1,
				decoder: {
					readers: [
						'code_128_reader',
						'ean_reader',
						'ean_8_reader',
						'codabar_reader',
					],
					debug: {
						drawBoundingBox: true,
						showFrequency: true,
						drawScanline: true,
						showPattern: true,
					},
				},
				locate: false,
			},
			function (err: any) {
				if (err) {
					return console.log(err);
				}
			},
		);
	};
	const startQuagga = () => {
		setIsOnScanningMode(true);

		Quagga.start();
		Quagga.onDetected(_onDetected);
	};
	const stopQuagga = () => {
		setIsOnScanningMode(false);
		Quagga.offDetected(_onDetected);
	};
	const _onDetected = (result: any) => {
		stopQuagga();
		console.log('barCode', result.codeResult.code);
		if (things === 'item') setItemCode(result.codeResult.code);
		if (things === 'container') setContainerCode(result.codeResult.code);
	};

	const clearCode = () => {
		setItemCode(null);
		setContainerCode(null);
	};

	const toggleOnScanning = (what: 'item' | 'container') => {
		setIsOnScanningMode(!isOnScanningMode);
		setThings(what);
	};

	useEffect(() => {
		const w = window.innerWidth;
		const h = window.innerHeight;

		if (
			navigator.mediaDevices &&
			typeof navigator.mediaDevices.getUserMedia === 'function'
		) {
			initQuagga({ height: h, width: w });
		}

		if (isOnScanningMode) startQuagga();
		else stopQuagga();
	});
	return (
		<ScannerContext.Provider
			value={{
				things,
				isOnScanningMode,
				itemCode,
				containerCode,
				startQuagga,
				stopQuagga,
				toggleOnScanning,
				clearCode,
			}}
		>
			<div className="w-full h-full">
				<div
					className={`absolute w-full h-full border-2 ${
						isOnScanningMode ? 'border-blue-400' : 'border-slate-400'
					}`}
				></div>
				<div id="interactive" className="viewport h-full" />
			</div>
			{children}
		</ScannerContext.Provider>
	);
};