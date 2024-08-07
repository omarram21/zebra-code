import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Trash2, Plus, Save, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

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
    minimum_qty: string;
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
    minimum_qty: '',
};

const itemOptions = ['Laptop', 'Mouse'];
const brandOptions = ['Microsoft', 'Logitech'];
const typeOptions = ['Wireless', 'Wired'];
const colorOptions = ['Red', 'Green', 'Blue'];
const assetOptions = ['Required', 'Not Required'];
const serialOptions = ['Required', 'Not Required'];
const storeroomOptions = ['JPI Storeroom'];

const requiredFields = ['barcode', 'item', 'asset', 'serial', 'storeroom', 'minimum_qty'];

const InventoryTable: React.FC = () => {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [newItem, setNewItem] = useState<Omit<InventoryItem, 'id'>>(initialItem);
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch('/api/items');
            if (!response.ok) throw new Error('Failed to fetch items');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error fetching items:', error);
            toast({
                title: "Error",
                description: "Failed to fetch items. Please try again.",
                variant: "destructive",
            });
        }
    };

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

    const handleSelectChange = (value: string, name: string, id?: string) => {
        if (id) {
            setItems(prev => prev.map(item =>
                item.id === id ? { ...item, [name]: value } : item
            ));
        } else {
            setNewItem(prev => ({ ...prev, [name]: value }));
        }
    };

    const validateItem = (item: Partial<InventoryItem>): boolean => {
        return requiredFields.every(field => item[field as keyof InventoryItem] !== '');
    };

    const addNewRow = async () => {
        if (validateItem(newItem)) {
            try {
                const response = await fetch('/api/items', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newItem),
                });
                if (!response.ok) throw new Error('Failed to add item');
                await fetchItems();
                setNewItem(initialItem);
                toast({
                    title: "Success",
                    description: "New item added successfully.",
                });
            } catch (error) {
                console.error('Error adding item:', error);
                toast({
                    title: "Error",
                    description: "Failed to add item. Please try again.",
                    variant: "destructive",
                });
            }
        } else {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
        }
    };

    const deleteRow = async (id: string) => {
        try {
            const response = await fetch(`/api/items?id=${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete item');
            await fetchItems();
            toast({
                title: "Success",
                description: "Item deleted successfully.",
            });
        } catch (error) {
            console.error('Error deleting item:', error);
            toast({
                title: "Error",
                description: "Failed to delete item. Please try again.",
                variant: "destructive",
            });
        }
    };

    const startEditing = (id: string) => {
        setEditingId(id);
    };

    const saveEdit = async (id: string) => {
        const itemToUpdate = items.find(item => item.id === id);
        if (!itemToUpdate) return;

        if (validateItem(itemToUpdate)) {
            try {
                const response = await fetch('/api/items', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(itemToUpdate),
                });
                if (!response.ok) throw new Error('Failed to update item');
                setEditingId(null);
                await fetchItems();
                toast({
                    title: "Success",
                    description: "Item updated successfully.",
                });
            } catch (error) {
                console.error('Error updating item:', error);
                toast({
                    title: "Error",
                    description: "Failed to update item. Please try again.",
                    variant: "destructive",
                });
            }
        } else {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields.",
                variant: "destructive",
            });
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    const renderCell = (item: InventoryItem, key: keyof InventoryItem, isEditing: boolean) => {
        if (isEditing) {
            switch (key) {
                case 'item':
                    return (
                        <Select onValueChange={(value) => handleSelectChange(value, key, item.id)} defaultValue={item[key]}>
                            <SelectTrigger>
                                <SelectValue placeholder="Item" />
                            </SelectTrigger>
                            <SelectContent>
                                {itemOptions.map((option) => (
                                    <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    );
                case 'brand':
                    return (
                        <Select onValueChange={(value) => handleSelectChange(value, key, item.id)} defaultValue={item[key]}>
                            <SelectTrigger>
                                <SelectValue placeholder="Brand" />
                            </SelectTrigger>
                            <SelectContent>
                                {brandOptions.map((option) => (
                                    <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    );
                case 'type':
                    return (
                        <Select onValueChange={(value) => handleSelectChange(value, key, item.id)} defaultValue={item[key]}>
                            <SelectTrigger>
                                <SelectValue placeholder="Type" />
                            </SelectTrigger>
                            <SelectContent>
                                {typeOptions.map((option) => (
                                    <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    );
                case 'color':
                    return (
                        <Select onValueChange={(value) => handleSelectChange(value, key, item.id)} defaultValue={item[key]}>
                            <SelectTrigger>
                                <SelectValue placeholder="Color" />
                            </SelectTrigger>
                            <SelectContent>
                                {colorOptions.map((option) => (
                                    <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    );
                case 'asset':
                    return (
                        <Select onValueChange={(value) => handleSelectChange(value, key, item.id)} defaultValue={item[key]}>
                            <SelectTrigger>
                                <SelectValue placeholder="Asset requirement" />
                            </SelectTrigger>
                            <SelectContent>
                                {assetOptions.map((option) => (
                                    <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    );
                case 'serial':
                    return (
                        <Select onValueChange={(value) => handleSelectChange(value, key, item.id)} defaultValue={item[key]}>
                            <SelectTrigger>
                                <SelectValue placeholder="Serial requirement" />
                            </SelectTrigger>
                            <SelectContent>
                                {serialOptions.map((option) => (
                                    <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    );
                case 'storeroom':
                    return (
                        <Select onValueChange={(value) => handleSelectChange(value, key, item.id)} defaultValue={item[key]}>
                            <SelectTrigger>
                                <SelectValue placeholder="Storeroom" />
                            </SelectTrigger>
                            <SelectContent>
                                {storeroomOptions.map((option) => (
                                    <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    );
                default:
                    return (
                        <Input
                            name={key}
                            value={item[key]}
                            onChange={(e) => handleInputChange(e, item.id)}
                        />
                    );
            }
        } else {
            return item[key];
        }
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
                            {(Object.keys(initialItem) as Array<keyof InventoryItem>).map((key) => (
                                <TableCell key={key}>
                                    {renderCell(item, key, editingId === item.id)}
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
                        {(Object.keys(initialItem) as Array<keyof InventoryItem>).map((key) => (
                            <TableCell key={key}>
                                {['item', 'brand', 'type', 'color', 'asset', 'serial', 'storeroom'].includes(key) ? (
                                    <Select onValueChange={(value) => handleSelectChange(value, key)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={key.charAt(0).toUpperCase() + key.slice(1)} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {key === 'item' && itemOptions.map((option) => (
                                                <SelectItem key={option} value={option}>{option}</SelectItem>
                                            ))}
                                            {key === 'brand' && brandOptions.map((option) => (
                                                <SelectItem key={option} value={option}>{option}</SelectItem>
                                            ))}
                                            {key === 'type' && typeOptions.map((option) => (
                                                <SelectItem key={option} value={option}>{option}</SelectItem>
                                            ))}
                                            {key === 'color' && colorOptions.map((option) => (
                                                <SelectItem key={option} value={option}>{option}</SelectItem>
                                            ))}
                                            {key === 'asset' && assetOptions.map((option) => (
                                                <SelectItem key={option} value={option}>{option}</SelectItem>
                                            ))}
                                            {key === 'serial' && serialOptions.map((option) => (
                                                <SelectItem key={option} value={option}>{option}</SelectItem>
                                            ))}
                                            {key === 'storeroom' && storeroomOptions.map((option) => (
                                                <SelectItem key={option} value={option}>{option}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <Input
                                        name={key}
                                        value={newItem[key]}
                                        onChange={handleInputChange}
                                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                    />
                                )}
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
        </div>
    );
};

export default InventoryTable;
