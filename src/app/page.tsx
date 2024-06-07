'use client';
import { useState } from 'react';
import InfoContainer from '@/components/InfoContainer.component';
import AddContainer from '@/components/AddContainer.component';
import ModeSelector from '@/components/ModeSelector.component';
import { ScannerContextProvider } from '@/contexts/scanner.context';
import ModifyContainer from '@/components/ModifyContainer.component';

export default function Home() {
	const [mode, setMode] = useState<'read' | 'add' | 'modify' | 'delete'>(
		'read',
	);

	return (
		<main className="w-full	h-full">
			<ScannerContextProvider>
				{mode == 'read' ? <InfoContainer /> : ''}
				{mode == 'add' ? <AddContainer /> : ''}
				{mode == 'modify' ? <ModifyContainer /> : ''}
				{mode == 'delete' ? <p>Delete Component</p> : ''}
				<ModeSelector setMode={setMode} />
			</ScannerContextProvider>
		</main>
	);
}

/**
 *
 * https://www.notion.so/Q-000-DOC-85ddfab62c9547f892d59844820a67c9?pvs=4
 * https://www.notion.so/A_RANGER-74111251f8f64ed981736e77562a6f30?pvs=4
 */
