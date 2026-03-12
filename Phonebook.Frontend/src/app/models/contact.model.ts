export interface PhoneNumber {
    id?: number;
    number: string;
    type?: string;
    phoneTypeId?: number;
    isDefault: boolean;
}

export interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    phoneNumbers: PhoneNumber[];
}