# Devleopment Setup necessities.

#### 1. You need to make sure you have a login to an AWS account.

This means you sign up for an account or get invited to an account.

#### 2. You need to create an IAM user that will be the 'user' for this project when you are working locally

This part basically, as far as I can tell must take place in the AWS screens. This isn't the same thing as your login, this is an IAM user with the roles to perform env-deployments.

Take these steps in the AWS console

1. Select the IAM section under Security, Identity & COmpliance in AWS
2. Go to the Users Tab on the side, you'll see a users list. You need permissions to 'Add user' here
3. Click add users, you're going to pick a name for this user, something like `ns-yourname-dev`. This name will prepend every lambda function with this conventionally, so its unique to you like `username-projectname-functionname`. When you're developing locally you're actually running _these_ functions, not totally simulating an environment.
4. Click `Proramatic Access` (not AWS management console access). This will give you an access key ID and secret Access key. You'll need these.
5. You'll select Attach existing policies directly, and The **TODO:** correctly grained policy.
6. **TODO**: update this readme with the tags we want users to use.
7. On the review page click 'Create User' if it all looks correct.
8. Now you should see an Access key ID and a secret key. You need these to provision your dev .env, then close.
9. Check the userlist. Your new user should be in there now.

If you get stuck [check out this page](https://serverless-stack.com/chapters/create-an-iam-user.html), its helpful here.

### 3. Install the AWS CLI

Now we need to _install and configure_ the AWS CLI. This is because SST is a thin layer on top of the AWS CDK and basically will use this account we just made in the AWS dashboard to be performing actions, like updating the lambdas and SQS queues and so on as we develop.

1. Install: If you're on osx you can use homebrew or pip. I was able to use pip with no problems on Windows as well. There's [full install instructions here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html). You may need to make updates to your PATH, like any command line tool. Make sure you have it working, try `aws --version` or `which aws` to make sure you have it. (should see like `aws-cli/2.4.10 Python/3.8.8 Windows/10 exe/AMD64 prompt/off`)

2. Configure: run `aws configure`. Put in your Access Key Id and Secret Acces Key. Just hit enter on the region/default output. Now when you run aws cli commands, its using this account you just made. If you need to something more complex for your setup [look here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html).
   1. There's nothing super magical about what is happening here, it just dumps these values into `~/.aws/config` and `~/.aws/credentials`, in your user directory. You can always go here to check them out and verify everything works correctly.
   2. Try `aws iam get-user` and look at what returns. That should be the same user you added beforehand

### 4. First deployment

1. Type `yarn install` (if you haven't) then `yarn start`

If this is the first time ever, you'll see a prompt like

`Look like you’re running sst for the first time in this directory. Please enter a stage name you’d like to use locally. Or hit enter to use the one based on your AWS credentials (ns-simian-dev):` (in this case ns-simian-dev is me.) This is correct.

Yarn start is just a proxy for `npx sst start`. You don't need to install the sst cli globally, we're using the one in your package.json for now. This process will take a long time the first time (several minutes), Its basically running everything in the `/stacks` portion of the project and actually putting it out there in AWS based on your credentials.

2. Verify: Just to be certain go into the AWS console and check out the `/lambda` section. You _should_ see your lambda functions here.

3. Test: Lets make sure everything is working.

When you ran start, you should have seen something like:

```
Stack ns-simian-dev-nifty-save-niftysave-stack
  Status: deployed
  Outputs:
    ApiEndpoint: https://tmf8jai7b4.execute-api.us-east-1.amazonaws.com
```

Your URL will be differnt from this, but make note of it. In another console try:

`curl -X POST https://tmf8jai7b4.execute-api.us-east-1.amazonaws.com/ingest/health`

If everything is running correctly, you'll see a successful curl and some console output. You're up and running!

4. UNDO: you can always remove all of these with `yarn remove` or `npx sst remove`. Try this out - they should go away. USeful if you're going to stop local dev for a period of time and don't want to leave infrastructure-litter. That or maybe you need to start over. This basically is a replacement for something like Docker, but in the cloud (and namespaced to you) so don't be hesitant to delete these dev-lambdas.

I also want to draw attention to two folders that just got made: `.sst` and `.build`. These are .gitignore'd, and they store local information while you're developing as well as the output of the es6 transpilation. If they were to be deleted And you reran the build command, they'd just be replaced. That said, If you ever really need to delete these for an important reason, I recommend removing the stack first with `yarn remove` so you don't orphan Queues, Lambdas etc in AWS on accident. You can still log into AWS and delete these but its kind of a pain.

# Getting Started with Serverless Stack (SST)

This project was bootstrapped with [Create Serverless Stack](https://docs.serverless-stack.com/packages/create-serverless-stack).

Start by installing the dependencies.

```bash
$ yarn install
```

## SST Commands

### `npx run start`

Starts the local Lambda development environment.

### `npx run build`

Build your app and synthesize your stacks.

Generates a `.build/` directory with the compiled files and a `.build/cdk.out/` directory with the synthesized CloudFormation stacks.

### `npx run deploy [stack]`

Deploy all your stacks to AWS. Or optionally deploy, a specific stack.

### `npx run remove [stack]`

Remove all your stacks and all of their resources from AWS. Or optionally removes, a specific stack.

### `npx run test`

Runs your tests using Jest. Takes all the [Jest CLI options](https://jestjs.io/docs/en/cli).

### `yarn reset`

Removes, rebuilds and redeployes everything. Useful if things get in a weird state and you just want to 'blow it away and try again'.

## Documentation

Learn more about the Serverless Stack.

- [The Guide](https://serverless-stack.com/#guide)
- [Docs](https://docs.serverless-stack.com)
- [@serverless-stack/cli](https://docs.serverless-stack.com/packages/cli)
- [@serverless-stack/resources](https://docs.serverless-stack.com/packages/resources)

## Community

[Follow us on Twitter](https://twitter.com/ServerlessStack) or [post on our forums](https://discourse.serverless-stack.com).
