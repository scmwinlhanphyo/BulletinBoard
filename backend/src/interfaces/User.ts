export interface UserCreate {
    name: string;
    email: string;
    password: string;
    type: string;
    phone: string;
    dob: Date;
    address: string;
    profile: string;
    created_user_id: any;
}