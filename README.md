# Potlock + Walrus Site Deployment Template

This template provides a minimal setup for a React application that can be deployed as a static site to Walrus. It includes a pre-configured GitHub Action workflow that automates the deployment process.

## Getting Started

To use this template, simply clone the repository and follow the steps below to configure your deployment credentials.

### Preparing Your Deployment Credentials

To allow the GitHub Action to deploy your Walrus Site, it needs to be able to sign transactions on your behalf. This requires securely providing it with your private key and the corresponding public address.

This guide will show you how to:

1.  Export a private key from your Sui Wallet or CLI.
2.  Correctly format the key and add it as a `SUI_KEYSTORE` secret in your GitHub repository.
3.  Add the matching public address as a `SUI_ADDRESS` variable in your GitHub repository.

### Prerequisites

Before you start, you must have the `sui` binary installed. If you haven't installed it yet, please follow the [official Sui installation guide](https://docs.sui.io/guides/developer/getting-started/sui-install).

### Exporting Your Private Key

**Best Practice:** It's recommended to use a dedicated Sui address for each GitHub workflow rather than reusing addresses across different projects or purposes. This provides better security isolation and helps avoid gas-coin equivocation issues that can occur when multiple workflows try to use the same gas coins concurrently.

#### From Sui CLI

To export a private key using the command line:

1.  Generate a new key by running the following command in your terminal:

    ```bash
    sui keytool generate ed25519 # Or secp256k1 or secp256r1
    ```

    This command creates a file in your current directory named `<SUI_ADDRESS>.key` (e.g., `0x123...abc.key`). The filename is your new Sui Address.

2.  The content of this file is the private key in the `base64WithFlag` format. This is the value you need for the `SUI_KEYSTORE` secret.

You now have both the address (from the filename) for the `SUI_ADDRESS` variable and the key (from the file's content) for the `SUI_KEYSTORE` secret.

> **Note on existing keys:** If you wish to use a key you already own, you can find it in the `~/.sui/sui_config/sui.keystore` file. This file contains a JSON array of all your keys. To find the address for a specific key, you would need to use the `sui keytool unpack "<the base64 key from sui.keystore>"` command.

### Funding Your Address

Before the GitHub Action can deploy your site, the address you generated needs to be funded with both **SUI tokens** (for network gas fees) and **WAL tokens** (for storing your site's data).

#### Acquiring SUI and WAL Tokens

1.  **Acquire SUI Tokens:** You can acquire SUI tokens using [NEAR Intents](https://app.near-intents.org/). This service allows you to connect your desired chain's wallet to purchase SUI tokens directly. Follow the instructions on their website to connect your desired wallet and specify the amount of SUI you wish to purchase and the Sui address to send them to.

2.  **Acquire WAL Tokens:** Once your Sui address is funded with SUI, you can swap some of it for WAL tokens on a decentralized exchange (DEX) on the Sui network. A popular option is [Cetus Protocol](https://www.cetus.zone/). You will need to connect your Sui wallet to the DEX, find the SUI/WAL trading pair, and execute the swap.

### Adding credentials to GitHub

Now, let's add the key and address to your GitHub repository.

1.  Navigate to your GitHub repository in a web browser.
2.  Click on the **Settings** tab (located in the top navigation bar of your repository).
3.  In the left sidebar, click **Secrets and variables**, then select **Actions**.
4.  You'll see two tabs: **Secrets** and **Variables**. Start with the **Secrets** tab.
5.  Click the **New repository secret** button.
6.  Name the secret `SUI_KEYSTORE`.
7.  In the **Value** field, paste the Base64 Key with Flag you copied earlier. It must be formatted as a JSON array containing a single string:
    ```json
    ["AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"]
    ```
8.  Click **Add secret** to save it.

    > **Warning:** Make sure to format the keystore as a JSON array with a single string element, not just the raw key value. Include the square brackets and quotes exactly as shown above.

9.  Next, switch to the **Variables** tab and click **New repository variable**.
10. Name the variable `SUI_ADDRESS`.
11. In the **Value** field, paste the Sui address that corresponds to your private key (for example: `0x123abc...def789`).
12. Click **Add variable** to save it.

**Security reminder:** Never share your private key or commit it to version control. GitHub secrets are encrypted and only accessible to your workflows, but always verify you're adding secrets correctly.

For more information about managing secrets and variables in GitHub Actions, check the [official GitHub documentation](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions).

### Deployment

The deployment is handled by the `.github/workflows/deploy-walrus.yml` workflow. You can trigger it manually from the "Actions" tab in your GitHub repository.
