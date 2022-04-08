import fetch from "node-fetch";

export namespace SevenTV {
    
    const baseUrl: string = 'https://api.7tv.app/v2'
    
    export async function getUser(username: string): Promise<User> {
        return await(await fetch(`${baseUrl}/users/${encodeURIComponent(username)}`)).json() as User;
    }

    export async function getEmote(emoteId: string): Promise<Emote> {
        return await(await fetch(`${baseUrl}/emotes/${encodeURIComponent(emoteId)}`)).json() as Emote;
    }

    export async function getEmotes(username: string): Promise<Emote[]> {
        return await(await fetch(`${baseUrl}/users/${encodeURIComponent(username)}/emotes`)).json() as Emote[];
    }

    export async function getGlobalEmotes(): Promise<Emote[]> {
        return await(await fetch(`${baseUrl}/emotes/global`)).json() as Emote[];
    }

    async function getGlobalData(identifier: UserIdentifier): Promise<GlobalEmotesResponse> {
        return await(await fetch(`${baseUrl}/badges?user_identifier=${encodeURIComponent(identifier)}`)).json() as GlobalEmotesResponse;
    }

    export async function getBadges(identifier: UserIdentifier): Promise<Badge[]> {
        return (await getGlobalData(identifier)).badges;
    }

    export async function getPaints(identifier: UserIdentifier): Promise<Paint[]> {
        return (await getGlobalData(identifier)).paints;
    }
}

module.exports = SevenTV
export default SevenTV

export type UserIdentifier = 'object_id' | 'twitch_id' | 'login'

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
