/**
 * Inspirations & Legends
 * 
 * Add new inspirations here and they'll automatically appear on the home page.
 * Each entry needs a name and Twitter/X URL.
 */

export interface Inspiration {
    name: string;
    handle: string; // Twitter/X handle without @
    url: string;
    role?: string; // Optional role/title
}

export const inspirations: Inspiration[] = [
    {
        name: "Emil Kowalski",
        handle: "emilkowalski_",
        url: "https://x.com/emilkowalski_",
        role: "Design Engineer",
    },
    {
        name: "Rauno Freiberg",
        handle: "raunofreiberg",
        url: "https://x.com/raunofreiberg",
        role: "Design Engineer",
    },
    {
        name: "Nitish Khagwal",
        handle: "nitishkmrk",
        url: "https://x.com/nitishkmrk",
        role: "Designer",
    },
    {
        name: "Mariana Castilho",
        handle: "mrncst",
        url: "https://x.com/mrncst",
        role: "Designer",
    },
    {
        name: "James McDonald",
        handle: "jamesm",
        url: "https://x.com/jamesm",
        role: "UI Designer",
    },
    {
        name: "Manu Arora",
        handle: "mannupaaji",
        url: "https://x.com/mannupaaji",
        role: "Developer",
    },
    {
        name: "Gurvinder Singh",
        handle: "Gur__vi",
        url: "https://x.com/Gur__vi",
        role: "Designer",
    },
];
