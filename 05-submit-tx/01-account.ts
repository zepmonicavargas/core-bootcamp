import path from 'path'
import { Hex, createPublicClient, http, formatEther } from 'viem';
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
import { privateKeyToAccount } from "viem/accounts";
import { arbitrumSepolia } from "viem/chains";

const privateKey = `0x${process.env.PRIVATE_KEY}`;
const account = privateKeyToAccount(privateKey as Hex);

(async () => {
  const client = createPublicClient({
    chain: arbitrumSepolia,
    transport: http(process.env.API_URL),
  });

  const balance = await client.getBalance({
    address: account.address,
  });

  console.log(formatEther(balance));

  const nonce = await client.getTransactionCount({
    address: account.address,
  });

  console.log(nonce);
})();