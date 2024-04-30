import React, { useState } from 'react';
import { useDrop } from "react-dnd";
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import RightSidebar from '../components/RightSidebar';

// Define an interface for the dropped item
interface DroppedItem {
    type: string;
    id: number; // Add an id to uniquely identify each dropped item
    properties: any; // Add properties field to store properties of dropped items
}

const Canvas = () => {
    const [droppedItems, setDroppedItems] = useState<DroppedItem[]>([]);
    const [selectedItemProperties, setSelectedItemProperties] = useState<any>(null); // State to store properties of selected item
    const [placeHolder, setPlaceHolder] = useState<Map<number, string>>(new Map())
    const [buttonText, setButtonText] = useState<Map<number, string>>(new Map())

    const HandlePlaceHolder = (itemId: number, value: string) => {
        setPlaceHolder(prevMap => new Map(prevMap.set(itemId, value)));
        console.log("Text Field:- ",placeHolder);
        
    }

    const ButtonTextChange = (itemId: number, value: string) => {
        setButtonText(prevMap => new Map(prevMap.set(itemId, value)));
        console.log("Button :- ",buttonText);
    }

    const [{ isOver }, drop] = useDrop({
        accept: ['text-field', 'button', 'checkbox', 'radio'],
        drop: (item: DroppedItem, monitor) => {
            console.log('Dropped:', item);
            let properties = {};
            // Set properties based on the type of dropped item
            switch (item.type) {
                case 'text-field':
                    properties = { Control: 'Text Field', Placeholder: placeHolder.get(item.id) || 'Enter Text' };
                    break;
                case 'button':
                    properties = { Control: 'Button', ButtonText: 'Button' };
                    break;
                case 'checkbox':
                    properties = { Control: 'Checkbox', Checkbox: "true" };
                    break;
                case 'radio':
                    properties = { Control: 'Radio Button', RadioButton: false };
                    break;
                default:
                    break;
            }
            setDroppedItems(prevItems => [...prevItems, { ...item, id: getNextId(), properties }]);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        })
    });

    const handleItemClick = (item: DroppedItem) => {
        /* setSelectedItemProperties((prevProperties: any) => {
            return { ...prevProperties, ...item.properties };
        }); */
        /* setSelectedItemProperties(item.properties); */

        const propertiesWithId = { ...item.properties, id: item.id };
        setSelectedItemProperties(propertiesWithId);
        console.log(item);
    };

    const getNextId = () => {
        const highestId = droppedItems.reduce((maxId, item) => {
            return item.id > maxId ? item.id : maxId;
        }, 0);
        return highestId + 1;
    };


    return (
        <div className="flex">
            <div ref={drop} className="bg-gray-500 p-4 flex-grow">
                {/* Render form container */}
                <form className="w-full max-w-md mx-auto">
                    {droppedItems.map((item, index) => (
                        <div key={item.id} className="mb-4" onClick={() => handleItemClick(item)}> {/* Add onClick handler to each dropped item */}
                            {/* Render dropped item based on its type */}
                            {item.type === 'text-field' && <div className="mb-2"><Input placeholder={placeHolder.get(item.id) || 'Enter Text'} /></div>}
                            {item.type === 'button' && <div className="mb-2"><Button type='button'>{buttonText.get(item.id) || "Button"}</Button></div>}
                            {item.type === 'checkbox' && (
                                <div className="items-top flex space-x-2 mb-2">
                                    <Checkbox id={`checkbox-${index}`} />
                                    <div className="grid gap-1.5 leading-none">
                                        <label htmlFor={`checkbox-${index}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Checkbox
                                        </label>
                                    </div>
                                </div>
                            )}
                            {item.type === 'radio' && <div className="mb-2"><RadioGroup defaultValue="comfortable">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="default" id="r1" /> <div>Radio Button</div>
                                </div>
                            </RadioGroup></div>}
                        </div>
                    ))}
                </form>
            </div>
            <div className="w-64 bg-gray-800 text-white">
                <RightSidebar selectedItemProperties={selectedItemProperties} onPlaceholderChange={(itemId, value) => HandlePlaceHolder(itemId, value)} onButtonTextChange={ (itemId,value)=> ButtonTextChange(itemId,value)} />
            </div>
        </div>
    )
}

export default Canvas;
