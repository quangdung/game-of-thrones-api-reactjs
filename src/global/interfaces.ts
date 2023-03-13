export interface RequestPayload {
    url: string;
}

export interface RequestEndpointPayload {
    endpoint: string;
}

export interface User {
    username: string;
    password: string;
};

export interface AuthContextType {
    user: User | null;
    handleLogin: (username: string, password: string) => void;
    handleLogout: () => void;
};

export interface Resource {
    books: string;
    characters: string;
    houses: string;
};

export interface ResourceState {
    data: Resource | null;
    isLoading: boolean;
    error: string | null;
};

export interface Book {
    url: string;
    name: string;
    isbn: string;
    authors: string[];
    numberOfPages: number;
    publisher: string;
    country: string;
    mediaType: string;
    released: string;
    characters: string[];
    povCharacters: string[];
};

export interface Character {
    url: string;
    name: string;
    gender: string;
    culture: string;
    born: string;
    died: string;
    titles: string[];
    aliases: string[];
    father: string;
    mother: string;
    spouse: string;
    allegiances: string[];
    books: string[];
    povBooks: string[];
    tvSeries: string[];
    playedBy: string[];
};

export interface House {
    url: string;
    name: string;
    region: string;
    coatOfArms: string;
    words: string;
    titles: string[];
    seats: string[];
    currentLord: string;
    heir: string;
    overlord: string;
    founded: string;
    founder: string;
    diedOut: string;
    ancestralWeapons: string[];
    cadetBranches: string[];
    swornMembers: string[];
}

export interface ElementSimple {
    url: string;
    name: string | null;
    alias: string | null;
}

export interface PaginationInterface {
    first: string;
    prev: string | null;
    next: string | null;
    last: string;
    lastPage: number;
    actualPage: number;
}