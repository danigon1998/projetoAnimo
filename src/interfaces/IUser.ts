export interface IUser {
    id: string;           
    name: string;          
    email: string;         
    password?: string;      
    createdAt?: Date|any;      
    updatedAt?: Date|any;      
    moodHistory?: IMoodEntry[]; 
    profilePicture?: string;  
    lastLogin?: Date|any;         
    preferences?: IUserPreferences; 
}


export interface IMoodEntry {
    mood: string; 
    date: Date;   
    note?: string; 
}

export interface IUserPreferences {
    theme: "light" | "dark"; // Tema de la app
    notificationsEnabled: boolean; // Si desea recibir notificaciones
    language: string; // Idioma preferido
}

