import { useState } from 'react';
import { useDrag } from 'react-dnd';
import { Input } from './ui/input';
import { Button } from './ui/button';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const [{ isDragging }, drag] = useDrag({
        type: 'text-field',
        item: { type: 'text-field' },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const [{ isDraggingButton }, dragButton] = useDrag({
        type: 'button',
        item: { type: 'button' },
        collect: (monitor) => ({
            isDraggingButton: !!monitor.isDragging(),
        }),
    });

    return (
        <div className="bg-gray-600 text-white min-h-screen">
            <div className="p-4">
                <h1 className="text-xl font-semibold">Form Controls</h1>
            </div>
            <nav className={`transition-all duration-300 ${isOpen ? 'w-64' : 'w-0'} md:w-64 lg:w-72 xl:w-80 overflow-x-hidden`}>
                <div className="md:hidden">
                    <button onClick={toggleSidebar} className="block text-gray-600 hover:text-white focus:text-white focus:outline-none">
                        {isOpen ? (
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        )}
                    </button>
                </div>
                <ul className="py-4 mt-2">
                    <li className={`px-4 py-2 hover:bg-blue-600 cursor-pointer ${isDragging ? 'opacity-50' : ''}`}>
                        <div ref={drag}>
                            <Input placeholder='Placeholder' type='text' className='border-x-4 border-yellow-950'/>
                        </div>
                    </li>
                      
                    <li className={`px-4 py-2 hover:bg-blue-600 cursor-pointer ${isDraggingButton ? 'opacity-50' : ''}`}>
                        <div ref={dragButton}>
                            <Button>Button</Button>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
