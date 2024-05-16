import { useState, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import Table from './Table'

const getData = () => [
  {
    address: "GTCsHMpJoutAsuMDzr86n3DS7bjB83gAUYYj7XWKZ9sL",
  },
  {
    address: "BX8kfSnDG23P8YkwKNYcn6TTDjGPPfkdG829U23SRL4A",
  },
];

function App() {
  const [count, setCount] = useState(0)

  const columns = useMemo(
    () => [
      {
        Header: "Address",
        accessor: "address"
      },
      {
        Header: "Balance",
        accessor: "balance"
      },
    ],
    []
  );

  const data = useMemo(() => getData(), []);

  // const RPC = clusterApiUrl('mainnet-beta')
  const RPC = 'https://fluent-side-isle.solana-mainnet.quiknode.pro/19a27fc1fa07c0a0aff254ef753b1ba030360b39/'
  const SOLANA_CONNECTION = new Connection(RPC)
  const WALLET_ADDRESS = 'BX8kfSnDG23P8YkwKNYcn6TTDjGPPfkdG829U23SRL4A'

  const getBalance = async () => {
    let balance = await SOLANA_CONNECTION.getBalance(new PublicKey(WALLET_ADDRESS))
    console.log(`Wallet Balance: ${balance/LAMPORTS_PER_SOL}`)
    setCount(balance)
  }

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => getBalance()}>
          Balance: {count/LAMPORTS_PER_SOL}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

      <div className='App'>
        <div className='min-h-screen bg-gray-100 text-gray-900'>
          <main className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4'>
            <div>
              <h1 className='text-xl font-semibold'>Filter Balance</h1>
            </div>
            <div className='mt-4'>
              <Table columns={columns} data={data} />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default App
