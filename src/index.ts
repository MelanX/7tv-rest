const request = require("request");

class SevenTV {
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = 'https://api.7tv.app/v2'
    }

    async getUser(username) {
        const uri = `${this.baseUrl}/users/${username}`;
        return await this.getJson(uri) as User;
    }

    async getEmote(emoteId) {
        const uri = `${this.baseUrl}/emotes/${emoteId}`;
        return await this.getJson(uri) as Emote;
    }

    async getEmotes(username) {
        const uri = `${this.baseUrl}/users/${username}/emotes`;
        return await this.getJson(uri) as Emote[];
    }

    async getGlobalEmotes() {
        const uri = `${this.baseUrl}/emotes/global`;
        return await this.getJson(uri) as Emote[];
    }

    async getBadges(user_identifier) {
        if (user_identifier !== "object_id" && user_identifier !== "twitch_id" && user_identifier !== "login") {
            throw new Error("Invalid user_identifier");
        }
        const uri = `${this.baseUrl}/badges?user_identifier=${user_identifier}`;
        const data = await this.getJson(uri) as GlobalEmotesResponse;

        return data.badges;
    }

    async getPaints(user_identifier) {
        if (user_identifier !== "object_id" && user_identifier !== "twitch_id" && user_identifier !== "login") {
            throw new Error("Invalid user_identifier");
        }
        const uri = `${this.baseUrl}/cosmetics?user_identifier=${user_identifier}`;
        const data = await this.getJson(uri) as GlobalEmotesResponse;

        return data.paints;
    }

    async getJson(uri) {
        return new Promise((resolve, reject) => {
            request(uri, (error, response, body) => {
                if (error) {
                    reject(error);
                }

                resolve(JSON.parse(body));
            });
        });
    }
}

module.exports = () => {
    return new SevenTV();
};

export interface Emote {
    id: string;
    name: string;
    owner: User;
    visibility: number;
    visibility_simple: string[];
    mime: string;
    status: number;
    tags: string[];
    width: number[];
    height: number[];
    urls: string[][];
}

export interface User {
    id: string;
    twitch_id: string;
    login: string;
    display_name: string;
    role: Role;
}

export interface Role {
    id: string;
    name: string;
    position: number;
    color: number;
    allowed: number;
    denied: number;
    default: boolean;
}

export type GlobalEmotesResponse = {
    badges: Badge[];
    paints: Paint[];
}

export type Badge = {
    id: string;
    name: string;
    tooltip: string;
    urls: string[][];
    users: string[];
}

export type Paint = {
    id: string;
    name: string;
    users: string[];
    function: string;
    color: number;
    stops: Stop[];
    repeat: boolean;
    angle: number;
    shape: string;
    drop_shadow: DropShadow;
    drop_shadows: DropShadow[];
    animation: Animation;
}

export type Stop = {
    at: number;
    color: number;
}

export type DropShadow = {
    x_offset: number;
    y_offset: number;
    radius: number;
    color: number;
}

export type Animation = {
    speed: number;
    keyframes: unknown;
}