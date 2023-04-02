const SevenTV = require('../src');

describe("SevenTV Rest API", () => {
    test('Fetch user', async() => {
        const user = await SevenTV.getUser('castcrafter');
        expect(user.display_name).toBe('CastCrafter');
    });

    test('Fetch user with invalid username', async() => {
        try {
            await SevenTV.getUser('invalid');
        } catch (e) {
            expect(e.message).toBe('User not found');
        }
    });

    test('Fetch emotes', async() => {
        const emotes = await SevenTV.getEmotes('castcrafter');
        expect(emotes.length).toBeGreaterThan(0);
    });

    test('Fetch emotes with invalid username', async() => {
        try {
            await SevenTV.getEmotes('invalid');
        } catch (e) {
            expect(e.message).toBe('User not found');
        }
    });

    test('Fetch single emote', async() => {
        const emote = await SevenTV.getEmote('60a58e67a71d9fd11049f5e9');
        expect(emote.name).toBe('muted');
    });

    test('Fetch single emote with invalid id', async() => {
        try {
            await SevenTV.getEmote('invalid');
        } catch (e) {
            expect(e.message).toBe('Emote not found');
        }
    });

    test('Fetch global emotes', async() => {
        const emotes = await SevenTV.getGlobalEmotes();
        expect(emotes.length).toBeGreaterThan(0);
    });

    test('Fetch badges', async() => {
        const badges = await SevenTV.getBadges('twitch_id');
        expect(badges.length).toBeGreaterThan(0);
    });

    test('Fetch paints', async() => {
        const paints = await SevenTV.getPaints('twitch_id');
        expect(paints.length).toBeGreaterThan(0);
    });

    test('Fetch emote set', async() => {
        const emoteSet = await SevenTV.getEmoteSet('624f45bc5a64e87b9502423a');
        expect(emoteSet.name).toBe('MelanX\'s Emotes')
        expect(emoteSet.emotes.length).toBeGreaterThan(0);
    })
});
