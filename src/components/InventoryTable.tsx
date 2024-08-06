import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Plus, Save, X } from "lucide-react";

interface InventoryItem {
    id: string;
    barcode: string;
    item: string;
    brand: string;
    type: string;
    color: string;
    asset: string;
    serial: string;
    storeroom: string;
    minimumQty: string;
}

const initialItem: Omit<InventoryItem, 'id'> = {
    barcode: '',
    item: '',
    brand: '',
    type: '',
    color: '',
    asset: '',
    serial: '',
    storeroom: '',
    minimumQty: '',
};

const InventoryTable: React.FC = () => {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [newItem, setNewItem] = useState<Omit<InventoryItem, 'id'>>(initialItem);
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id?: string) => {
        const { name, value } = e.target;
        if (id) {
            setItems(prev => prev.map(item =>
                item.id === id ? { ...item, [name]: value } : item
            ));
        } else {
            setNewItem(prev => ({ ...prev, [name]: value }));
        }
    };

    const addNewRow = () => {
        if (Object.values(newItem).some(value => value !== '')) {
            const id = Date.now().toString();
            setItems(prev => [...prev, { id, ...newItem }]);
            setNewItem(initialItem);
        }
    };

    const deleteRow = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
    };

    const startEditing = (id: string) => {
        setEditingId(id);
    };

    const saveEdit = (id: string) => {
        setEditingId(null);
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    const saveData = () => {
        console.log('Saving data:', items);
        // Implement your save logic here
    };

    return (
        <div className="p-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Barcode</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Brand</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Color</TableHead>
                        <TableHead>Asset</TableHead>
                        <TableHead>Serial</TableHead>
                        <TableHead>Storeroom</TableHead>
                        <TableHead>Minimum Qty</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id}>
                            {Object.keys(initialItem).map((key) => (
                                <TableCell key={key}>
                                    {editingId === item.id ? (
                                        <Input
                                            name={key}
                                            value={item[key as keyof InventoryItem]}
                                            onChange={(e) => handleInputChange(e, item.id)}
                                        />
                                    ) : (
                                        item[key as keyof InventoryItem]
                                    )}
                                </TableCell>
                            ))}
                            <TableCell>
                                {editingId === item.id ? (
                                    <>
                                        <Button variant="ghost" size="icon" onClick={() => saveEdit(item.id)}>
                                            <Save className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={cancelEdit}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button variant="ghost" size="icon" onClick={() => startEditing(item.id)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => deleteRow(item.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        {Object.keys(initialItem).map((key) => (
                            <TableCell key={key}>
                                <Input
                                    name={key}
                                    value={newItem[key as keyof Omit<InventoryItem, 'id'>]}
                                    onChange={handleInputChange}
                                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                />
                            </TableCell>
                        ))}
                        <TableCell>
                            <Button onClick={addNewRow} variant="ghost" size="icon">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <div className="mt-4 flex justify-end">
                <Button onClick={saveData}>Save All</Button>
            </div>
        </div>
    );
};

export default InventoryTable;