import { test as base } from '@playwright/test';
import { Actor } from '@testla/screenplay-playwright';
import { UseActor } from '../screenplay/actors/MyProjectActors';

type MyActors = {
    adminActor: Actor;
    anotherActor: Actor;
};

export const test = base.extend<MyActors>({
    adminActor: async ({ browser, request }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const adminActor = UseActor(page, request, 'Admin Actor', `${process.env.BASE_USERNAME}`, `${process.env.BASE_PASSWORD}`);
        await use(adminActor);
    },
    anotherActor: async ({ browser, request }, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const anotherActor = UseActor(page, request, 'Another Actor Defined By You', `${process.env.SR_USERNAME}`, `${process.env.SR_PASSWORD}`);
        anotherActor.with('page', page);

        await use(anotherActor);
    },
});

export { expect } from '@playwright/test';
