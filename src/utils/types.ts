export interface Thematic {
    id: number,
    name: string,
    description: string,
    status: number,
    image: string
}

export interface User {
    id: number,
    name: string,
    email: string
}

export interface Exhibition {
    id: number,
    status: number,
    owner: User,
    moderator: User,
    date_created: string,
    date_formation: string,
    date_complete: string,
    name: string,
    description: string,
    date_perform: string,
    room: string
}

export interface Option {
    id: number,
    name: string
}