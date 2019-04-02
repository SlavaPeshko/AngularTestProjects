export class User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
    company: Company;
    address: Address;
}

export class Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export class Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

export class Geo {
    lat: string;
    lng: string;
}