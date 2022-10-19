import { Element } from '@testla/screenplay-playwright/web';
import { test } from '../src/example/fixture/actors';
import { LoginToMyApp } from '../src/example/screenplay/tasks/LoginToMyApp';

test.describe('First example preparing over api', () => {
  let token = '';

  test.beforeAll(async ({ adminActor }) => {
      // log in via api
      const loginResponse = await adminActor.attemptsTo(
          LoginToMyApp.viaAPI()
      );
      token = loginResponse.body.access_token;
  });

  test.afterAll(async ({ adminActor }) => {
      await adminActor.attemptsTo(
        // Clean up your created stuff    
      );
  });

  test('Test your stuff via UI', async ({ adminActor }) => {
      await adminActor.attemptsTo(
          LoginToMyApp.viaWeb(),
          // Other tasks here
      );

      // Here are validations / questions
      // await adminActor.asks(Element.toBe.visible(MyAwesomeScreenElement));
      // await adminActor.asks(Element.toBe.visible(MyAwesomeScreenElement));
  });
});
