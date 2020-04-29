# Contributing to Force

This project is work of [many developers](https://github.com/artsy/force/graphs/contributors).

We accept [pull requests](https://github.com/artsy/force/pulls), and you may [propose features and discuss issues](https://github.com/artsy/force/issues).

In the examples below, substitute your GitHub username for `contributor` in URLs.

## Fork the Project

Fork the [project on GitHub](https://github.com/artsy/force) and check out your copy.

```sh
git clone https://github.com/contributor/force.git
cd force
git remote add upstream https://github.com/artsy/force.git
```

## Run Force

Install [NVM](https://github.com/creationix/nvm) and Node 12.

```sh
nvm install 12
nvm alias default 12
```

Install node modules with Yarn.

```sh
npm i yarn -g
yarn install
```

Copy the `.env.oss` file to a `.env` file.

```sh
cp .env.oss .env
```

Start the server.

```sh
yarn start
```

Force should now be running at [http://localhost:5000/](http://localhost:5000/).

## Real-time development with [Reaction](https://github.com/artsy/reaction)

When working with components built in Reaction and want to keep both environments in sync without publishing to NPM, run:

```sh
cd reaction
yarn link && yarn watch

# Open a new terminal pane
cd force
yarn link @artsy/reaction && yarn start
```

## Running a local copy of Force in Production mode:

```sh
yarn start:prod
```

This creates a production-ready bundle of client and server-side code and boots the server. (This will take a while to compile.)

In case you want to ease debugging the server-side code, you can set the `DEBUG`
environment variable to disable webpack optimizations.

```sh
env DEBUG=true yarn start:prod
```

## Authentication in your local Force app

Authentication in Force is handled through OAuth, with [Gravity](https://github.com/artsy/gravity) authenticating the user and redirecting back to Force. For security reasons, the `localhost` origin [is forbidden as a redirect URL by Gravity in the staging environment](https://github.com/artsy/gravity/blob/543373d7d4413f5c8b1c8f84f73b2a592c00cba2/app/models/util/url_validation.rb#L23). This means that when running Force locally at `http://localhost:5000`, you won't be able to sign up or log in.

### Browse locally while logged in

If you need to run Force locally while logged in but don't need authentication to run locally, you can log into `http://staging.artsy.net`. The user information will propagate to your local browsing session.

### Run authentication logic locally

If you need to run authentication logic locally, you can configure Force to run at an `*.artsy.net` subdomain. Gravity's staging environment considers `*.artsy.net` subdomains to be valid redirect URLs, and authentication actions will succeed.

1. Add the following entry to your local hosts file (`/etc/hosts`):

```
127.0.0.1 local.artsy.net
```

2. Update your `.env` file with the following setting:

```
APP_URL=http://local.artsy.net:5000
```

3. Visit [`http://local.artsy.net:5000`](http://local.artsy.net:5000).

## Creating a Review App

See [the docs](docs/creating_review_app.md).

## Create a Topic Branch

Make sure your fork is up-to-date and create a topic branch for your feature or bug fix.

```sh
git checkout master
git pull upstream master
git checkout -b my-feature-branch
```

## Write Tests

Write tests for all new features and fixes using Mocha or Jest. Run all tests with `yarn test`.

Mocha looks for files prefixed with `.test` or `.spec`, while Jest looks for the prefix `.jest`.

To speed up your workflow try watching an individual file for changes, e.g. `yarn mocha -- --watch desktop/components/foo/bar.test.coffee`

## Write Code

We definitely appreciate pull requests that highlight or reproduce a problem, even without a fix.

Implement your feature or bug fix.

## Commit Changes

Make sure git knows your name and email address:

```sh
git config --global user.name "Your Name"
git config --global user.email "contributor@example.com"
```

## Push

```sh
git push origin my-feature-branch
```

## Make a Pull Request

Go to https://github.com/contributor/force and select your feature branch.
Click the 'Pull Request' button and fill out the form. Pull requests are usually reviewed within a few days.

## Rebase

If you've been working on a change for a while, rebase with upstream/master.

```
git fetch upstream
git rebase upstream/master
git push origin my-feature-branch -f
```

## Check on Your Pull Request

Go back to your pull request after a few minutes and see whether it passed muster with Semaphore. Everything should look green, otherwise fix issues and amend your commit as described above.

## Be Patient

It's likely that your change will not be merged and that the nitpicky maintainers will ask you to do more, or fix seemingly benign problems. Hang in there!

## Thank You

Please do know that we really appreciate and value your time and work. We love you, really. <3
