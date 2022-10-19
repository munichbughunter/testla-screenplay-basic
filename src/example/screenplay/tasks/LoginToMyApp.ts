import { Actor, Task } from '@testla/screenplay-playwright';
import { Post } from '@testla/screenplay-playwright/api';
import { Navigate, Fill, Click, Wait } from '@testla/screenplay-playwright/web';
import { loginURL, usernameField, passwordField, loginButton } from '../screen/LoginScreen';

/**
 * Login via Web UI
 * 
 * Login via API: Send Login request to API to obtain the bearer token.
 */
export class LoginToMyApp extends Task {
    private constructor(private mode: 'web'| 'api') {
        super();
    }

    public async performAs(actor: Actor): Promise<any> {
        if(this.mode === 'web') {
            return await actor.attemptsTo(
                Navigate.to(loginURL),
                Fill.in(usernameField, actor.states('username') || ''),
                Fill.in(passwordField, actor.states('password') || ''),
                Click.on(loginButton),
            );
        }
        else {
            const loginResponse = await actor.attemptsTo(
                Post.to(`services/oauth2/token?grant_type=password&client_id=${process.env.API_CLIENT_ID}&client_secret=
                    ${process.env.API_CLIENT_SECRET}&username=${process.env.BASE_USERNAME}&password=${process.env.BASE_PASSWORD}`
                ).withHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json',
                })
            );
            console.log('Logged in to my Awesome App via API.');
            return Promise.resolve(loginResponse);
        }
    }

    /**
     * Login with the actor username + password and navigate to the given Opportunity URL.
     *
     */
    public static viaWeb(): LoginToMyApp {
        return new LoginToMyApp('web');
    }

    /**
     * Send Login request to My Awesome App API to obtain the bearer token.
     * 
     * @returns response to Login request which contains the bearer token.
     */
    public static viaAPI(): LoginToMyApp {
        return new LoginToMyApp('api');
    }
}
