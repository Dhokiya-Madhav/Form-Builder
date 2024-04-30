import React, { useState } from 'react';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';

interface RightSidebarProps {
    selectedItemProperties: Record<string, any> | null;
    onPlaceholderChange: (itemId: number, value: string) => void;
    onButtonTextChange: (itemId: number, value: string) => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ selectedItemProperties, onPlaceholderChange, onButtonTextChange }) => {
    const [localPlaceholder, setLocalPlaceholder] = useState<string>('');
    const [localButtonValue, setLocalButtonValue] = useState<string>('');

    const handlePlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setLocalPlaceholder(value);
        if (selectedItemProperties) {
            onPlaceholderChange(selectedItemProperties.id, value);
        }
    };

    const handleButtonTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setLocalButtonValue(value);
        if (selectedItemProperties) {
            onButtonTextChange(selectedItemProperties.id, value);
        }
    };

    return (
        <div className="bg-gray-600 text-white min-h-screen w-64">
            <div className="p-4">
                <h1 className="text-xl font-semibold">Properties</h1>
            </div>
            <div className="px-4 py-2">
                {selectedItemProperties !== null && Object.entries(selectedItemProperties).map(([key, value]) => (
                     <div key={key} className="mb-2">
                    <label className="block text-base font-medium font-semibold">{key}</label>
                    {(() => {
                        switch (key) {
                            case "Placeholder":
                                return (
                                    <Input type='text' className='text-black mb-2' value={localPlaceholder} onChange={handlePlaceholderChange} />
                                );
                            case "ButtonText":
                                return (
                                    <Input type='text' className='text-black mb-2' onChange={handleButtonTextChange} value={localButtonValue} />
                                );
                            case "Checkbox":
                                return <Checkbox />;
                            default:
                                return <div>{value}</div>;
                        }
                    })()}
                    <hr />
                </div>
                ))}
            </div>
        </div>
    );
};

export default RightSidebar;
