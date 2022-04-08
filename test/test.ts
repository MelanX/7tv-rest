const SevenTV = require('../src');
const api = SevenTV();

describe("SevenTV Rest API", () => {
    test('Fetch user', async() => {
        const user = await api.getUser('castcrafter');
        expect(user.display_name).toBe('CastCrafter');
    });

    test('Fetch user with invalid username', async() => {
        try {
            await api.getUser('invalid');
        } catch (e) {
            expect(e.message).toBe('User not found');
        }
    });

    test('Fetch emotes', async() => {
        const emotes = await api.getEmotes('castcrafter');
        expect(emotes.length).toBeGreaterThan(0);
    });

    test('Fetch emotes with invalid username', async() => {
        try {
            await api.getEmotes('invalid');
        } catch (e) {
            expect(e.message).toBe('User not found');
        }
    });

    test('Fetch single emote', async() => {
        const emote = await api.getEmote('60a58e67a71d9fd11049f5e9');
        expect(emote.name).toBe('muted');
    });

    test('Fetch single emote with invalid id', async() => {
        try {
            await api.getEmote('invalid');
        } catch (e) {
            expect(e.message).toBe('Emote not found');
        }
    });

    test('Fetch global emotes', async() => {
        const emotes = await api.getGlobalEmotes();
        expect(emotes.length).toBeGreaterThan(0);
    });

    test('Fetch badges', async() => {
        const badges = await api.getBadges('twitch_id');
        expect(badges.length).toBeGreaterThan(0);
    });

    test('Fetch badges with invalid id', async() => {
        try {
            await api.getBadges('invalid');
        } catch (e) {
            expect(e.message).toBe('Invalid user_identifier');
        }
    });

    test('Fetch paints', async() => {
        const paints = await api.getPaints('twitch_id');
        expect(paints.length).toBeGreaterThan(0);
    });

    test('Fetch paints with invalid id', async() => {
        try {
            await api.getPaints('invalid');
        } catch (e) {
            expect(e.message).toBe('Invalid user_identifier');
        }
    });
});